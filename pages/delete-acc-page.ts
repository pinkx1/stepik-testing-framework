import { Locator, Page } from '@playwright/test';

export class DeleteAccPage {
    page: Page;
    csrfMiddlewareToken: string;
    constructor(page: Page) {
        this.page = page;
        this.csrfMiddlewareToken = '';
    }
    async getToken(){
        await this.page.goto('/users/delete-account/');


        const csrfTokenFromInputLocator= this.page.locator('//input[@name=\'csrfmiddlewaretoken\']');
        this.csrfMiddlewareToken = await csrfTokenFromInputLocator.inputValue();
        if (this.csrfMiddlewareToken === '') {
            throw new Error('CSRF token not found in HTML');
        }

        return {
            csrfMiddlewareToken: this.csrfMiddlewareToken,
            pageAPIContext: this.page.request
        };
    }
}



