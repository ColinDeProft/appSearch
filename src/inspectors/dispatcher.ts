import { Inspector } from "./abstract.inspector"
import { ImmowebInspector } from "./immoweb.inspector"
import { AddressesService } from "src/services/addresses.service"
import { UserDto } from "src/dto/user.dto"
import { CriterionDto } from "src/dto/criterion.dto"
import { SubscriptionDto } from "src/dto/subscription.dto"
const puppeteer = require('puppeteer')
const axios = require('axios');
const url = require('url');

export class Dispatcher {

    addressesService: AddressesService
    user: UserDto
    criteriaList: CriterionDto[]
    inspectors: Inspector[] = new Array
    isKilled: boolean = true
    inspectionInterval: number

    constructor(subscription: SubscriptionDto, addressesService: AddressesService) {
        this.addressesService = addressesService
        this.user = subscription.user
        this.criteriaList = subscription.criteriaList
        this.inspectionInterval = subscription.interval
        this.inspectors.push(new ImmowebInspector())
        // ...
    }

    async run() {

        const browser = await puppeteer.launch({
            headless: false,
            ignoreHTTPSErrors: true,
            args: [`--window-size=1920,1080`],
            defaultViewport: {
              width:1920,
              height:1080
            }
        })

        while (!this.isKilled) {
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
                        i = i-1
                    } else {
                        await this.addressesService.create(this.user, addresses[i])
                    }
                }

                await page.close()

                inpectorsResults.push({
                    addresses: addresses,
                    unavailableCriteria: inspector.getUnavailableCriteria()
                })
            }
            console.log("inpectorsResults: " + JSON.stringify(inpectorsResults, null, '\t'))
            // await this.sendNotif()
            await new Promise(resolve => setTimeout(resolve, this.inspectionInterval))
        }
        await browser.close()
    }

    kill() {
        this.isKilled = true
    }

    async sendNotif() {

        let payload = { 
            id: '82TGmps5s',
            title: 'new stuff', 
            message: 'couldnt use MINSURFACE, HASGARAGE', 
            action: 'https://wirepusher.com/' 
        }
    
        const params = new url.URLSearchParams(payload)
    
        let res = await axios.get(`https://wirepusher.com/send?${params}`)
    
        let data = res.data;
        console.log(data);
    }
    
    

}