import { test, expect } from '@playwright/test';
import { HomePageUnauth } from '../../pages/home.page.unauth';
import { RegistrationPopup } from '../../pages/registration.popup';
import { LoginPopup } from '../../pages/login.popup';
import { waitForPopupAndClickLink } from '../../utils/uiHelper';

test.describe('Registration popup tests', () => {
    let homePage: HomePageUnauth;
    let registrationPopup: RegistrationPopup;
    let loginPopup: LoginPopup

    test.beforeEach(async ({ page }) => {
        homePage = new HomePageUnauth(page);
        registrationPopup = new RegistrationPopup(page);
        loginPopup = new LoginPopup(page)
    });

    test('should open terms link in a new tab', { tag: '@smoke' }, async ({ page }) => {
        await homePage.goto();
        await homePage.signUpButton.click();
        await registrationPopup.popup.isVisible();

        const newPage = await waitForPopupAndClickLink(page, registrationPopup.termsLink);
        await expect(newPage).toHaveTitle('Пользовательское соглашение — Stepik');
    });
    test('Login to acc test', { tag: '@smoke' }, async ({ page }) => {
        await homePage.goto();
        await homePage.loginButton.click();
        await loginPopup.popup.isVisible();

        await loginPopup.fillAndSubmitLoginForm(process.env.TEST_USER_EMAIL, process.env.TEST_USER_PASSWORD)
    });
});