import {Locator, Page} from '@playwright/test';

export class RegistrationPopup {
    private page: Page;
    private popup: Locator;
    private nameInput: Locator;
    private emailInput: Locator;
    private passwordInput: Locator;
    private submitButton: Locator;
    private closeButton: Locator;
    private policyCheckbox: Locator;
    termsLink: Locator;
    private privacyPolicyLink: Locator

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
        this.privacyPolicyLink = page.getByText('политикой конфиденциальности')
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

    async fillRegistrationForm(name: string, email: string, password: string) {
        await this.fillName(name);
        await this.fillEmail(email);
        await this.fillPassword(password);
    }

    async fillAndSubmitRegistrationForm(name: string, email: string, password: string) {
        await this.fillRegistrationForm(name, email, password);
        await this.checkPolicyCheckbox();
        await this.submitForm();
    }

    async submitForm() {
        await this.submitButton.click();
    }

    async closePopup() {
        await this.closeButton.click();
    }

    async verifyPopupIsVisible() {
        await this.popup.waitFor();
    }
}
