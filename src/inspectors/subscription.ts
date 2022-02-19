import { Inspector } from "../inspectors/abstract.inspector"
import { ImmowebInspector } from "./immoweb.inspector"
import { AddressesService } from "src/services/addresses.service"
import { UserDto } from "src/dto/user.dto"
import { allCriteria } from "src/common/constants"

export class Subscription {

    user: UserDto
    inspectors: Inspector[] = new Array
    active: boolean = true
    // addressesService: AddressesService

    // constructor(user: UserDto, addressesService: AddressesService, criteriaList: {[criterion in keyof typeof allCriteria]: any}) {
    constructor(user: UserDto, criteriaList: {[criterion in keyof typeof allCriteria]: any}) {
        this.user = user
        // this.addressesService = addressesService
        this.inspectors.push(new ImmowebInspector(criteriaList))
        // ...
    }

    async spam() {
        // while (this.active) {
            let inpectorsResults = []
            for(const inspector of this.inspectors) {
                console.log("avant inspect")
                let addresses = await inspector.inspect()
                addresses.forEach(async (address) => {
                    // let existingAddress = await this.addressesService.findOneOrFail(this.user, address)
                    // if (existingAddress)
                    //     addresses.splice(addresses.indexOf(address), 1)
                    // else
                    //     this.addressesService.create(this.user, address)
                })
                inpectorsResults.push({
                    addresses: addresses,
                    unavailableCriteria: inspector.getUnavailableCriteria()
                })
            }
            console.log(inpectorsResults)
        //  sendToNotifAPI(inspectorsResults, this.user.token)
        //  await new Promise(resolve => setTimeout(resolve, 3000))
        // }
    }

    stop() {
        this.active = false
    }

}