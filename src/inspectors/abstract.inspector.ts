import { CriterionDto } from "src/dto/criterion.dto"

export abstract class Inspector {
    
    unavailableCriteria: string[] = [] // == what given criteria cant be used

    usedCriteria: CriterionDto[] = [] // == what given criteria are used

    abstract formCallbacks: {[criterionName: string]: (value: any) => any} // each criterion name has a callback to fill a form input

    abstract initFormCallbacks(page: any): void // note: we need the page where to execute callbacks

    setupInspector(criteriaList: CriterionDto[]): void { // fill usedCriteria & unavailableCriteria
        console.log(criteriaList)
        for(const criterionValue of criteriaList) {
            const formCallback = this.formCallbacks[criterionValue.criterionName.name]
            if(formCallback) {
                this.usedCriteria.push(criterionValue)
            } else
                this.unavailableCriteria.push(criterionValue.criterionName.name)
        }
    }

    abstract inspect(page: any): Promise<string[]> // do stuff, return addresses

    async executeFormCallbacks(): Promise<void> {
        for(const criterionValue of this.usedCriteria) {
            const callback = this.formCallbacks[criterionValue.criterionName.name]
            const value = criterionValue.value
            await callback(value)
        }
    }
    
    getUnavailableCriteria(): string[] { return this.unavailableCriteria }
    
}