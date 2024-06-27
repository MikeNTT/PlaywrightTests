import { Locator, Page, expect } from "@playwright/test";

export class BasePage{
    page: Page;

    constructor(page: Page){
        this.page = page;
    }

    async loadWeb(url: string){
        await this.page.goto(url);
    }

    async waitForSelectorVisible(selector: string){
        await this.page.waitForSelector(selector)
    }
    async clickOn(selector : Locator){
        await selector.click();
    }

    async fillField(selector: Locator, value:string){
        await selector.fill(value)
    }

    async selectOption(selector: Locator, option: string){
        await selector.selectOption(option);
    }

    async expectVisible(selector: Locator){
        await expect(selector).toBeVisible();
    }

}
