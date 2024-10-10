import { Locator, Page, expect } from "@playwright/test";
import { BasePage } from "./basePage";

export class loginPage{

    page : Page
    readonly loginButton : Locator
    readonly loginPageTitle : Locator
    readonly signInBox : Locator
    readonly signInBar : Locator
    readonly enterPasswordBox : Locator
    readonly enterPasswordBar : Locator
    readonly welcomePage : Locator
    readonly yesStaySignedIn : Locator
    readonly profitabilityTools : Locator

    constructor(page: Page){
        this.page = page;
        this.loginPageTitle = page.locator("//*[text()='Log in to your Workspace']");
        this.loginButton = page.locator("//*[text()='Log in']");
        this.signInBox = page.locator("//*[text()='Sign in']");
        this.signInBar = page.locator("//input[@id='i0116']");
        this.enterPasswordBox = page.locator("//*[text()='Enter password']");
        this.enterPasswordBar = page.locator("//input[@id='i0118']");
        this.yesStaySignedIn = page.locator("//input[@type='submit']");
        this.welcomePage = page.locator("//*[text()='Welcome to your workspace']");
        this.profitabilityTools = page.locator("//*[text()='Profitability tool']");

    }

    ////////////////////////////////////////////////    Methods     ///////////////////////////////////////////////

    async loginPage(){
        const basePage = new BasePage(this.page);
        await this.page.waitForSelector("//*[text()='Log in to your Workspace']");
        await this.loginButton.click();
        await expect(this.signInBox).toBeVisible(); 
        await this.signInBar.fill('miguel.gutierrezc@ext.arcacontal.com')
        await this.page.keyboard.press('Enter');
        await expect (this.enterPasswordBox).toBeVisible();     
        await this.enterPasswordBar.fill('Coca.Arcacontal25')
        await this.page.keyboard.press('Enter');
        await this.page.waitForSelector("//input[@type='submit']");
        await this.yesStaySignedIn.click();
        await basePage.waitForSelectorVisible("//*[text()='Welcome to your workspace']");
        await expect(this.welcomePage).toBeVisible();   
    }

    async goToProfitabiltyTools(){ await this.profitabilityTools.click(); }



}