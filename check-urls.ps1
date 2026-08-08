$urls = @(
  'http://localhost:8080/index.html',
  'http://localhost:8080/css/style.css',
  'http://localhost:8080/css/sections.css',
  'http://localhost:8080/js/render.js',
  'http://localhost:8080/js/ui.js',
  'http://localhost:8080/js/map.js',
  'http://localhost:8080/js/currency.js',
  'http://localhost:8080/js/script.js',
  'http://localhost:8080/examples/01-switzerland-italy-13days/index.html',
  'http://localhost:8080/examples/01-switzerland-italy-13days/config.js',
  'http://localhost:8080/examples/01-switzerland-italy-13days/site-data.js',
  'http://localhost:8080/examples/01-switzerland-italy-13days/itinerary-data.js',
  'http://localhost:8080/examples/02-japan-tokyo-kyoto-5days/index.html',
  'http://localhost:8080/examples/02-japan-tokyo-kyoto-5days/config.js',
  'http://localhost:8080/examples/02-japan-tokyo-kyoto-5days/site-data.js',
  'http://localhost:8080/examples/02-japan-tokyo-kyoto-5days/itinerary-data.js',
  'http://localhost:8080/examples/03-uk-london-scotland-10days/index.html',
  'http://localhost:8080/examples/03-uk-london-scotland-10days/config.js',
  'http://localhost:8080/examples/03-uk-london-scotland-10days/site-data.js',
  'http://localhost:8080/examples/03-uk-london-scotland-10days/itinerary-data.js',
  'http://localhost:8080/examples/04-hong-kong-7days/index.html',
  'http://localhost:8080/examples/04-hong-kong-7days/config.js',
  'http://localhost:8080/examples/04-hong-kong-7days/site-data.js',
  'http://localhost:8080/examples/04-hong-kong-7days/itinerary-data.js',
  'http://localhost:8080/examples/05-us-new-england-14days/index.html',
  'http://localhost:8080/examples/05-us-new-england-14days/config.js',
  'http://localhost:8080/examples/05-us-new-england-14days/site-data.js',
  'http://localhost:8080/examples/05-us-new-england-14days/itinerary-data.js',
  'http://localhost:8080/showcase.html'
)

Write-Host "=== VERIFYING TRIP PLANNER ASSETS & PAGES ===" -ForegroundColor Cyan

$successCount = 0
$failCount = 0

foreach ($target in $urls) {
  try {
    $response = Invoke-WebRequest -Uri $target -UseBasicParsing -TimeoutSec 5
    Write-Host "[OK $($response.StatusCode)] $target ($($response.Content.Length) bytes)" -ForegroundColor Green
    $successCount++
  } catch {
    Write-Host "[FAIL] $target -> $($_.Exception.Message)" -ForegroundColor Red
    $failCount++
  }
}

Write-Host "`nResults: $successCount Passed, $failCount Failed" -ForegroundColor Cyan
