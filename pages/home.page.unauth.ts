import { Locator, Page } from '@playwright/test';

export class HomePageUnauth {
    private page: Page;
    private loginButton: Locator;
    private signUpButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.loginButton = page.getByText('Войти', { exact: true });
        this.signUpButton = page.getByText('Регистрация', { exact: true });
    }

    async goto() {
        await this.page.goto('/');
    }

    async clickLogin() {
        await this.loginButton.click();
    }

    async clickSignUp() {
        await this.signUpButton.click();
    }

    async verifyHomePage() {
        await this.loginButton.waitFor();
        await this.signUpButton.waitFor();
    }
}
