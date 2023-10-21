import {APIResourceType, Benefit, CampaignV2, Member, SanitizedAPIResourceType, UserV2} from "./index"
import { Writeable } from "../utils"

export interface Deliverable extends APIResourceType {
    completed_at: string | null
    delivery_status: 'delivered' | 'not_delivered' | 'wont_deliver'
    due_at: string | null

    _type: 'deliverable',
    _relationships: DeliverableRelationships
}

export interface ExtendedDeliverable extends Omit<SanitizedAPIResourceType<Deliverable>, 'completed_at' | 'due_at'> {
    completed_at: Date | null
    due_at: Date | null
}

export function extendDeliverable(deliverable: SanitizedAPIResourceType<Deliverable>): ExtendedDeliverable {
    return {
        ...deliverable,
        completed_at: deliverable.completed_at == null ? null : new Date(deliverable.completed_at),
        due_at: deliverable.due_at == null ? null : new Date(deliverable.due_at)
    }
}

export const DeliverableFieldsList = [
    'completed_at',
    'delivery_status',
    'due_at'
] as const

export type DeliverableFields = Writeable<typeof DeliverableFieldsList>

export type DeliverableRelationships = {
    benefit: Benefit
    campaign: CampaignV2
    member: Member
    user: UserV2
}