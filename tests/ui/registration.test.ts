import { test, expect } from '@playwright/test';
import { HomePageUnauth } from '../../pages/home.page.unauth';
import { RegistrationPopup } from '../../pages/registration.popup';
import { waitForPopupAndClickLink } from '../../utils/uiHelper';

test.describe('Registration popup tests', () => {
    let homePage: HomePageUnauth;
    let registrationPopup: RegistrationPopup;

    test.beforeEach(async ({ page }) => {
        homePage = new HomePageUnauth(page);
        registrationPopup = new RegistrationPopup(page);
    });

    test('should open terms link in a new tab', { tag: '@smoke' }, async ({ page }) => {
        await homePage.goto();
        await homePage.clickSignUp();
        await registrationPopup.verifyPopupIsVisible();

        const newPage = await waitForPopupAndClickLink(page, registrationPopup.termsLink);
        await expect(newPage).toHaveTitle('Пользовательское соглашение — Stepik');
    });
});
