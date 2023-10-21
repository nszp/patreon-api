import {APIResourceType, Address, CampaignV2, Tier, PledgeEvent, UserV2, SanitizedAPIResourceType} from "./index"
import { Writeable } from "../utils"

export interface Member extends APIResourceType {
    campaign_lifetime_support_cents: number
    currently_entitled_amount_cents: number
    email: string
    full_name: string
    is_follower: boolean
    last_charge_date: string | null
    last_charge_status: 'Paid' | 'Declined' | 'Deleted' | 'Pending' | 'Refunded' | 'Fraud' | 'Other' | null
    lifetime_support_cents: number
    next_charge_date: string | null
    note: string
    patron_status: 'active_patron' | 'declined_patron' | 'former_patron' | null
    pledge_cadence: string
    pledge_relationship_start: string
    will_pay_amount_cents: number

    _type: 'member',
    _relationships: MemberRelationships
}

export interface ExtendedMember extends Omit<SanitizedAPIResourceType<Member>,
    'last_charge_date' | 'next_charge_date' | 'pledge_relationship_start'> {
    last_charge_date: Date | null
    next_charge_date: Date | null
    pledge_relationship_start: Date
}

export function extendMember(member: SanitizedAPIResourceType<Member>): ExtendedMember {
    return {
        ...member,
        last_charge_date: member.last_charge_date == null ? null : new Date(member.last_charge_date),
        next_charge_date: member.next_charge_date == null ? null : new Date(member.next_charge_date),
        pledge_relationship_start: new Date(member.pledge_relationship_start)
    }
}

export const MemberFieldsList = [
    'campaign_lifetime_support_cents',
    'currently_entitled_amount_cents',
    'email',
    'full_name',
    'is_follower',
    'last_charge_date',
    'last_charge_status',
    'lifetime_support_cents',
    'next_charge_date',
    'note',
    'patron_status',
    'pledge_cadence',
    'pledge_relationship_start',
    'will_pay_amount_cents'
] as const

export type MemberFields = Writeable<typeof MemberFieldsList>

export type MemberRelationships = {
    address: Address
    campaign: CampaignV2
    currently_entitled_tiers: Array<Tier>
    pledge_history: Array<PledgeEvent>
    user: UserV2
}