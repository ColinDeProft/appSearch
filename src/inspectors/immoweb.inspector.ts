import { Inspector } from "../inspectors/abstract.inspector"
import { allCriteria } from "../common/constants"

// enums to prevent coding mistakes
enum thisCriteria {
    MAXPRICE = allCriteria.MAXPRICE,
    MINPRICE = allCriteria.MINPRICE,
    HASGARAGE = allCriteria.HASGARAGE,
    // ...
}

export class ImmowebInspector extends Inspector {

    // sample
    criteriaListSample: {[criterion in keyof typeof allCriteria]: any} = {
        "MINPRICE": 200, // will be used to fill the form
        "MAXPRICE": 800, // same
        "HASGARAGE": null, // will be ignored
        "MINSURFACE": 40 // will be added as unavailable in this website
    }

    // what is present in thisCriteria must be used here
    mappedCriteria: {[criterion in keyof typeof thisCriteria]: {callback: (value: any) => any, value: any}} = {
        MAXPRICE: {
            "callback": (value) => "page.$(inputMAXPRICEOnWebsite).type("+value+")",
            "value": undefined
        },
        MINPRICE: {
            "callback": (value) => "page.$(inputMINPRICEOnWebsite).type("+value+")",
            "value": undefined
        },
        HASGARAGE: {
            "callback": (value) => "page.$(inputHASGARAGEOnWebsite).type("+value+")",
            "value": undefined
        }
        // ...
    }

    constructor(criteriaList: {[criterion in keyof typeof allCriteria]: any}) {
        super()
        for(const key in criteriaList) {
            let mc = this.mappedCriteria[key]
            if(mc) {
                if(!(criteriaList[key] == null)) {
                    mc.value = criteriaList[key]
                    this.fillFormCallbacks.push(mc)
                }
            } else {
                this.unavailableCriteria.push(key)
            }
        }
    }

    async inspect(): Promise<string[]> {

        let fakeResult: string[] = []
        for(const ffcb of this.fillFormCallbacks) {
            let generatedAddressFake = await ffcb.callback(ffcb.value)
            fakeResult.push(generatedAddressFake)
        }
        return fakeResult
    }
}