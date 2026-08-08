# Trip Planner Local Static HTTP Server
$port = 8080
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:$port/")

try {
    $listener.Start()
    Write-Host "=======================================================" -ForegroundColor Cyan
    Write-Host "  🧭 Trip Planner Local Server is LIVE!" -ForegroundColor Green
    Write-Host "  URL: http://localhost:$port/" -ForegroundColor Yellow
    Write-Host "  Press Ctrl+C in terminal to stop the server" -ForegroundColor Gray
    Write-Host "=======================================================" -ForegroundColor Cyan
} catch {
    Write-Error "Failed to start listener on port ${port}: $_"
    exit 1
}

$mime = @{
    ".html" = "text/html; charset=utf-8"
    ".css"  = "text/css; charset=utf-8"
    ".js"   = "application/javascript; charset=utf-8"
    ".json" = "application/json; charset=utf-8"
    ".svg"  = "image/svg+xml"
    ".png"  = "image/png"
    ".jpg"  = "image/jpeg"
    ".jpeg" = "image/jpeg"
    ".webp" = "image/webp"
    ".md"   = "text/markdown; charset=utf-8"
    ".ico"  = "image/x-icon"
}

$basePath = (Get-Location).Path

while ($listener.IsListening) {
    try {
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response

        $urlPath = [System.Uri]::UnescapeDataString($request.Url.LocalPath)
        
        # Map directory paths to index.html
        if ($urlPath -eq "/" -or $urlPath -eq "") {
            $urlPath = "/index.html"
        } elseif ($urlPath.EndsWith("/")) {
            $urlPath = $urlPath + "index.html"
        }

        $relPath = $urlPath.TrimStart('/').Replace('/', [System.IO.Path]::DirectorySeparatorChar)
        $filePath = [System.IO.Path]::Combine($basePath, $relPath)

        if ((Test-Path -Path $filePath -PathType Container) -and (Test-Path -Path (Join-Path $filePath "index.html"))) {
            $filePath = Join-Path $filePath "index.html"
        }

        if (Test-Path -Path $filePath -PathType Leaf) {
            $ext = [System.IO.Path]::GetExtension($filePath).ToLower()
            $contentType = if ($mime.ContainsKey($ext)) { $mime[$ext] } else { "application/octet-stream" }
            
            $response.ContentType = $contentType
            $response.AddHeader("Access-Control-Allow-Origin", "*")
            $response.AddHeader("Cache-Control", "no-cache, no-store, must-revalidate")
            
            $bytes = [System.IO.File]::ReadAllBytes($filePath)
            $response.ContentLength64 = $bytes.Length
            $response.OutputStream.Write($bytes, 0, $bytes.Length)
        } else {
            $response.StatusCode = 404
            $buffer = [System.Text.Encoding]::UTF8.GetBytes("404 Not Found: $urlPath")
            $response.ContentLength64 = $buffer.Length
            $response.OutputStream.Write($buffer, 0, $buffer.Length)
        }
        $response.OutputStream.Close()
    } catch {
        # continue on client disconnect
    }
}
