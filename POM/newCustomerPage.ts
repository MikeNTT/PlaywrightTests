import { Locator, Page, expect } from "@playwright/test";
import { BasePage } from "./basePage";

export class newCustomerPage{

    page : Page
    basePage : BasePage
    readonly subTradeChannelDropdown: string   
    readonly incidenceRate: string   


    constructor(page: Page){
        this.basePage = new BasePage(page);
        this.page = page;
        this.incidenceRate = "//*[contains(@aria-label, 'Incidence')]"  

        this.subTradeChannelDropdown = "//input[@aria-label='Sub Trade Channel']/following-sibling::flt-semantics-container//*[@role='button']"
    }

    ////////////////////////////////////////////////    Methods     ///////////////////////////////////////////////

    async selectSubTradeChannel(subTradeChannel: string){
        await this.basePage.waitForSelectorVisible(this.subTradeChannelDropdown)
        await this.page.locator(this.subTradeChannelDropdown).click()
        await this.page.locator(`//*[@role='text' and text()='${subTradeChannel}']`).click()
    }   

    async validateIncidenceRate(incidenceRate: string){
        await this.basePage.waitForSelectorVisible(this.incidenceRate)
        const ariaLabel = await this.page.locator(this.incidenceRate).getAttribute('aria-label');
        expect(ariaLabel).toContain(incidenceRate);
    }
    
}
