import { Locator, Page, expect } from "@playwright/test";
import { BasePage } from "./basePage";

export class profitHomePage{

    page : Page
    readonly basePage: BasePage
    readonly newCustomerButton: string   
    readonly searchBar : string
    readonly newCustomerPageElements : Locator
    readonly outletInformationHomePage : Locator
     readonly customerIdRow : Locator

    constructor(page: Page){
        this.page = page;
        this.basePage = new BasePage(page);
        this.newCustomerButton = "//flt-semantics[text()='New Customer']"
        this.searchBar = "//input[@aria-label='Search']"  
        this.newCustomerPageElements = page.locator("//*[contains(@aria-label, 'Equipment Qualification')]")
        this.outletInformationHomePage = page.locator("//*[text()='Outlet information ']")
    }

    ////////////////////////////////////////////////    Methods     ///////////////////////////////////////////////

    async navigateToNewCustomer(){ 
        await this.basePage.waitForSelectorVisible(this.newCustomerButton);
        await this.page.locator(this.newCustomerButton).click(); 
    }

    async searchACustomer(customer: string){                
        await this.basePage.waitForSelectorVisible(this.searchBar);
        await this.page.locator(this.searchBar).click()
        await this.page.locator(this.searchBar).fill(customer)
        await this.page.keyboard.press('Enter'); 
    }  

    async clickOnCustomerByID(customerID: string){  
        await this.basePage.waitForSelectorVisible(`//*[text()='${customerID}']`)
        await this.page.locator(`//*[text()='${customerID}']`).click();   
    }



}
