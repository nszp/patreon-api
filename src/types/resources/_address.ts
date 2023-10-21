import {APIResourceType, CampaignV2, SanitizedAPIResourceType, UserV2} from "./index"
import { Writeable } from "../utils"
import {APIResourceTag} from "../tags";

export interface Address extends APIResourceType {
    addressee: string | null
    city: string
    country: string
    created_at: string
    line_1: string | null
    line_2: string | null
    phone_number: string | null
    postal_code: string | null
    state: string | null

    _type: 'address',
    _relationships: AddressRelationships
}

export interface ExtendedAddress extends Omit<SanitizedAPIResourceType<Address>, 'created_at'> {
    created_at: Date
}

export function extendAddress(address: SanitizedAPIResourceType<Address>): ExtendedAddress {
    return {
        ...address,
        created_at: new Date(address.created_at)
    }
}

export const AddressFieldsList = [
    'addressee',
    'city',
    'country',
    'created_at',
    'line_1',
    'line_2',
    'phone_number',
    'postal_code',
    'state'
] as const

export type AddressFields = Writeable<typeof AddressFieldsList>

export type AddressRelationships = {
    campaigns: Array<CampaignV2>
    user: UserV2
}