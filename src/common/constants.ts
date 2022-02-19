export const criteriaNames: string[] = [
    "maxPrice",
    "minPrice"
]

export const ids = [
    "maxPrice",
    "minPrice"
] as const;

export type okName = "max" | "min"

export const ids2 = [
    "maxPrice",
    "minPrice"
] as const;

export enum allCriteria {
    MAXPRICE,
    MINPRICE,
    HASGARAGE,
    MINSURFACE
}

// export const enum criteriaNames {
//     transactionType,
//     zone,
//     propertyType,
//     minPrice,
//     maxPrice,
//     availableNow,
//     bedroomCount,
//     garage,
//     energyClass,
//     minSurface,
//     cheapestFirst,
//     newestFirst
// }