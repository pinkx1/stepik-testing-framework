import { test, expect } from '@playwright/test';
import { HomePageUnauth } from '../../pages/home.page.unauth';
import { HomePageAuth } from '../../pages/home-page-auth'
import { LoginPopup } from '../../pages/login.popup';
import { EditEmailPage } from '../../pages/edit-email-page'

test.describe('Successful Login Tests', () => {
    let homePage: HomePageUnauth;
    let loginPopup: LoginPopup
    let homePageAuth: HomePageAuth;
    let editEmailPage: EditEmailPage
    const testUserEmail = process.env.TEST_USER_EMAIL;
    const testUserPassword = process.env.TEST_USER_PASSWORD

    test.beforeEach(async ({ page }) => {
        homePage = new HomePageUnauth(page);
        loginPopup = new LoginPopup(page)
        homePageAuth = new HomePageAuth(page)
        editEmailPage = new EditEmailPage(page)
    });

    test('Successful login with valid credentials', { tag: ['@smoke', '@positive', '@highPriority']}, async () => {
        await homePage.goto();
        await homePage.loginButton.click();
        await loginPopup.popup.isVisible();
        await loginPopup.fillAndSubmitLoginForm(testUserEmail, testUserPassword);
        await expect(homePageAuth.profileIcon).toBeVisible();
        await homePageAuth.page.goto('https://stepik.org/edit-profile/email');
        await expect(editEmailPage.currentEmailText).toContainText(testUserEmail);
    });

    test('Successful login via VK', {tag: ['@smoke', '@positive', '@highPriority']}, async () => {
        await homePage.goto();
        await homePage.loginButton.click();
        await loginPopup.popup.isVisible();
        await loginPopup.vkButton.click();

        await loginPopup.page.getByPlaceholder('Email or phone').fill('+37491187734');
        await loginPopup.page.getByRole('button', { name: 'Continue' }).click();
        await loginPopup.page.getByPlaceholder('Enter password').fill('mfg3DHA_xje7vnu3edq');
        await loginPopup.page.getByRole('button', { name: 'Continue' }).click();
        await loginPopup.page.locator('[data-test-id="continue-as-button"]').click();
        await loginPopup.page.pause()
    })
});