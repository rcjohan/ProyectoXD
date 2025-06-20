import { defineConfig } from '@playwright/test';
 
export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  retries: 0,
  reporter: 'html',
 
  use: {
    trace: 'on-first-retry',
    viewport: { width: 1280, height: 720 },
  },
 
  projects: [
    {
      name: 'chromium',
      use: {
        browserName: 'chromium',
        headless: false,
        launchOptions: {
          slowMo: 100
        }
      }
    }
  ]
});