import {Locator, Page} from '@playwright/test';

export async function waitForPopupAndClickLink(page: Page, linkLocator: Locator): Promise<Page> {
    const [newPage] = await Promise.all([
        page.waitForEvent('popup'),
        linkLocator.click(),
    ]);
    await newPage.waitForLoadState();
    return newPage;
}
