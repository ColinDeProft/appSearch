import { ImmowebScraper } from "../scrapers/immoweb.scraper"
import { Inspector } from "../inspectors/abstract.inspector"
import { allCriteria } from "../shared/constants"

enum thisCriteria {
    MAXPRICE = allCriteria.MAXPRICE,
    MINPRICE = allCriteria.MINPRICE
}

export class ImmowebInspector extends Inspector {
    
    scraper = new ImmowebScraper()
    reqBaseUrl = "https://..."
    reqMethod = "get"
    reqDataTransferType = "withParam"
    possibleCriteria = {"minPrice": 500, "garage": true, "zone": "woluwe"}

    mappedCriteria: {[name in keyof typeof thisCriteria]: (value: any) => any} = {
        MAXPRICE: (value) => console.log("await input.type(leNomInputPrixMaxSurLesite, value)"),
        MINPRICE: (value) => console.log("await input.type(leNomInputPrixMinSurLesite, value)")
    }

    test(criteriaList: {criterion : keyof typeof allCriteria, value: any}[]) {
        criteriaList.forEach(entry => {
            try {
                let fillFormCallback = this.mappedCriteria[entry.criterion]
                this.fillFormCallbacks.push(fillFormCallback(entry.value))
            } catch {

            }
        })
    }

    constructor() {
        super()
        this.test([
            { // will add a pupeteer callback to fill the associated form input
                criterion: "MAXPRICE",
                value: 800
            },
            { // will throw exception (not in thisCriteria) thus be added in this.absentCriteria
                criterion: "HASGARAGE",
                value: 500
            }
        ])
    }
    

    //done
}