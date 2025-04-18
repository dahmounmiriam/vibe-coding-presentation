// Simple script to help with deployment to GitHub Pages
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  cyan: '\x1b[36m'
};

console.log(`${colors.bright}${colors.cyan}Starting deployment process...${colors.reset}\n`);

try {
  // Step 1: Build the project
  console.log(`${colors.yellow}Building the project...${colors.reset}`);
  execSync('npm run build', { stdio: 'inherit' });
  console.log(`${colors.green}Build completed successfully!${colors.reset}\n`);

  // Step 2: Create .nojekyll file to bypass Jekyll processing
  console.log(`${colors.yellow}Creating .nojekyll file...${colors.reset}`);
  fs.writeFileSync(path.join(__dirname, 'dist', '.nojekyll'), '');
  console.log(`${colors.green}.nojekyll file created!${colors.reset}\n`);

  // Step 3: Copy 404.html to dist folder
  console.log(`${colors.yellow}Copying 404.html to dist folder...${colors.reset}`);
  if (fs.existsSync(path.join(__dirname, 'public', '404.html'))) {
    fs.copyFileSync(path.join(__dirname, 'public', '404.html'), path.join(__dirname, 'dist', '404.html'));
    console.log(`${colors.green}404.html copied successfully!${colors.reset}\n`);
  } else {
    console.log(`${colors.red}404.html not found in public folder. Skipping...${colors.reset}\n`);
  }

  // Step 4: Copy CNAME to dist folder
  console.log(`${colors.yellow}Copying CNAME to dist folder...${colors.reset}`);
  if (fs.existsSync(path.join(__dirname, 'public', 'CNAME'))) {
    fs.copyFileSync(path.join(__dirname, 'public', 'CNAME'), path.join(__dirname, 'dist', 'CNAME'));
    console.log(`${colors.green}CNAME copied successfully!${colors.reset}\n`);
  } else {
    console.log(`${colors.red}CNAME not found in public folder. Skipping...${colors.reset}\n`);
  }

  // Step 5: Deploy to GitHub Pages
  console.log(`${colors.yellow}Deploying to GitHub Pages...${colors.reset}`);
  execSync('npx gh-pages -d dist', { stdio: 'inherit' });
  console.log(`${colors.green}Deployment completed successfully!${colors.reset}\n`);

  console.log(`${colors.bright}${colors.cyan}Deployment process completed!${colors.reset}`);
  console.log(`${colors.bright}${colors.cyan}Your site should be available at: https://dahmounmiriam.github.io/vibe-coding-presentation/${colors.reset}`);
} catch (error) {
  console.error(`${colors.red}Error during deployment:${colors.reset}`, error);
  process.exit(1);
}
