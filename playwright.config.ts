import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();
export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: "allure-playwright",
  use: {
    baseURL: 'https://stepik.org',
    trace: 'on-first-retry',
    headless: true
  },
  projects: [
    {
      name: 'pc',
      use: { ...devices['Desktop Chrome'] },
      testDir: "./tests/ui",
      testMatch: /.*\.test\.ts/,
    }
  ],
});
