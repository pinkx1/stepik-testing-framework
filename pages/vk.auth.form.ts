import { Locator, Page } from '@playwright/test';

export class VkAuthForm {
    page: Page;
    emailField: Locator
    continueButton: Locator
    passwordField: Locator
    continueAsButton: Locator

    constructor(page: Page) {
        this.page = page;
        this.emailField = page.getByPlaceholder('Email or phone');
        this.continueButton = page.getByRole('button', { name: 'Continue' });
        this.passwordField = page.getByPlaceholder('Enter password');
        this.continueAsButton = page.locator('[data-test-id="continue-as-button"]')
    }

    async fillEmailField(email: string) {
        await this.emailField.fill(email);
    }

    async fillPasswordField(password: string) {
        await this.passwordField.fill(password);
    }
}
