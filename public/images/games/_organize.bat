@echo off
for %%i in (*) do (
 if not "%%~ni" == "_organize" (
  md "%%~ni" && move "%%~i" "%%~ni"
 )
)