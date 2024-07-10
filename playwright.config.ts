import { defineConfig, devices } from '@playwright/test';
import { testPlanFilter } from "allure-playwright/dist/testplan";
import dotenv from 'dotenv';

dotenv.config();
export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  grep: testPlanFilter(),
  reporter: [["line"], ["allure-playwright"]],  use: {
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
