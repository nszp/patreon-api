import { APIResourceType } from "./resources"

export type APIResourceTag<Type extends string> = {
    id: string
    type: Type
}

export type APIResourceTagForRelationship<Data extends APIResourceType | Array<APIResourceType>>
    = Data extends Array<any> ? APIResourceTagForArrayRelationship<Data> : APIResourceTagForSingleRelationship<Data>

type APIResourceTagForArrayRelationship<T> = T extends Array<infer U> ? U extends APIResourceType ? 
{ 
    data: APIResourceTag<U["_type"]>[]
 } : never : never;

type APIResourceTagForSingleRelationship<T> = T extends APIResourceType ? {
    data: APIResourceTag<T["_type"]>,
    links: {
        related: string
    }
} : never;