import { Locator, Page } from '@playwright/test';

export class HomePageUnauth {
    private page: Page;
    emailField: Locator;
    passwordField: Locator;
    remindPasswordButton: Locator;
    openRegPopupButton: Locator;
    signInButton: Locator;
    vkButton: Locator;
    googleButton: Locator;
    githubButton: Locator;
    closeButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.emailField = page.getByPlaceholder('E-mail');
        this.passwordField = page.getByPlaceholder('Пароль');
        this.remindPasswordButton = page.getByText('Напомнить пароль');
        this.openRegPopupButton = page.locator('#ember1845');
        this.signInButton = page.locator('//button[@type=\'submit\']');
        this.vkButton = page.locator('button[title=\'Войти через VK\']');
        this.googleButton = page.locator('button[title=\'Войти через Google\']');
        this.githubButton = page.locator('button[title=\'Войти через GitHub\']');
        this.closeButton = page.locator('.modal-dialog-top__close');
    }

    async goto() {
        await this.page.goto('/catalog?auth=login');
    }
}
