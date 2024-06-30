import { Locator, Page } from '@playwright/test';

export class HomePageAuth {
    page: Page;
    profileIcon: Locator;
    profileMenuItem: Locator;
    settingsMenuItem: Locator;
    notificationsMenuItem: Locator;
    whatsNewMenuItem: Locator;
    logoutMenuItem: Locator;

    constructor(page: Page) {
        this.page = page;
        this.profileIcon = page.getByLabel('Profile');
        this.profileMenuItem = page.getByRole('link', { name: 'Профиль' });
        this.settingsMenuItem = page.getByRole('link', { name: 'Настройки' });
        this.notificationsMenuItem = page.getByRole('link', { name: 'Уведомления' });
        this.whatsNewMenuItem = page.getByRole('link', { name: 'Что нового' });
        this.logoutMenuItem = page.getByRole('link', { name: 'Выход' });
    }
    async goto() {
        await this.page.goto('/');
    }
    async openMenu(){
        await this.profileIcon.click()
    }
    async openProfile(){
        await this.openMenu();
        await this.profileMenuItem.click()
    }
}

