import {APIResourceType, CampaignV2, Deliverable, SanitizedAPIResourceType, Tier} from "./index"
import { Writeable } from "../utils"

export interface Benefit extends APIResourceType {
    app_external_id: string | null
    app_meta: object | null
    benefit_type: string | null
    created_at: string
    deliverables_due_today_count: number
    delivered_deliverables_count: number
    description: string | null
    is_deleted: boolean
    is_ended: boolean
    is_published: boolean
    next_deliverable_due_date: string | null
    not_delivered_deliverables_count: number
    rule_type: string | null
    tiers_count: number
    title: string

    _type: 'benefit',
    _relationships: BenefitRelationships
}

export interface ExtendedBenefit extends Omit<SanitizedAPIResourceType<Benefit>,
    'created_at' | 'next_deliverable_due_date'> {
    created_at: Date
    next_deliverable_due_date: Date | null
}

export function extendBenefit(benefit: SanitizedAPIResourceType<Benefit>): ExtendedBenefit {
    return {
        ...benefit,
        created_at: new Date(benefit.created_at),
        next_deliverable_due_date: benefit.next_deliverable_due_date == null ? null : new Date(benefit.next_deliverable_due_date)
    }
}

export const BenefitFieldsList = [
    'app_external_id',
    'app_meta',
    'benefit_type',
    'created_at',
    'deliverables_due_today_count',
    'delivered_deliverables_count',
    'description',
    'is_deleted',
    'is_ended',
    'is_published',
    'next_deliverable_due_date',
    'not_delivered_deliverables_count',
    'rule_type',
    'tiers_count',
    'title'
] as const

export type BenefitFields = Writeable<typeof BenefitFieldsList>

export type BenefitRelationships = {
    campaign: CampaignV2
    campaign_installation: any
    deliverables: Array<Deliverable>
    tiers: Array<Tier>
}
