export abstract class Scraper {

    // input : html page OR OTHER?
    // output : list of addresses
    abstract extractAddresses(response: string): string[]

}