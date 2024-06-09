import {Locator, Page} from '@playwright/test';

export class RegistrationPopup {
    private page: Page;
    popup: Locator;
    nameInput: Locator;
    emailInput: Locator;
    passwordInput: Locator;
    submitButton: Locator;
    closeButton: Locator;
    policyCheckbox: Locator;
    privacyPolicyLink: Locator;
    termsLink: Locator;
    vkButton: Locator;
    googleButton: Locator
    githubButton: Locator
    openLoginPopupButton: Locator

    constructor(page: Page) {
        this.page = page;
        this.popup = page.locator('.modal-dialog-inner');
        this.nameInput = page.getByPlaceholder('Имя и фамилия')
        this.emailInput = page.getByPlaceholder('E-mail')
        this.passwordInput = page.getByPlaceholder('Пароль')
        this.submitButton = page.getByText('Зарегистрироваться')
        this.closeButton = page.locator('.modal-dialog-top__close')
        this.policyCheckbox = page.locator('.auth-disclaimer__form .form-checkbox');
        this.termsLink = page.getByText('условиями использования');
        this.privacyPolicyLink = page.getByText('политикой конфиденциальности');
        this.vkButton = page.locator('button[title=\'Войти через VK\']');
        this.googleButton = page.locator('button[title=\'Войти через Google\']');
        this.githubButton = page.locator('button[title=\'Войти через GitHub\']');
        this.openLoginPopupButton = page.locator('#ember1844');
    }

    async goto() {
        await this.page.goto('/catalog?auth=registration');
    }
    async fillName(name: string) {
        await this.nameInput.fill(name);
    }

    async fillEmail(email: string) {
        await this.emailInput.fill(email);
    }

    async fillPassword(password: string) {
        await this.passwordInput.fill(password);
    }

    async checkPolicyCheckbox() {
        await this.policyCheckbox.check();
    }

    async uncheckPolicyCheckbox() {
        await this.policyCheckbox.uncheck();
    }

    async fillAndSubmitRegistrationForm(name: string, email: string, password: string) {
        await this.fillName(name);
        await this.fillEmail(email);
        await this.fillPassword(password);        await this.checkPolicyCheckbox();
        await this.submitForm();
    }

    async submitForm() {
        await this.submitButton.click();
    }

    async closePopup() {
        await this.closeButton.click();
    }
}
