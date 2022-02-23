import { Inspector } from "../inspectors/abstract.inspector"
import { ImmowebInspector } from "./immoweb.inspector"
import { AddressesService } from "src/services/addresses.service"
import { UserDto } from "src/dto/user.dto"
import { allCriteriaNames } from "src/common/constants"
const puppeteer = require('puppeteer')

export class Subscription {

    addressesService: AddressesService
    user: UserDto
    inspectors: Inspector[] = new Array
    active: boolean = true
    criteriaList: {[criterionName: string]: any}

    constructor(user: UserDto, criteriaList: {[criterionName: string]: any}, addressesService: AddressesService) {
        this.addressesService = addressesService
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

        // while (this.active) {
            let inpectorsResults = []
            for(const inspector of this.inspectors) { //!\ .forEach doesnt work with async
                
                let page = await browser.newPage() // to check : can we do stuff on multiple pages simultaneously ?

                await inspector.initFormCallbacks(page)
                inspector.setupInspector(this.criteriaList)
                let addresses = await inspector.inspect(page)

                for(let i = 0; i < addresses.length; i++) {
                    let existingAddress = await this.addressesService.findOne(this.user, addresses[i])
                    if (existingAddress) {
                        addresses.splice(i, 1)
                        i = i-1 // adapt to splice
                    } else
                        this.addressesService.create(this.user, addresses[i])
                    console.log(addresses)
                }

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