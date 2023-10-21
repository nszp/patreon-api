import { APIResourceType } from "./resources";

export type IsNonEmptyArray<T> = T extends (infer U)[] ? U extends never ? false : true : false;

export type NarrowAPIType<Data extends APIResourceType | Array<APIResourceType>> =
    Data extends Array<any> ? Data[number] : Data

export type Writeable<T> = { -readonly [P in keyof T]: T[P] };
