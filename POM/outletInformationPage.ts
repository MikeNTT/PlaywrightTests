import { Locator, Page, expect } from "@playwright/test";
import { BasePage } from "./basePage";

export class outletInformationPage{

    page : Page
    basePage : BasePage
    readonly summarySection : Locator
    readonly qualificationFormButton : Locator
    readonly qualifyCustomer : string
    readonly commentsButton : string
    readonly textAreaComment : string
    readonly doneButton : Locator
    readonly comment : string
    readonly deleteComment : string

    constructor(page: Page){
        this.page = page;
        this.basePage = new BasePage(page);
        this.summarySection = page.locator("//flt-semantics[contains(text(), 'Business Plan')]") 
        this.qualificationFormButton = page.getByRole('button', { name: 'Qualify Customer' })   
        this.qualifyCustomer = "//*[text()='Qualify Customer']"
        this.commentsButton = "//*[text()='Comment']"
        this.textAreaComment = "//textarea[@aria-label='Type Here.']"
        this.doneButton = page.locator("//*[text()='Done']")
        this.comment = "//flt-semantics[contains(@aria-label, 'Comment')]"
        this.deleteComment = "(//flt-semantics[contains(@aria-label, 'Comment')]//flt-semantics-container//flt-semantics)[2]"


    }


    ////////////////////////////////////////////////    Methods     ///////////////////////////////////////////////

    async validateSummarySection(id:string, name:string, direction:string){
        await this.basePage.waitForSelectorVisible(`//flt-semantics[contains(text(), '${id}')]`);
        expect(this.summarySection).toContainText(id);
        expect(this.summarySection).toContainText(name);
        expect(this.summarySection).toContainText(direction);
    }

    async clickQualificationFormButton(){
        await this.basePage.waitForSelectorVisible(this.qualifyCustomer);
        await this.qualificationFormButton.click(); 
    }

    async addNewComment(comment : string){
        await this.basePage.waitForSelectorVisible(this.commentsButton)
        await this.page.locator(this.commentsButton).click()
        await this.basePage.waitForSelectorVisible(this.textAreaComment)
        await this.page.locator(this.textAreaComment).fill(comment)
        await this.doneButton.click()
        // Get all popups when they open
        this.page.on('popup', async popup => {
        await popup.waitForLoadState();
        console.log(await popup.title());
  });
    }


}
