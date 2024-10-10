import { test, expect } from '@playwright/test';
import { loginPage } from '../POM/loginPage';
import { profitHomePage } from '../POM/profitHomePage';
import { QualificationFormPage } from '../POM/QualificationFormPage';
import { outletInformationPage } from '../POM/outletInformationPage';
import customersData from '../Data/customersData';


test.describe('Qualification Form Tests', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('https://stccswfeqasc01.z21.web.core.windows.net/');
        const loginPOM = new loginPage(page);
        await loginPOM.loginPage();
        await loginPOM.goToProfitabiltyTools();
    });

    test(`Validate Incidence Rate on Qualification Form`, async ({ page }) => {
        const profitHomePOM = new profitHomePage(page);
        const OutletInformationPOM = new outletInformationPage(page);
        const QualificationFormPOM = new QualificationFormPage(page);

        await profitHomePOM.searchACustomer(customersData.Amigos_Taqueria_ID);
        await profitHomePOM.clickOnCustomerByID(customersData.Amigos_Taqueria_ID);
        await OutletInformationPOM.clickQualificationFormButton();
        await QualificationFormPOM.fillNumberOfCustomersPerDay('300');
        const incidenceRate = await QualificationFormPOM.getIncidenceRate();    
        expect(incidenceRate).toBe('30%');
    }); 
    
    
    test(`Validate DPD Formula on Qualification Form`, async ({ page }) => {
        const profitHomePOM = new profitHomePage(page);
        const OutletInformationPOM = new outletInformationPage(page);
        const QualificationFormPOM = new QualificationFormPage(page);

        await profitHomePOM.searchACustomer(customersData.Kidney_Dialysis);
        await profitHomePOM.clickOnCustomerByID(customersData.Kidney_Dialysis);
        await OutletInformationPOM.clickQualificationFormButton();
        await QualificationFormPOM.fillNumberOfCustomersPerDay('430');
        await QualificationFormPOM. ValidatePotentialNumberOfDPD();    

    });






});
