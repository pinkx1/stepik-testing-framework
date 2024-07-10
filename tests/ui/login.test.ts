import { test, expect } from '@playwright/test';
import { HomePageUnauth } from '../../pages/home.page.unauth';
import { HomePageAuth } from '../../pages/home-page-auth';
import { LoginPopup } from '../../pages/login.popup';
import { EditEmailPage } from '../../pages/edit-email-page';
// import { VkAuthForm } from '../../pages/vk.auth.form';
import { ApiHelper } from '../../utils/apiHelper';

test.describe('Successful Login Tests', () => {
    let homePage: HomePageUnauth;
    let loginPopup: LoginPopup;
    let homePageAuth: HomePageAuth;
    let editEmailPage: EditEmailPage;
    // let vkAuthForm: VkAuthForm;
    // const testUserEmail = process.env.TEST_USER_EMAIL;
    // const testUserPassword = process.env.TEST_USER_PASSWORD;
    // const vkUserPhoneNumber = process.env.VK_USER_PHONE_NUMBER;
    // const vkUserPassword = process.env.VK_USER_PASSWORD;

    let fakeTestUserEmail: string;
    let fakeTestUserPassword: string;

    test.beforeEach(async ({ page }) => {
        homePage = new HomePageUnauth(page);
        loginPopup = new LoginPopup(page);
        homePageAuth = new HomePageAuth(page);
        editEmailPage = new EditEmailPage(page);
        // vkAuthForm = new VkAuthForm(page);

        fakeTestUserEmail = `testuser${Date.now()}@gmail.com`;
        fakeTestUserPassword = 'uqm4tbc*ucx4gpg4EWK';

        console.log(fakeTestUserEmail + ' /// ' + fakeTestUserPassword)

        await ApiHelper.createUser(fakeTestUserEmail, fakeTestUserPassword, 'Иван', 'Петров');
    });

    test('Login with valid credentials', async ({  }) => {
        // Выполнение шагов для входа
        await homePage.goto();
        await homePage.loginButton.click();
        await loginPopup.fillAndSubmitLoginForm(fakeTestUserEmail, fakeTestUserPassword);

        // Проверка успешного входа
        await homePageAuth.profileIcon.waitFor({ state: 'visible' }); // Проверка видимости иконки профиля

        // Переход на страницу редактирования email и проверка текущего email
        await editEmailPage.goto();
        // await editEmailPage.page.waitForLoadState('domcontentloaded')
        await editEmailPage.currentEmailText.waitFor({state: "attached"})
        const currentEmail = await editEmailPage.currentEmailText.textContent();
        // await  editEmailPage.page.pause()
        expect(currentEmail).toBe(fakeTestUserEmail);
    });

    // test('Successful login via VK', async ({ page }) => {
    //     await homePage.goto();
    //     await homePage.loginButton.click();
    //     await loginPopup.vkButton.click();
    //
    //     await vkAuthForm.fillEmailField(vkUserPhoneNumber);
    //     await vkAuthForm.continueButton.click();
    //     await vkAuthForm.fillPasswordField(vkUserPassword);
    //     await vkAuthForm.continueButton.click();
    //     await vkAuthForm.continueAsButton.click();
    //
    //     await homePageAuth.profileIcon.waitFor({ state: 'visible' }); // Проверка видимости иконки профиля
    //
    //     // Проверка сессионных данных
    //     const cookies = await page.context().cookies();
    //     console.log(cookies); // Вывод всех куки в консоль для проверки
    //
    //     await editEmailPage.goto();
    //     await editEmailPage.page.waitForLoadState('domcontentloaded')
    //     const currentEmail = await editEmailPage.currentEmailText.textContent();
    //     expect(currentEmail).toBe(testUserEmail);
    // });

    test.afterEach(async () => {
        await ApiHelper.deleteUser(fakeTestUserEmail, fakeTestUserPassword); // Использование email и пароля для удаления пользователя
    });
});
