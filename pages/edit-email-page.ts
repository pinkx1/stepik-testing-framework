import { Locator, Page } from '@playwright/test';

export class EditEmailPage {
    page: Page;
    currentEmailText: Locator

    constructor(page: Page) {
        this.page = page;
        this.currentEmailText = page.locator('tbody tr td:nth-child(1)')
    }
    async goto() {
        await this.page.goto('/edit-profile/email');
    }
}

