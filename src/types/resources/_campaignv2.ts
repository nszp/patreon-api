import {
    APIResourceType,
    CampaignInstallation,
    Category,
    Benefit,
    Goal,
    Tier,
    UserV2,
    SanitizedAPIResourceType
} from "./index"
import { Writeable } from "../utils"

export interface CampaignV2 extends APIResourceType {
    created_at: string
    creation_name: string | null
    discord_server_id: string | null
    google_analytics_id: string | null
    has_rss: boolean
    has_sent_rss_notify: boolean
    image_small_url: string
    image_url: string
    is_charged_immediately: boolean
    is_monthly: boolean
    is_nsfw: boolean
    main_video_embed: string | null
    main_video_url: string | null
    one_liner: string | null
    patron_count: number
    pay_per_name: string | null
    pledge_url: string
    published_at: string | null
    rss_artwork_url: string | null
    rss_feed_title: string
    show_earnings: boolean
    summary: string | null
    thanks_embed: string | null
    thanks_msg: string | null
    thanks_video_url: string | null
    url: string
    vanity: string | null

    _type: 'campaign',
    _relationships: CampaignV2Relationships
}

export interface ExtendedCampaignV2 extends Omit<SanitizedAPIResourceType<CampaignV2>, 'created_at' | 'published_at'> {
    created_at: Date
    published_at: Date | null
}

export function extendCampaignV2(campaign: SanitizedAPIResourceType<CampaignV2>): ExtendedCampaignV2 {
    return {
        ...campaign,
        created_at: new Date(campaign.created_at),
        published_at: campaign.published_at == null ? null : new Date(campaign.published_at)
    }
}

export const CampaignV2FieldsList = [
    'created_at',
    'creation_name',
    'discord_server_id',
    'google_analytics_id',
    'has_rss',
    'has_sent_rss_notify',
    'image_small_url',
    'image_url',
    'is_charged_immediately',
    'is_monthly',
    'is_nsfw',
    'main_video_embed',
    'main_video_url',
    'one_liner',
    'patron_count',
    'pay_per_name',
    'pledge_url',
    'published_at',
    'rss_artwork_url',
    'rss_feed_title',
    'show_earnings',
    'summary',
    'thanks_embed',
    'thanks_msg',
    'thanks_video_url',
    'url',
    'vanity'
] as const

export type CampaignV2Fields = Writeable<typeof CampaignV2FieldsList>

export type CampaignV2Relationships = {
    benefits: Array<Benefit>
    campaign_installation: CampaignInstallation
    categories: Array<Category>
    creator: UserV2
    goals: Array<Goal>
    tiers: Array<Tier>
}