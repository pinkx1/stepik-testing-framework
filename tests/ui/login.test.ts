import { test, expect } from '@playwright/test';
import { HomePageUnauth } from '../../pages/home.page.unauth';
import { HomePageAuth } from '../../pages/home-page-auth';
import { LoginPopup } from '../../pages/login.popup';
import { RegistrationPopup} from "../../pages/registration.popup";
import { EditEmailPage } from '../../pages/edit-email-page';
import { DeleteAccPage } from '../../pages/delete-acc-page'
import { ApiHelper } from '../../utils/apiHelper';

test.describe('Login popup tests', () => {
    let homePage: HomePageUnauth;
    let loginPopup: LoginPopup;

    test.beforeEach(async ({ page }) => {
        homePage = new HomePageUnauth(page);
        loginPopup = new LoginPopup(page);
    });

    test('Display login popup window', async ({ page }) => {
        await homePage.goto();
        await homePage.loginButton.click();
        await loginPopup.popup.isVisible()
    })
    test('Default selection of "Войти" tab', async ({ page }) => {
        await homePage.goto();
        await homePage.loginButton.click();
        await expect(loginPopup.openLoginPopupButton).toHaveClass('active ember-view light-tabs__switch')
    })
    test('Display registration form on switching to "Регистрация" tab', async ({ page }) => {
        const registrationPopup = new RegistrationPopup(page);
        await homePage.goto();
        await homePage.loginButton.click();
        await loginPopup.openRegPopupButton.click();
        await expect(registrationPopup.submitButton).toHaveText('Зарегистрироваться')
    })
    test('Functionality of "Напомнить пароль" link', async ({ page }) => {
        await homePage.goto();
        await homePage.loginButton.click();
        await loginPopup.remindPasswordButton.click()
        expect(loginPopup.page.url()).toContain('?auth=login&pass_reset=true')
    })
    test('Display error message for incorrect email/password combination', async ({ page }) => {
        await homePage.goto();
        await homePage.loginButton.click();
        await loginPopup.fillAndSubmitLoginForm('incorrestemail@mailcom','incorrectpassword')
        await expect(loginPopup.validationErrorAlert).toHaveText('E-mail адрес и/или пароль не верны.')
    })
    test('Display error message for invalid email format', async ({ page }) => {
        await homePage.goto();
        await homePage.loginButton.click();
        await expect(loginPopup.emailField).toHaveAttribute('type', 'email')
    });
    test('Display error message for empty email field', async ({ page }) => {
        await homePage.goto();
        await homePage.loginButton.click();
        await expect(loginPopup.emailField).toHaveAttribute('required')
    });
    test('Display error message for empty password field', async ({ page }) => {
        await homePage.goto();
        await homePage.loginButton.click();
        await expect(loginPopup.passwordField).toHaveAttribute('required')
    });
    test('Social login using "ВКонтакте"', async ({ page }) => {
        await homePage.goto();
        await homePage.loginButton.click();
        await loginPopup.vkButton.click()
        expect(loginPopup.page.url()).toContain('vk.com')
    })
    test('Social login using "Google"', async ({ page }) => {
        await homePage.goto();
        await homePage.loginButton.click();
        await loginPopup.googleButton.click()
        expect(loginPopup.page.url()).toContain('google.com')
    })
    test('Social login using "GitHub"', async ({ page }) => {
        await homePage.goto();
        await homePage.loginButton.click();
        await loginPopup.githubButton.click()
        expect(loginPopup.page.url()).toContain('github.com')
    })
    test('Close popup window using close (X) button', async ({ page }) => {
        await homePage.goto();
        await homePage.loginButton.click();
        await loginPopup.closeButton.click();
        await expect(loginPopup.popup).not.toBeVisible()
    });
    test('Close popup window by clicking outside the window', async ({ page }) => {
        await homePage.goto();
        await homePage.loginButton.click();
        const modalBoundingBox  = await loginPopup.popup.boundingBox();
        await loginPopup.page.mouse.click(modalBoundingBox!.x - 10, modalBoundingBox!.y - 10);
        await expect(loginPopup.popup).not.toBeVisible()
    });
})

test.describe('Login Tests', () => {
    let homePage: HomePageUnauth;
    let loginPopup: LoginPopup;
    let homePageAuth: HomePageAuth;
    let editEmailPage: EditEmailPage;
    let deleteAccPage: DeleteAccPage
    let testUserEmail: string;
    let testUserPassword: string;

    test.beforeEach(async ({ page }) => {
        homePage = new HomePageUnauth(page);
        loginPopup = new LoginPopup(page);
        homePageAuth = new HomePageAuth(page);
        editEmailPage = new EditEmailPage(page);
        deleteAccPage = new DeleteAccPage(page)

        testUserEmail = `testuser${Date.now()}@gmail.com`;
        testUserPassword = 'uqm4tbc*ucx4gpg4EWK';

        await ApiHelper.createUser(testUserEmail, testUserPassword, 'Иван', 'Петров');
    });

    test('Login with valid credentials', async () => {
        await homePage.goto();
        await homePage.loginButton.click();
        await loginPopup.fillAndSubmitLoginForm(testUserEmail, testUserPassword);

        await homePageAuth.profileIcon.waitFor({ state: 'visible' });

        await editEmailPage.goto();
        await editEmailPage.currentEmailText.waitFor({state: "attached"})
        const currentEmail = await editEmailPage.currentEmailText.textContent();
        expect(currentEmail).toBe(testUserEmail);
    });
    test.afterEach(async ({page}) => {
        const {csrfMiddlewareToken, pageAPIContext} = await deleteAccPage.getToken()
        await ApiHelper.deleteUser(pageAPIContext, testUserPassword, csrfMiddlewareToken);
    });
});
