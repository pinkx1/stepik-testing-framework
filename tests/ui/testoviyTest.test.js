// @ts-check
const { test, expect } = require('@playwright/test');

test('locators check', { tag: ['@smoke'] }, async ({ page }) => {
    await page.goto('/');
    console.log(page.url())
    const loginButton = await page.getByText('Войти', {exact: true});

    await expect(loginButton).toBeVisible();
});
