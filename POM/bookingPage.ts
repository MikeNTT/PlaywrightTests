import { Locator, Page } from "@playwright/test";
import { BasePage } from "./basePage";

export class bookingPage extends BasePage{

    readonly page : Page

    readonly fromPort : Locator
    readonly toPort : Locator  
    readonly inputName : Locator
    readonly findFlights : Locator
    readonly address : Locator
    readonly state : Locator
    readonly city : Locator
    readonly zipCode : Locator
    readonly creditCard : Locator
    readonly creditCardNumber : Locator
    readonly nameOnCard : Locator
    readonly finalMessage : Locator
    readonly chooseFlight : Locator
 

    constructor(page: Page){
        super(page);
        this.fromPort = page.locator('select[name="fromPort"]');
        this.toPort = page.locator('select[name="toPort"]');
        this.findFlights = page.locator('input[type="submit"]');
        this.inputName = page.locator('input[id="inputName"]');
        this.chooseFlight = page.locator('input[type="submit"]').nth(1);
        this.address = page.locator('input[id="address"]');
        this.state = page.locator('input[id="state"]');
        this.city = page.locator('input[id="city"]');
        this.zipCode = page.locator('input[id="zipCode"]');
        this.creditCard = page.locator('#cardType');
        this.creditCardNumber = page.locator('input[id="creditCardNumber"]');
        this.nameOnCard = page.locator('input[id="nameOnCard"]');
        this.finalMessage = page.getByText('Thank you for your purchase today!');
        
}

////////////////////////////////////////////////    Methods     ///////////////////////////////////////////////
 
    async selectDestiny(){
        await this.selectOption(this.fromPort, 'Paris');
        await this.selectOption(this.toPort, 'Rome');
        await this.clickOn(this.findFlights);
        await this.clickOn(this.chooseFlight);
    }

    async fillPersonalInfo(){
        await this.fillField(this.inputName, 'Miguel Gutierrez');
        await this.fillField(this.address, 'Victor Rosales');
        await this.fillField(this.city, 'Aguascalientes');
        await this.fillField(this.state, 'Aguascalientes');
        await this.fillField(this.zipCode, '99423');
        await this.selectOption(this.creditCard, 'amex');
        await this.fillField(this.creditCardNumber, '333322221111444');
        await this.fillField(this.nameOnCard, 'Miguel G');
        await this.clickOn(this.findFlights);

    }

    async confirmationBooking(){
        await this.expectVisible(this.finalMessage);
    }
}


