import { APIResourceNames, APIResourceType, SanitizedAPIResourceType } from "./resources"

type APIFields = Partial<{
    [key in keyof APIResourceNames]: Array<keyof SanitizedAPIResourceType<APIResourceNames[key]>>
}>

export type APIFieldsWithRequired<Required extends Array<APIResourceType>> = {
    [K in Required[number] as K['_type']]: Array<keyof SanitizedAPIResourceType<K>>
} & APIFields