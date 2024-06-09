import { Locator, Page } from '@playwright/test';

export class HomePageUnauth {
    private page: Page;
    loginButton: Locator;
    signUpButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.loginButton = page.getByText('Войти', { exact: true });
        this.signUpButton = page.getByText('Регистрация', { exact: true });
    }
}
