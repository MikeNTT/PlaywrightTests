import { test, expect } from '@playwright/test';
import { loginPage } from '../POM/loginPage';
import { profitHomePage } from '../POM/profitHomePage';
import { outletInformationPage } from '../POM/outletInformationPage';
import outletHomeData from '../Data/outletHomeData.json';
import customersData from '../Data/customersData';


test.describe('Outlet Home Tests', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('https://stccswfeqasc01.z21.web.core.windows.net/');
        const loginPOM = new loginPage(page);
        await loginPOM.loginPage();
        await loginPOM.goToProfitabiltyTools();
    });


    outletHomeData.forEach(({ id, name, direction }) => {
        test(`Validate for "${id}" the summary section values are correct`, async ({ page }) => {
            const profitHomePOM = new profitHomePage(page);
            const outletInformationPOM = new outletInformationPage(page);
            await profitHomePOM.searchACustomer(id);
            await profitHomePOM.clickOnCustomerByID(id);
            await outletInformationPOM.validateSummarySection(id, name, direction)

        });
    });


        test(`Validate add new comment`, async ({ page }) => {
            const profitHomePOM = new profitHomePage(page);
            const OutletInformationPOM = new outletInformationPage(page);
            await profitHomePOM.searchACustomer(customersData.Degree_Pizza_ID);
            await profitHomePOM.clickOnCustomerByID(customersData.Degree_Pizza_ID);
            await OutletInformationPOM.addNewComment('This is a test comment');
        });

        test(`Validate Resources component open once clicking`, async ({ page }) => {
            const profitHomePOM = new profitHomePage(page);
            const OutletInformationPOM = new outletInformationPage(page);
             await profitHomePOM.searchACustomer(customersData.Degree_Pizza_ID);
            await profitHomePOM.clickOnCustomerByID(customersData.Degree_Pizza_ID);
        });







});
