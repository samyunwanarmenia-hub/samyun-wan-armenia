$nodeVersion = "20.18.0"
$nodeUrl = "https://nodejs.org/dist/v$nodeVersion/node-v$nodeVersion-win-x64.zip"
$zipPath = "$env:TEMP\nodejs.zip"
$extractPath = "$env:LOCALAPPDATA\nodejs"
$nodePath = "$extractPath\node-v$nodeVersion-win-x64"

Write-Host "Downloading Node.js..."
Invoke-WebRequest -Uri $nodeUrl -OutFile $zipPath

Write-Host "Extracting..."
New-Item -ItemType Directory -Force -Path $extractPath | Out-Null
Expand-Archive -Path $zipPath -DestinationPath $extractPath -Force

Write-Host "Adding to PATH for current session..."
$env:Path = "$nodePath;$env:Path"

Write-Host "Adding to user PATH..."
$userPath = [Environment]::GetEnvironmentVariable("Path", "User")
if ($userPath -notlike "*$nodePath*") {
    [Environment]::SetEnvironmentVariable("Path", "$userPath;$nodePath", "User")
}

Write-Host "Checking installation..."
& "$nodePath\node.exe" --version
& "$nodePath\npm.cmd" --version

Write-Host "Cleaning up..."
Remove-Item $zipPath -ErrorAction SilentlyContinue

Write-Host "Node.js installed to: $nodePath"
Write-Host "Restart terminal to apply PATH changes."