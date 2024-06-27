import { test, expect } from '@playwright/test';
import { amazonPage } from '../POM/amazonPage';


test.describe('Amazon Tests', () => {
//crear mas test suite para cada tipo de pruebas
    test.beforeEach(async ({ page }) => {
        await page.goto('https://www.amazon.com.mx/');
      });

test('Add to the cart a ps5 that contains the "Opcion Amazon" ', async ({ page }) => {
    const amazonPOM = new amazonPage(page);
    amazonPOM.waitUntilAmazonPageIsVisible();
    await amazonPOM.searchProduct('Playstation 5');
    await amazonPOM.clickOnAmazonChoiceProduct();
    await amazonPOM.addProdutToCart(); 
    await amazonPOM.goToCart();
    const cartContent = await amazonPOM.cartItemContent();
    expect(cartContent).toContain('Sony PlayStation 5 Slim Console');
});

test('Prueba Amazon Prime', async ({ page }) => {

    const amazonPOM = new amazonPage(page);
    amazonPOM.waitUntilAmazonPageIsVisible();
    await amazonPOM.hoverMouseOnPrimeDropdown();
    await amazonPOM.clickOnPruebaAmazonPrime();
    await amazonPOM.clickOnPruebaAmazonPrimeButton();
    await amazonPOM.isIniciarSesionVisible();

});

//Test name mas descriptivo
test('drop down the department dropdown and select electronics and search for iphone and add a blue 15 pro max 512 gb', async ({ page }) => {

    const amazonPOM = new amazonPage(page);
    amazonPOM.waitUntilAmazonPageIsVisible();
    await amazonPOM.selectOndropdownDescription();
    await amazonPOM.searchProduct('iphone 15 pro max');
    await amazonPOM.listOfProductsContent('Apple iPhone 14 Pro MAX 128 GB Color Oro (Reacondicionado)');
    await amazonPOM.clickOnbutton512gb();
    await amazonPOM.addProdutToCart();
    await amazonPOM.clickOnNoGracias();
    await amazonPOM.goToCart();
    const cartContent = await amazonPOM.cartItemContent();
    expect(cartContent).toContain('(Reacondicionado)');
});





});