#!/bin/bash

# Colors for console output
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
RED='\033[0;31m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

echo -e "${CYAN}Starting deployment process...${NC}\n"

# Step 1: Build the project
echo -e "${YELLOW}Building the project...${NC}"
npm run build
if [ $? -ne 0 ]; then
  echo -e "${RED}Build failed. Aborting deployment.${NC}"
  exit 1
fi
echo -e "${GREEN}Build completed successfully!${NC}\n"

# Step 2: Create .nojekyll file to bypass Jekyll processing
echo -e "${YELLOW}Creating .nojekyll file...${NC}"
touch dist/.nojekyll
echo -e "${GREEN}.nojekyll file created!${NC}\n"

# Step 3: Copy 404.html to dist folder
echo -e "${YELLOW}Copying 404.html to dist folder...${NC}"
if [ -f "public/404.html" ]; then
  cp public/404.html dist/
  echo -e "${GREEN}404.html copied successfully!${NC}\n"
else
  echo -e "${RED}404.html not found in public folder. Skipping...${NC}\n"
fi

# Step 4: Copy CNAME to dist folder
echo -e "${YELLOW}Copying CNAME to dist folder...${NC}"
if [ -f "public/CNAME" ]; then
  cp public/CNAME dist/
  echo -e "${GREEN}CNAME copied successfully!${NC}\n"
else
  echo -e "${RED}CNAME not found in public folder. Skipping...${NC}\n"
fi

# Step 5: Deploy to GitHub Pages
echo -e "${YELLOW}Deploying to GitHub Pages...${NC}"
npx gh-pages -d dist
if [ $? -ne 0 ]; then
  echo -e "${RED}Deployment failed.${NC}"
  exit 1
fi
echo -e "${GREEN}Deployment completed successfully!${NC}\n"

echo -e "${CYAN}Deployment process completed!${NC}"
echo -e "${CYAN}Your site should be available at: https://dahmounmiriam.github.io/vibe-coding-presentation/${NC}"
