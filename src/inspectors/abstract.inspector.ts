import { allCriteriaNames } from "src/common/constants"

export abstract class Inspector {
    
    unavailableCriteria: string[] = [] // == what given criteria cant be used

    usedCriteria: {[criterionName: string]: any} = {} // == what given criteria are used

    abstract formCallbacks: {[criterionName: string]: (value: any) => any} // each criterion name has a callback to fill a form input

    abstract initFormCallbacks(page: any): void // note: we need the page where to execute callbacks

    setupInspector(criteriaList: {[criterionName: string]: any}): void { // fill usedCriteria & unavailableCriteria
        for(const key in criteriaList) {
            const formCallback = this.formCallbacks[key]
            if(formCallback) {
                if(criteriaList[key] != null)
                    this.usedCriteria[key] = criteriaList[key]
            } else
                this.unavailableCriteria.push(key)
        }
    }

    abstract inspect(page: any): Promise<string[]> // do stuff, return addresses

    async executeFormCallbacks(): Promise<void> {
        for(const key in this.usedCriteria) {
            const callback = this.formCallbacks[key]
            const value = this.usedCriteria[key]
            await callback(value)
        }
    }
    
    getUnavailableCriteria(): string[] { return this.unavailableCriteria }
    
}