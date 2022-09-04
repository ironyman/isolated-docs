# isolated-docs
## Build
```
npm i
npm run build
```
Output is in `.\build\isolated-docs-win32-x64`, there will be defender induced start up overhead that can be mitigated with
```
Add-MpPreference -ExclusionPath .\build\isolated-docs-win32-x64
```
## Create zip
```
npm run package
```

## Hotkeys
`Ctrl + H`: go home

`Alt + left`: go back

`Alt + right`: go forward

## Profile
Chrome profile is created in `$env:APPDATA\isolated-docs`.
