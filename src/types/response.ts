import { APIFieldsWithRequired } from "./fields";
import { APIResourceType, SanitizedAPIResourceType } from "./resources"
import { APIResourceTag, APIResourceTagForRelationship } from "./tags"
import { IsNonEmptyArray, NarrowAPIType } from "./utils"

export type APIResourceWithoutIncludes<
    Data extends APIResourceType,
    Fields extends APIFieldsWithRequired<
        Array<Data>
    >
> = APIResourceTag<Data['_type']> & {
    attributes: 
    Fields extends { [K in Data['_type']]: Array<infer T extends Exclude<keyof Data, "_type" | "_relationships">> } ? Pick<SanitizedAPIResourceType<Data>, T> : never
}

export type APIResource<
    Data extends APIResourceType,
    Includes extends Array<keyof Data['_relationships']>,
    Fields extends APIFieldsWithRequired<
        Array<Data | NarrowAPIType<Data['_relationships'][Includes[number]]>>
    >
> = IsNonEmptyArray<Includes> extends true ? APIResourceTag<Data['_type']> & {
    attributes: null |
    Fields extends { [K in Data['_type']]: Array<infer T extends Exclude<keyof Data, "_type" | "_relationships">> } ? Pick<SanitizedAPIResourceType<Data>, T> : never
    relationships: {
        [K in Includes[number]]: APIResourceTagForRelationship<Data['_relationships'][K]>
    }
} : APIResourceTag<Data['_type']> & {
    attributes: null |
    Fields extends { [K in Data['_type']]: Array<infer T extends Exclude<keyof Data, "_type" | "_relationships">> } ? Pick<SanitizedAPIResourceType<Data>, T> : never
};

type Included<
    MainType extends APIResourceType,
    Includes extends Array<keyof MainType['_relationships']>,
    Fields extends APIFieldsWithRequired<Array<
        MainType | NarrowAPIType<MainType['_relationships'][Includes[number]]>
    >>,
> = {
    [key in Includes[number]]: APIResourceWithoutIncludes<
        NarrowAPIType<MainType['_relationships'][key]>,
        Fields
    >
}

export type APIResponse<
    MainType extends APIResourceType | APIResourceType[],
    Includes extends Array<keyof NarrowAPIType<MainType>['_relationships']>,
    Fields extends APIFieldsWithRequired<Array<
        NarrowAPIType<MainType> | NarrowAPIType<NarrowAPIType<MainType>['_relationships'][Includes[number]]>
    >>,
> = (IsNonEmptyArray<Includes> extends never ? 
    MainType extends APIResourceType[] ? {
        data: Array<APIResourceWithoutIncludes<NarrowAPIType<MainType>, Fields>>
    } : {
        data: APIResourceWithoutIncludes<NarrowAPIType<MainType>, Fields>
        links: {
            self: string
        }
} : MainType extends APIResourceType[] ? {
    data: Array<APIResource<NarrowAPIType<MainType>, Includes, Fields>>
    included: Array<Included<NarrowAPIType<MainType>, Includes, Fields>[keyof Included<NarrowAPIType<MainType>, Includes, Fields>]>
} : {
    data: APIResource<NarrowAPIType<MainType>, Includes, Fields>
    included: Array<Included<NarrowAPIType<MainType>, Includes, Fields>[keyof Included<NarrowAPIType<MainType>, Includes, Fields>]>
    links: {
        self: string
    }
}) & {
    meta?: {
        pagination: {
            total: number,
            cursors: {
                next: string | null,
                previous?: string | null
            }
        }
    },
    links?: {
        next?: string,
    }
}
