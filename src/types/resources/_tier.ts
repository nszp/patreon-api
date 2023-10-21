import {APIResourceType, Benefit, CampaignV2, Media, SanitizedAPIResourceType} from "./index"
import { Writeable } from "../utils"

export interface Tier extends APIResourceType {
    amount_cents: number
    created_at: string
    description: string
    discord_role_ids: Array<string> | null
    edited_at: string
    image_url: string | null
    patron_count: number
    post_count: number | null
    published: boolean
    published_at: string | null
    remaining: number | null
    requires_shipping: boolean
    title: string
    unpublished_at: string | null
    url: string
    user_limit: number | null

    _type: 'tier',
    _relationships: TierRelationships
}

export interface ExtendedTier extends Omit<SanitizedAPIResourceType<Tier>,
    'created_at' | 'edited_at' | 'published_at' | 'unpublished_at'> {
    created_at: Date
    edited_at: Date
    published_at: Date | null
    unpublished_at: Date | null
}

export function extendTier(tier: SanitizedAPIResourceType<Tier>): ExtendedTier {
    return {
        ...tier,
        created_at: new Date(tier.created_at),
        edited_at: new Date(tier.edited_at),
        published_at: tier.published_at == null ? null : new Date(tier.published_at),
        unpublished_at: tier.unpublished_at == null ? null : new Date(tier.unpublished_at)
    }
}

export const TierFieldsList = [
    'amount_cents',
    'created_at',
    'description',
    'discord_role_ids',
    'edited_at',
    'image_url',
    'patron_count',
    'post_count',
    'published',
    'published_at',
    'remaining',
    'requires_shipping',
    'title',
    'unpublished_at',
    'url',
    'user_limit'
] as const

export type TierFields = Writeable<typeof TierFieldsList>

export type TierRelationships = {
    benefits: Array<Benefit>
    campaign: CampaignV2
    tier_image: Media
}