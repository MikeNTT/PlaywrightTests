import { Locator, Page, expect } from "@playwright/test";

export class amazonPage{

    page : Page
    readonly searchInput : Locator
    readonly searchButton : Locator
    readonly product : Locator
    readonly addToCart : Locator
    readonly cart : Locator
    readonly cartContent : Locator
    readonly amazonChoice : Locator
    readonly itemCartTitle : Locator
    readonly PrimeDropdown : Locator
    readonly pruebaAmazonPrime : Locator
    readonly pruebaAmazonPrimeBtn : Locator
    readonly iniciarSesionBox : Locator
    readonly searchDropdownDescription : Locator
    readonly button512gb : Locator
    readonly noGracias: Locator
    readonly listOfProducts : Locator
    readonly amazonPageContent : string


    constructor(page: Page){
        this.page = page;
        this.searchInput = page.locator('input[id="twotabsearchtextbox"]');
        this.searchButton = page.locator('input[id="nav-search-submit-button"]');
        this.amazonChoice = page.locator('span[id*="amazons-choice-label"]')
        this.addToCart = page.locator('[id=add-to-cart-button]');
        this.cart = page.getByText('Ir al carrito');
        this.cartContent = page.locator('span[class*="item-product-title"] span[class="a-truncate-full"]')
        this.PrimeDropdown = page.locator('[id=nav-link-amazonprime]')
        this.pruebaAmazonPrime = page.getByText('Prueba Amazon Prime  ')
        this.pruebaAmazonPrimeBtn = page.locator('[aria-labelledby="prime-header-CTA-announce"]')
        this.iniciarSesionBox = page.locator('[class*="a-box-inner a-padding"]')
        this.searchDropdownDescription = page.locator('select[aria-describedby="searchDropdownDescription"]')
        this.button512gb = page.locator('[title="Haz clic para seleccionar 512 GB"]')
        this.noGracias = page.locator('input[aria-labelledby="attachSiNoCoverage-announce"]')
        this.listOfProducts = page.locator('[data-cy="title-recipe"] >h2 >a>span')
        this.amazonPageContent = '[id=pageContent]'
    }


    ////////////////////////////////////////////////    Methods     ///////////////////////////////////////////////

    async clickOnAmazonChoiceProduct(){ await this.amazonChoice.click(); }
    async addProdutToCart() { await this.addToCart.click(); }    
    async goToCart(){ await this.cart.click();}
    async cartItemContent(){ return await this.cartContent.textContent(); }
    async hoverMouseOnPrimeDropdown(){ await this.PrimeDropdown.hover(); }
    async clickOnPruebaAmazonPrime(){ await this.pruebaAmazonPrime.click(); }
    async clickOnPruebaAmazonPrimeButton(){ await this.pruebaAmazonPrimeBtn.click(); }
    async isIniciarSesionVisible(){ await this.iniciarSesionBox.isVisible(); }
    async clickOndropdownDescription(){await this.searchDropdownDescription.click();}
    async selectOndropdownDescription(){await this.searchDropdownDescription.selectOption('Electrónicos');}
    async clickOnbutton512gb(){await this.button512gb.click();}
    async waitUntilAmazonPageIsVisible(){await this.page.waitForSelector(this.amazonPageContent);}
   
    async searchProduct(product : string){
        await this.searchInput.fill(product);
        await this.searchButton.click();
    }

    async listOfProductsContent(product: string) {
        await expect(this.listOfProducts).toHaveCount(31);
        const texts = await this.listOfProducts.allInnerTexts();
        for (let i = 0; i < texts.length; i++) {
            if (texts[i] === product) {
                await this.listOfProducts.nth(i).click();
                break;
            }
        }
    }

    async clickOnNoGracias() {
        if (await this.noGracias.isVisible()) {
            await this.noGracias.click();
        }
    }



}