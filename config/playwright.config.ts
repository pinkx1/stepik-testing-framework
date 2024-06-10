import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'https://stepik.org',
    trace: 'on-first-retry'
  },
  projects: [
    {
      name: 'smoke-pc',
      grep: /@smoke/,
      use: { ...devices['Desktop Chrome'] },
      testDir: "../tests/ui",
      testMatch: /.*\.test\.ts/,
    },
    {
      name: 'smoke-mobile',
      grep: /@smoke/,
      use: { ...devices['Pixel 5'], isMobile: true },
      testDir: "../tests/ui",
      testMatch: /.*\.test\.ts/,
    },
    {
      name: 'regression-pc',
      grep: /@regression/,
      use: { ...devices['Desktop Chrome'] },
      testDir: "../tests/ui",
      testMatch: /.*\.test\.ts/,
    },
    {
      name: 'regression-mobile',
      grep: /@regression/,
      use: { ...devices['Pixel 5'], isMobile: true },
      testDir: "../tests/ui",
      testMatch: /.*\.test\.ts/,
    },
  ],
});
