import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 30 * 1000,
  expect: {
    timeout: 5000,
  },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: 2,
  reporter: 'list',
  use: {
    baseURL: 'http://localhost:4173',
    trace: 'on-first-retry',
  },
  webServer: {
    command: 'npx vite preview --port 4173',
    port: 4173,
    reuseExistingServer: true,
    timeout: 15 * 1000,
  },
  projects: [
    {
      name: 'Googlebot-Crawler-SEO',
      use: {
        ...devices['Desktop Chrome'],
        userAgent:
          'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
      },
    },
    {
      name: 'Desktop-Chrome',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'Mobile-Chrome',
      use: { ...devices['Pixel 7'] },
    },
  ],
});
