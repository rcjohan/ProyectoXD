import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: 0,
  reporter: 'html',

  use: {
    trace: 'on-first-retry',
    viewport: { width: 1280, height: 720 },
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/117.0 Safari/537.36',
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

