import { Scraper} from "../scrapers/abstract.scraper"

export class ImmowebScraper extends Scraper {

    extractAddresses(response: string): string[] {
        return []
    }
    
}