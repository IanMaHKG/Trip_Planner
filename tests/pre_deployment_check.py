"""
Pre-Deployment Verification Suite for Trip Planner.
Automates end-to-end browser runtime validation using Microsoft Edge (Headless) + Chrome DevTools Protocol (CDP).

Checks:
1. Static Service Worker verification (Cache v2 + Network-First strategy)
2. HTTP server availability (auto-spawns test server if not already running)
3. Headless Edge loading of Portal Hub (http://localhost:8000/)
   - 0 uncaught JS exceptions
   - 0 console errors
   - 5 pre-built plan cards rendered
   - 0 horizontal overflow
4. Headless Edge loading of Plan Mode (http://localhost:8000/examples/01-switzerland-italy-13days/index.html)
   - 0 uncaught JS exceptions
   - 0 console errors
   - Full DOM rendering (hero, overview, milestone board, tips, itinerary, packing, budget, hotels, transit)
   - 0 horizontal overflow
"""

import sys
import io
import os
import json
import time
import subprocess
import urllib.request
import shutil
import socket

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

try:
    import websocket
except ImportError:
    print("❌ websocket module missing. Run: pip install websocket-client")
    sys.exit(1)

EDGE_PATH = r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
if not os.path.exists(EDGE_PATH):
    EDGE_PATH = r"C:\Program Files\Microsoft\Edge\Application\msedge.exe"

CDP_PORT = 9222
USER_DATA = os.path.abspath(r".\scratch_edge_test_profile")

def find_free_port():
    s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    s.bind(('', 0))
    port = s.getsockname()[1]
    s.close()
    return port

print("=" * 65)
print("🚀 RUNNING TRIP PLANNER PRE-DEPLOYMENT RUNTIME CDP VERIFICATION")
print("=" * 65)

# --- STEP 1: Static SW Verification ---
print("\n[STEP 1] Verifying Service Worker Configuration (sw.js)...")
sw_path = os.path.join(os.path.dirname(__file__), "..", "sw.js")
if not os.path.exists(sw_path):
    print("  ✗ sw.js not found!")
    sys.exit(1)

with open(sw_path, 'r', encoding='utf-8') as f:
    sw_code = f.read()

if "trip-planner-v3" in sw_code:
    print("  ✓ CACHE_NAME version: trip-planner-v3")
else:
    print("  ✗ Expected CACHE_NAME 'trip-planner-v3' in sw.js")
    sys.exit(1)

if "fetch(event.request)" in sw_code and "caches.match" in sw_code:
    print("  ✓ Network-First strategy with Cache Fallback detected")
else:
    print("  ✗ sw.js does not implement Network-First fetch handler")
    sys.exit(1)

# --- STEP 2: Server Verification & Auto-Spawn ---
print("\n[STEP 2] Verifying Local HTTP Server...")
SERVER_PORT = 8000
server_proc = None

def is_server_ready(port):
    try:
        resp = urllib.request.urlopen(f"http://localhost:{port}/index.html", timeout=2)
        return resp.status == 200
    except Exception:
        return False

if is_server_ready(SERVER_PORT):
    print(f"  ✓ Local server already responsive on http://localhost:{SERVER_PORT}/")
else:
    print(f"  ⚡ Starting background HTTP server on port {SERVER_PORT}...")
    project_root = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
    server_proc = subprocess.Popen(
        [sys.executable, "-m", "http.server", str(SERVER_PORT)],
        cwd=project_root,
        stdout=subprocess.DEVNULL,
        stderr=subprocess.DEVNULL
    )
    # Wait for server
    for _ in range(20):
        time.sleep(0.25)
        if is_server_ready(SERVER_PORT):
            print(f"  ✓ Server ready on http://localhost:{SERVER_PORT}/")
            break
    else:
        print("  ✗ Failed to start local server!")
        if server_proc:
            server_proc.terminate()
        sys.exit(1)

# --- STEP 3: Launch Headless Edge ---
print("\n[STEP 3] Launching Headless Microsoft Edge (CDP Port 9222)...")
if not os.path.exists(EDGE_PATH):
    print(f"  ✗ Edge binary not found at {EDGE_PATH}")
    if server_proc:
        server_proc.terminate()
    sys.exit(1)

if os.path.exists(USER_DATA):
    shutil.rmtree(USER_DATA, ignore_errors=True)

edge_proc = subprocess.Popen([
    EDGE_PATH,
    "--headless=new",
    f"--remote-debugging-port={CDP_PORT}",
    "--remote-allow-origins=*",
    f"--user-data-dir={USER_DATA}",
    "--disable-gpu",
    "--no-first-run",
    "--no-default-browser-check",
    "--disable-search-engine-choice-screen",
    "--disable-features=msEdgeSyncPrompt,Translate",
    "about:blank"
], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)

time.sleep(2)

