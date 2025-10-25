@echo off
setlocal enabledelayedexpansion

for /f "tokens=*" %%u in (urls.txt) do (
  set "url=%%u"
  rem Extract filename from URL (everything after the last slash)
  for %%a in ("!url!") do (
    set "filename=%%~nxa"
  )

  echo Downloading: !url!
  curl -L -o "!filename!" "!url!"

  echo Formatting: !filename!
  npx prettier --write "!filename!" --parser babel
  echo.
)

echo All files downloaded and formatted.
pause
