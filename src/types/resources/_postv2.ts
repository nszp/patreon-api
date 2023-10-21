import {APIResourceType, CampaignV2, UserV2, Tier, SanitizedAPIResourceType} from "./index"
import { Writeable } from "../utils"

export interface PostV2 extends APIResourceType {
    app_id: number | null
    app_status: string | null
    content: string | null
    embed_data: object | null
    embed_url: string | null
    is_paid: boolean | null
    is_public: boolean | null
    tiers: Array<Tier> | null
    published_at: string | null
    title: string | null
    url: string

    _type: 'post',
    _relationships: PostV2Relationships
}

export interface ExtendedPostV2 extends Omit<SanitizedAPIResourceType<PostV2>, 'published_at'> {
    published_at: Date | null
}

export function extendPostV2(post: SanitizedAPIResourceType<PostV2>): ExtendedPostV2 {
    return {
        ...post,
        published_at: post.published_at == null ? null : new Date(post.published_at)
    }
}

export const PostV2FieldsList = [
    'app_id',
    'app_status',
    'content',
    'embed_data',
    'embed_url',
    'is_paid',
    'is_public',
    'tiers',
    'published_at',
    'title',
    'url'
] as const

export type PostV2Fields = Writeable<typeof PostV2FieldsList>

export type PostV2Relationships = {
    campaign: CampaignV2
    user: UserV2
}