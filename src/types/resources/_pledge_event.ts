import {APIResourceType, CampaignV2, UserV2, Tier, SanitizedAPIResourceType} from "./index"
import { Writeable } from "../utils"

export interface PledgeEvent extends APIResourceType {
    amount_cents: number
    currency_code: string
    date: string
    payment_status: 'Paid' | 'Declined' | 'Deleted' | 'Pending' | 'Refunded' | 'Fraud' | 'Other'
    tier_id: string | null
    tier_title: string | null
    type: 'pledge_start' | 'pledge_upgrade' | 'pledge_downgrade' | 'pledge_delete' | 'subscription'

    _type: 'pledge_event',
    _relationships: PledgeEventRelationships
}

export interface ExtendedPledgeEvent extends Omit<SanitizedAPIResourceType<PledgeEvent>, 'date'> {
    date: Date
}

export function extendPledgeEvent(pledgeEvent: SanitizedAPIResourceType<PledgeEvent>): ExtendedPledgeEvent {
    return {
        ...pledgeEvent,
        date: new Date(pledgeEvent.date)
    }
}

export const PledgeEventFieldsList = [
    'amount_cents',
    'currency_code',
    'date',
    'payment_status',
    'tier_id',
    'tier_title',
    'type'
] as const

export type PledgeEventFields = Writeable<typeof PledgeEventFieldsList>

export type PledgeEventRelationships = {
    campaign: CampaignV2
    patron: UserV2
    tier: Tier
}