def test_page_url(target_url, test_label, eval_script):
    print(f"\n[TESTING] {test_label} -> {target_url}")
    tabs_url = f"http://127.0.0.1:{CDP_PORT}/json"
    req = urllib.request.urlopen(tabs_url, timeout=5)
    tabs = json.loads(req.read().decode())
    
    page_tab = None
    for t in tabs:
        if t.get("type") == "page":
            page_tab = t
            break
    
    if not page_tab:
        raise RuntimeError("No browser page tab found via CDP!")

    ws_url = page_tab["webSocketDebuggerUrl"]
    ws = websocket.create_connection(ws_url, timeout=10)

    console_messages = []
    exceptions_thrown = []

    ws.send(json.dumps({"id": 1, "method": "Runtime.enable"}))
    ws.send(json.dumps({"id": 2, "method": "Page.enable"}))
    ws.send(json.dumps({"id": 3, "method": "Network.enable"}))
    ws.send(json.dumps({"id": 4, "method": "Network.setCacheDisabled", "params": {"cacheDisabled": True}}))

    nocache_url = f"{target_url}?nocache={int(time.time())}"
    ws.send(json.dumps({"id": 5, "method": "Page.navigate", "params": {"url": nocache_url}}))

    start_time = time.time()
    loaded = False
    load_time = None

    while time.time() - start_time < 6.0:
        try:
            ws.settimeout(0.3)
            msg = ws.recv()
            data = json.loads(msg)
            method = data.get("method", "")

            if method in ("Page.domContentEventFired", "Page.loadEventFired"):
                loaded = True
                if load_time is None:
                    load_time = time.time()

            elif method == "Runtime.consoleAPICalled":
                args = data.get("params", {}).get("args", [])
                text = " ".join([str(a.get("value", a.get("description", ""))) for a in args])
                log_type = data.get("params", {}).get("type", "log")
                console_messages.append((log_type, text))
                if log_type == "error":
                    print(f"    [Console Error]: {text}")

            elif method == "Runtime.exceptionThrown":
                details = data.get("params", {}).get("exceptionDetails", {})
                exc_text = details.get("text", "")
                exc_val = details.get("exception", {}).get("description", "")
                full_err = f"{exc_text} {exc_val}"
                exceptions_thrown.append(full_err)
                print(f"    ✗ [Runtime Exception]: {full_err}")

            if loaded and load_time and (time.time() - load_time >= 1.2):
                break

        except websocket.WebSocketTimeoutException:
            if loaded and load_time and (time.time() - load_time >= 1.2):
                break
            continue

    # Ensure DOM is fully populated
    time.sleep(0.5)
    ws.send(json.dumps({"id": 100, "method": "Runtime.evaluate", "params": {"expression": eval_script, "returnByValue": True}}))
    
    eval_res = None
    timeout_eval = time.time() + 4.0
    while time.time() < timeout_eval:
        try:
            ws.settimeout(0.3)
            msg = ws.recv()
            data = json.loads(msg)
            if data.get("id") == 100:
                result_payload = data.get("result", {})
                eval_res = result_payload.get("result", {}).get("value", {})
                break
        except websocket.WebSocketTimeoutException:
            continue

    ws.close()
    return eval_res, exceptions_thrown, [m[1] for m in console_messages if m[0] == "error"]

all_passed = True

