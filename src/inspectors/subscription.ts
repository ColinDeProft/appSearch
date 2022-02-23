import { Inspector } from "../inspectors/abstract.inspector"
import { ImmowebInspector } from "./immoweb.inspector"
import { AddressesService } from "src/services/addresses.service"
import { UserDto } from "src/dto/user.dto"
import { allCriteriaNames } from "src/common/constants"
const puppeteer = require('puppeteer')

export class Subscription {

    // addressesService: AddressesService
    user: UserDto
    inspectors: Inspector[] = new Array
    active: boolean = true
    criteriaList: {[criterionName: string]: any}

    // constructor(user: UserDto, addressesService: AddressesService, criteriaList: {[criterion in keyof typeof allCriteriaNames]: any}) {
    constructor(user: UserDto, criteriaList: {[criterionName: string]: any}) {
        // this.addressesService = addressesService
        this.user = user
        this.criteriaList = criteriaList
        this.inspectors.push(new ImmowebInspector())
        // ...
    }

    async spam() {
        const browser = await puppeteer.launch({
            headless: false,
            ignoreHTTPSErrors: true,
            args: [`--window-size=1920,1080`],
            defaultViewport: {
              width:1920,
              height:1080
            }
        })
        const page = await browser.newPage()

        // while (this.active) {
            let inpectorsResults = []
            for(const inspector of this.inspectors) { //!\ .forEach doesnt work with async
                await inspector.initFormCallbacks(page)
                inspector.setupInspector(this.criteriaList)
                let addresses = await inspector.inspect(page)

                // for(const address of addresses) {
                //     let existingAddress = await this.addressesService.findOneOrFail(this.user, address)
                //     if (existingAddress)
                //         addresses.splice(addresses.indexOf(address), 1)
                //     else
                //         this.addressesService.create(this.user, address)
                // })

                await page.close()

                inpectorsResults.push({
                    addresses: addresses,
                    unavailableCriteria: inspector.getUnavailableCriteria()
                })
                console.log("inpectorsResults: " + JSON.stringify(inpectorsResults, null, '\t'))
            }
        //  sendToNotifAPI(inspectorsResults, this.user.token)
        //  await new Promise(resolve => setTimeout(resolve, timeBetweenInspections))
        // }
        await browser.close()
    }

    stop() {
        this.active = false
    }

}