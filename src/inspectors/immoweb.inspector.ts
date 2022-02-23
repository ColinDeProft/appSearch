import { Inspector } from "../inspectors/abstract.inspector"
import { allCriteriaNames } from "../common/constants"

enum thisCriteriaNames {
    MAX_PRICE = allCriteriaNames.MAX_PRICE,
    TRANSACTION_TYPE = allCriteriaNames.TRANSACTION_TYPE,
    PROPERTY_TYPE = allCriteriaNames.PROPERTY_TYPE,
    POSTAL_CODE = allCriteriaNames.POSTAL_CODE,
    MIN_ENERGY_CLASS = allCriteriaNames.MIN_ENERGY_CLASS,
    HAS_GARAGE = allCriteriaNames.HAS_GARAGE
}

export class ImmowebInspector extends Inspector {
    
    // criterionName : one of thisCriteriaNames (mandatory)
    // callback : an action for the associated form input
    formCallbacks: {[criterionName in keyof typeof thisCriteriaNames]: (value: any) => any} = null

    // page.
    // waitForSelector : waits for an html elt to appear
    // type : type in a field like a human would
    // $$eval : querySelectorAll. Results must be used like : "elts => ...", NOT "(elts) => {...}" 
    // waitForNavigation : waits until page is fully loaded
    // https://devdocs.io/puppeteer/index#class-page
    // https://www.w3schools.com/cssref/css_selectors.asp

    //!\ do not ever rely on waiting for x seconds

    initFormCallbacks(page: any): void {
        this.formCallbacks = {
            MAX_PRICE: async (value) => { 
                await page.type('#maxPrice', value)
            },
            TRANSACTION_TYPE: async (value) => {
                if(value == "RENT")
                    await page.click('.input--radio__input[value="FOR_RENT"]')
                //...
            },
            PROPERTY_TYPE: async (value) => { 
                await page.click('#propertyTypes')
                if(value == "APPARTMENT")
                    await page.click('#propertyTypes-item-1')
                //...
            },
            POSTAL_CODE: async (value) => { 
                await page.type('input[placeholder="Enter a city or a postal code"]', value)
                await page.waitForSelector('ul[aria-label="Suggestions"] > li') //!\ will throw exception if invalid postal code
                // await page.keyboard.press("Tab")
            },
            MIN_ENERGY_CLASS: async (value) => { 
                let e_classes = ['A++','A+','A','B','C','D','E','F','G']
                for (let i = 0; i < e_classes.length; i++) {
                    await page.click('label[for="' + e_classes[i] + '"]')
                    if(e_classes[i] == value) break
                }
                //...
            },
            HAS_GARAGE: async (value) => {
                //...
            }
        }
    }

    async inspect(page: any): Promise<string[]> {
        
        await page.goto('https://www.immoweb.be/en/advanced-search/')

        await page.waitForSelector('#uc-btn-accept-banner') // popup
        await page.click('#uc-btn-accept-banner')

        await this.executeFormCallbacks()

        await page.click('.form__field-submit__button[type="submit"]')

        await page.waitForNavigation()
        // await page.waitForSelector('.coachmark__content')

        let addresses = await page.$$eval('.search-results__list .card__title-link', elts => elts.map(el => el.getAttribute("href").replace(/\?.*/,'')))

        // await page.screenshot({path: 'vwala.png'})

        return addresses
    }
}