import { APIResourceNames } from "./index"

export interface APIResourceType {
    _type: keyof APIResourceNames
    _relationships: {
        [key: string]: APIResourceType | Array<APIResourceType>
    }
}