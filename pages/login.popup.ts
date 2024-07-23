import { Locator, Page } from '@playwright/test';

export class LoginPopup {
    page: Page;
    popup: Locator;
    emailField: Locator;
    passwordField: Locator;
    remindPasswordButton: Locator;
    openRegPopupButton: Locator;
    openLoginPopupButton: Locator;
    signInButton: Locator;
    vkButton: Locator;
    googleButton: Locator;
    githubButton: Locator;
    closeButton: Locator;
    validationErrorAlert: Locator;

    constructor(page: Page) {
        this.page = page;
        this.popup = page.locator('.modal-dialog-inner');
        this.emailField = page.getByPlaceholder('E-mail');
        this.passwordField = page.getByPlaceholder('Пароль');
        this.remindPasswordButton = page.getByText('Напомнить пароль');
        this.openRegPopupButton = page.locator('[data-tab-name="registration"]');
        this.openLoginPopupButton = page.locator('[data-tab-name="login"]');
        this.signInButton = page.locator('//button[@type=\'submit\']');
        this.vkButton = page.getByTitle('Войти через VK');
        this.googleButton = page.getByTitle('Войти через Google');
        this.githubButton = page.getByTitle('Войти через GitHub');
        this.closeButton = page.locator('.modal-dialog-top__close');
        this.validationErrorAlert = page.locator("li[role='alert']")
    }

    async goto() {
        await this.page.goto('/catalog?auth=login');
    }

    async fillEmailField(email: string) {
        await this.emailField.fill(email);
    }

    async fillPasswordField(password: string) {
        await this.passwordField.fill(password);
    }

    async submitForm() {
        await this.signInButton.click();
    }

    async fillAndSubmitLoginForm(email: string, password: string) {
        await this.fillEmailField(email);
        await this.fillPasswordField(password);
        await this.submitForm();
    }
}
