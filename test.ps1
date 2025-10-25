# Read all non-empty lines from urls.txt
$urls = Get-Content -Raw -Path .\urls.txt -ErrorAction Stop
$urls = $urls -split "`r?`n" | Where-Object { $_.Trim().Length -gt 0 }

foreach ($url in $urls) {
    $u = $url.Trim()
    # Remove query strings and fragments (? or #)
    $urlPath = ($u -split '[\?#]')[0]

    # Extract filename from the URL path
    $filename = [System.IO.Path]::GetFileName($urlPath)
    if ([string]::IsNullOrWhiteSpace($filename)) {
        Write-Host "⚠️  Skipping (no filename): $u"
        continue
    }

    Write-Host "`n📥 Downloading: $u"
    try {
        Invoke-WebRequest -Uri $u -OutFile $filename -UseBasicParsing -Headers @{ 'User-Agent' = 'curl/7.x' }
    } catch {
        Write-Warning "❌ Download failed: $u"
        continue
    }

    Write-Host "🎨 Formatting: $filename"
    npx prettier --write $filename --parser babel
}

Write-Host "`n✅ All done!"
