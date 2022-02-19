import { type } from "os"
import { Scraper } from "../scrapers/abstract.scraper"
import { Utils } from "../shared/utils"
import { allCriteria } from "../shared/constants"
const puppeteer = require('puppeteer')

// interface myCallbackType { (myArgument: string): void }
// type MyCallback = (name: string) => string;

// const obj: Record<typeof ids[number], string> = {
//     maxPrice: "HELLO",
//     minPrice: "WORLD",
// };

// type Foo = 'maxPrice' | 'minPrice';
// type Bar = {[key in Foo]: any};

// type obj2 = "maxPrice" | "minPrice"

// const zzzz: string[] = [
//     "maxPrice",
//     "minPrice"
// ]

export abstract class Inspector {

    // properties to define in each implementation
    abstract readonly scraper: Scraper // specific scraper implementation for each one of this class implementation
    abstract readonly reqBaseUrl: string // website's api endpoint url to be used in request
    abstract readonly reqMethod: string // get, post, ...
    abstract readonly reqDataTransferType: string // withParam if request data sent as param, WithBody if as body
    abstract readonly possibleCriteria: {[key: string]: any} // list of usable filters specific to each website
    // note : criteria is plural for criterion (criteria = critères)

    request: {
        baseUrl: string,
        method: string,
        dataTransferType: string,
        filteredCriteriaList: {[key: string]: any} // data to be sent
    }
    
    missingCriteria: {[key: string]: any} // to let user know what criteria couldnt be used with this website (in contrast to all criterian he gave to api)

    fillFormCallbacks: [(value: any) => any]
    
    // used to setup and to update an inspector
    setup(criteriaList: {[key: string]: any}) {
        let filteredCriteria = Utils.filterCriteriaList(this.possibleCriteria, criteriaList)
        this.request = { 
            baseUrl: this.reqBaseUrl, 
            method: this.reqMethod, 
            dataTransferType: this.reqDataTransferType, 
            filteredCriteriaList: filteredCriteria // the user's megalist filtered according to whats present in possibleCriteria
        }
        this.missingCriteria = Utils.getMissingCriteria(this.possibleCriteria, filteredCriteria)
    }
    
    async inspect(): Promise<{addresses: string[], missingCriteria: {[key: string]: any}}> {
        let response = await Utils.sendRequest(this.request) // must get same response format for each website
        let inspectorResult = {
            addresses: this.scraper.extractAddresses(response),
            missingCriteria: this.missingCriteria
        }
        return inspectorResult
    }
    
}