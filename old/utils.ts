export class Utils {

    static filterCriteriaList(possibleCriteria: {[key: string]: any}, criteriaList: {[key: string]: any}): {[key: string]: any} {
        // TODO criteriaList.filter(c => possibleCriteria.contains(c))
        return [];
    }

    static getMissingCriteria(possibleCriteria: {[key: string]: any}, criteriaList: {[key: string]: any}): {[key: string]: any} {
        // TODO possibleCriteria - criteriaList
        return [];
    }

    // TO CHECK do websites all use get & withparams ?
    // always returns html ?
    static async sendRequest(request: {baseUrl: string, method: string, dataTransferType: string, filteredCriteriaList: {[key: string]: any}}): Promise<string> {
        // TODO
        // if(request.dataTransferType == "withParam") {
        //     return httpClient.doRequestWithParam(request.method, buildUrl(request.baseUrl, request.criteriaList))
        // } else {
        //     return httpClient.doRequestWithBody(request.method, request.baseUrl, buildJson(request.criteriaList))
        // }
        return "";
    }

    "https://www.immotransit.be/fr/c/1000-bruxelles/a-louer/appartement?priceMax=800&sort=1"
    "https://www.immoweb.be/en/search/apartment/for-rent/Etterbeek/1040?countries=BE&maxPrice=800&minSurface=40&page=1&orderBy=newest"
    "https://immo.vlan.be/en/real-estate?transactiontypes=for-rent,to-share&propertytypes=flat&towns=1000-brussels&maxprice=800&noindex=1"
    "https://www.zimmo.be/fr/biens/?status=1&type%5B0%5D=1&priceMax=800&priceIncludeUnknown=1&priceChangedOnly=0&bedroomsIncludeUnknown=1&bathroomsIncludeUnknown=1&constructionIncludeUnknown=1&livingAreaIncludeUnknown=1&landAreaMin=40&landAreaIncludeUnknown=1&commercialAreaIncludeUnknown=1&yearOfConstructionIncludeUnknown=1&epcIncludeUnknown=1&queryCondition=and&includeNoPhotos=1&includeNoAddress=1&onlyRecent=0&onlyRecentlyUpdated=0&isPlus=0&region=list&city=MwQA#gallery"

    // rien dans param !
    "https://www.trevi.be/fr/residentiel/louer-bien-immobilier/appartement"

}