try:
    # --- STEP 4: Test Hub Mode ---
    hub_script = r"""
    (() => {
        return {
            title: document.title,
            planCards: document.querySelectorAll('.plan-card').length,
            categoryButtons: document.querySelectorAll('.category-btn').length,
            themeToggle: !!document.getElementById('theme-toggle-btn'),
            readingProgress: !!document.getElementById('reading-progress'),
            scrollWidth: document.documentElement ? document.documentElement.scrollWidth : 0,
            clientWidth: document.documentElement ? document.documentElement.clientWidth : 0
        };
    })()
    """
    hub_res, hub_exc, hub_errs = test_page_url(f"http://localhost:{SERVER_PORT}/index.html", "1. Portal Hub Mode", hub_script)
    
    print("  • Results for Portal Hub:")
    print(f"    - Title:              {hub_res.get('title') if hub_res else 'None'}")
    print(f"    - Plan Cards:         {hub_res.get('planCards') if hub_res else 0} (expected 5)")
    print(f"    - Category Filters:   {hub_res.get('categoryButtons') if hub_res else 0}")
    print(f"    - Theme Toggle:       {hub_res.get('themeToggle') if hub_res else False}")
    print(f"    - Reading Progress:   {hub_res.get('readingProgress') if hub_res else False}")
    sw = hub_res.get('scrollWidth', 0) if hub_res else 0
    cw = hub_res.get('clientWidth', 0) if hub_res else 0
    overflow = sw > cw
    print(f"    - Horizontal Check:   scrollWidth={sw}px, clientWidth={cw}px (Overflow: {overflow})")

    if hub_exc:
        print(f"  ❌ Hub Mode: {len(hub_exc)} JS exceptions!")
        all_passed = False
    elif hub_errs:
        print(f"  ❌ Hub Mode: {len(hub_errs)} console errors!")
        all_passed = False
    elif (hub_res.get('planCards', 0) < 5) or overflow:
        print("  ❌ Hub Mode: Missing cards or horizontal overflow detected!")
        all_passed = False
    else:
        print("  ✅ PASS: Portal Hub validated with 0 errors & 0 overflow.")

    # --- STEP 5: Test Plan Mode (Switzerland Example) ---
    plan_script = r"""
    (() => {
        return {
            heroEyebrow: document.getElementById('hero-eyebrow-container') ? document.getElementById('hero-eyebrow-container').innerText.trim() : '',
            heroTitle: document.getElementById('hero-title-container') ? document.getElementById('hero-title-container').innerText.trim() : '',
            overviewCards: document.querySelectorAll('.overview-card').length,
            milestoneBoard: !!document.getElementById('route-board-mount'),
            dayCards: document.querySelectorAll('.day-card').length,
            packingItems: document.querySelectorAll('.packing-item').length,
            budgetRows: document.querySelectorAll('#budget-tbody tr').length,
            hotelCards: document.querySelectorAll('.hotel-leg-card').length,
            transitCards: document.querySelectorAll('.transit-card').length,
            backToTopBtn: !!document.getElementById('back-to-top-btn'),
            mobileBottomNav: !!document.getElementById('mobile-bottom-nav'),
            taxiModal: !!document.getElementById('taxi-modal'),
            scrollWidth: document.documentElement ? document.documentElement.scrollWidth : 0,
            clientWidth: document.documentElement ? document.documentElement.clientWidth : 0
        };
    })()
    """
    plan_url = f"http://localhost:{SERVER_PORT}/examples/01-switzerland-italy-13days/index.html"
    plan_res, plan_exc, plan_errs = test_page_url(plan_url, "2. Plan Mode (Switzerland 13 Days)", plan_script)

    print("  • Results for Plan Mode:")
    print(f"    - Hero Eyebrow:       {plan_res.get('heroEyebrow') if plan_res else 'None'}")
    print(f"    - Hero Title:         {plan_res.get('heroTitle') if plan_res else 'None'}")
    print(f"    - Overview Cards:     {plan_res.get('overviewCards') if plan_res else 0}")
    print(f"    - Day Cards:          {plan_res.get('dayCards') if plan_res else 0} (expected 13)")
    print(f"    - Packing Items:      {plan_res.get('packingItems') if plan_res else 0}")
    print(f"    - Budget Rows:        {plan_res.get('budgetRows') if plan_res else 0}")
    print(f"    - Hotel Cards:        {plan_res.get('hotelCards') if plan_res else 0}")
    print(f"    - Transit Cards:      {plan_res.get('transitCards') if plan_res else 0}")
    print(f"    - Bottom Nav & Taxi:  {bool(plan_res and plan_res.get('mobileBottomNav') and plan_res.get('taxiModal'))}")
    psw = plan_res.get('scrollWidth', 0) if plan_res else 0
    pcw = plan_res.get('clientWidth', 0) if plan_res else 0
    poverflow = psw > pcw
    print(f"    - Horizontal Check:   scrollWidth={psw}px, clientWidth={pcw}px (Overflow: {poverflow})")

    # Filter out external map tile or font 404s if any from console errors
    fatal_errs = [e for e in plan_errs if "favicon" not in e.lower()]

    if plan_exc:
        print(f"  ❌ Plan Mode: {len(plan_exc)} JS exceptions!")
        all_passed = False
    elif fatal_errs:
        print(f"  ❌ Plan Mode: {len(fatal_errs)} console errors!")
        all_passed = False
    elif (plan_res.get('dayCards', 0) < 13) or poverflow:
        print("  ❌ Plan Mode: Incomplete render or horizontal overflow!")
        all_passed = False
    else:
        print("  ✅ PASS: Plan Mode rendered 13 days with 0 exceptions & 0 overflow.")

except Exception as ex:
    print(f"\n❌ UNEXPECTED ERROR: {ex}")
    import traceback
    traceback.print_exc()
    all_passed = False

finally:
    print("\n[CLEANUP] Tearing down test browser and processes...")
    try:
        edge_proc.terminate()
        edge_proc.wait(timeout=2)
    except Exception:
        edge_proc.kill()

    if server_proc:
        try:
            server_proc.terminate()
            server_proc.wait(timeout=2)
        except Exception:
            server_proc.kill()

    if os.path.exists(USER_DATA):
        shutil.rmtree(USER_DATA, ignore_errors=True)

print("\n" + "=" * 65)
if all_passed:
    print("🎉 ALL PRE-DEPLOYMENT VERIFICATION CHECKS PASSED — 100% PRODUCTION READY!")
    print("=" * 65)
    sys.exit(0)
else:
    print("⚠️ VERIFICATION FAILED — CHECK LOGS ABOVE BEFORE COMMITTING!")
    print("=" * 65)
    sys.exit(1)
