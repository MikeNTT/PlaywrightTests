import { test, expect } from '@playwright/test';
import { loginPage } from '../POM/loginPage';
import { newCustomerPage } from '../POM/newCustomerPage';
import { profitHomePage } from '../POM/profitHomePage';
import { outletInformationPage } from '../POM/outletInformationPage';
import newCustomerData from '../Data/newCustomerData.json'; 



test.describe('New customer Tests', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('https://stccswfeqasc01.z21.web.core.windows.net/');
        const loginPOM = new loginPage(page);
        await loginPOM.loginPage();
        await loginPOM.goToProfitabiltyTools();
    });

    newCustomerData.forEach(({ subTradeChannel, expectedRate }) => {
        test(`Validate "${subTradeChannel}" Incidence rate is the correct`, async ({ page }) => {
            const profitHomePOM = new profitHomePage(page);
            const newCustomerPOM = new newCustomerPage(page);

            await profitHomePOM.navigateToNewCustomer();
            await newCustomerPOM.selectSubTradeChannel(subTradeChannel);
            await newCustomerPOM.validateIncidenceRate(expectedRate);
        });
    });






});
