import { Locator, Page, expect } from "@playwright/test";
import { BasePage } from "./basePage";

export class QualificationFormPage {
    page: Page;
    private numberOfCustomers: string;
    readonly basePage: BasePage;
    readonly numberOfCustomersPerDay: Locator;
    readonly numberOfCustomersPerDayString: string;
    readonly QualificationPage: string
    readonly outletInformationButton: Locator
    readonly qualificationFormButton: Locator

    constructor(page: Page) {
        this.page = page;
        this.basePage = new BasePage(page); // Instancia BasePage una sola vez
        this.numberOfCustomersPerDay = page.getByLabel('Number of customers per day');
        this.numberOfCustomersPerDayString = "//*[@aria-label='Number of customers per day']";
        this.QualificationPage = "//flt-semantics[contains(@aria-label, 'Customer Qualification')]";
        this.outletInformationButton = page.locator("//*[text()='Outlet information']")
        this.qualificationFormButton = page.getByRole('button', { name: 'Qualify Customer' })
        this.numberOfCustomers = ''; // solo para incializar la variable

    }

    ////////////////////////////////////////////////    Methods     ///////////////////////////////////////////////

    async fillNumberOfCustomersPerDay(numberOfCustomers: string) {
        this.numberOfCustomers = numberOfCustomers;
        this.basePage.waitForSelectorVisible(this.numberOfCustomersPerDayString);
        await this.numberOfCustomersPerDay.click();
        await this.numberOfCustomersPerDay.fill(numberOfCustomers);
    }

    async getIncidenceRate() {
        const customerDetails = await this.getCustomerQualificationDetails();
        // Extraer solo la parte de "Incidence..."
        const incidenceMatch = customerDetails.match(/Incidence\s*\n\s*(\d+\.\d+)%/);
        const incidence = incidenceMatch ? `${incidenceMatch[1]}%` : null;
        // este metodo regresa el Incidence para hacer el assert en el test
        return incidence;
    }


    async ValidatePotentialNumberOfDPD() {
        const incidenceRate = await this.getIncidenceRate();

        if (incidenceRate) {
            const decimalNumber = parseFloat(incidenceRate.replace('%', '')) / 100;
            // Formatear a tres dígitos decimales
            const incidenceRateNumber = parseFloat(decimalNumber.toFixed(3));
            const expectedDPD = (incidenceRateNumber * parseInt(this.numberOfCustomers)).toFixed(1);     
                 
            const customerDetails = await this.getCustomerQualificationDetails();
            const dpd = customerDetails.match(/Potential Number of Drinks per Day Sold\s*\n\s*(\d+(\.\d+)?)/);
            const actualDPD = dpd ? `${dpd[1]}` : null;

            expect(actualDPD).toBe(expectedDPD);
        } else {
            console.error('Incidence rate is null.');
            return null;
        }

    }

    async getCustomerQualificationDetails() {
        const isVisible = await this.page.isVisible(this.QualificationPage);
        if (!isVisible) {
            await this.page.reload();
            await this.basePage.waitForSelectorVisible(this.QualificationPage);
            await this.numberOfCustomersPerDay.click();
            await this.numberOfCustomersPerDay.fill(this.numberOfCustomers);
        }
        const element = await this.page.locator(this.QualificationPage);
        const ariaLabel = await element.getAttribute('aria-label');

        if (ariaLabel)
            return ariaLabel;
        else
            throw new Error('El atributo aria-label es null');
    }

}