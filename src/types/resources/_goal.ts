import {APIResourceType, CampaignV2, SanitizedAPIResourceType} from "./index"
import { Writeable } from "../utils"

export interface Goal extends APIResourceType {
    amount_cents: number
    completed_percentage: number
    created_at: string
    description: string | null
    reached_at: string | null
    title: string

    _type: 'goal',
    _relationships: GoalRelationships
}

export interface ExtendedGoal extends Omit<SanitizedAPIResourceType<Goal>, 'created_at' | 'reached_at'> {
    created_at: Date
    reached_at: Date | null
}

export function extendGoal(goal: SanitizedAPIResourceType<Goal>): ExtendedGoal {
    return {
        ...goal,
        created_at: new Date(goal.created_at),
        reached_at: goal.reached_at == null ? null : new Date(goal.reached_at)
    }
}

export const GoalFieldsList = [
    'amount_cents',
    'completed_percentage',
    'created_at',
    'description',
    'reached_at',
    'title'
] as const

export type GoalFields = Writeable<typeof GoalFieldsList>

export type GoalRelationships = {
    campaign: CampaignV2
}