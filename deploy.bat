@echo off
echo Starting deployment process...
echo.

echo Building the project...
call npm run build
if %ERRORLEVEL% neq 0 (
  echo Build failed. Aborting deployment.
  exit /b 1
)
echo Build completed successfully!
echo.

echo Creating .nojekyll file...
type nul > dist\.nojekyll
echo .nojekyll file created!
echo.

echo Copying 404.html to dist folder...
if exist public\404.html (
  copy public\404.html dist\
  echo 404.html copied successfully!
) else (
  echo 404.html not found in public folder. Skipping...
)
echo.

echo Copying CNAME to dist folder...
if exist public\CNAME (
  copy public\CNAME dist\
  echo CNAME copied successfully!
) else (
  echo CNAME not found in public folder. Skipping...
)
echo.

echo Deploying to GitHub Pages...
call npx gh-pages -d dist
if %ERRORLEVEL% neq 0 (
  echo Deployment failed.
  exit /b 1
)
echo Deployment completed successfully!
echo.

echo Deployment process completed!
echo Your site should be available at: https://dahmounmiriam.github.io/vibe-coding-presentation/
