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
        const interval = 1000; // 1 segundo

        while (Date.now() - Date.now() < 60000) {
            try {
                await this.page.waitForSelector(selector, { timeout: interval });
                return; // Si se encuentra el selector, salir del método
            } catch (e) {
                // Si no se encuentra el selector, continuar intentando
            }
        }

        throw new Error(`El ${selector} no se encontró dentro del tiempo de espera de 60 segundos`);
    }

    async expectVisible(selector: Locator){
        await expect(selector).toBeVisible();
    }

}
