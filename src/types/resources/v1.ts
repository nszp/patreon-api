import { Address, Goal, Tier } from "./index"

export type Campaign = {
    type: 'campaign',
    id: string
    attributes: {
        summary: string
        creation_name: string
        pay_per_name: string
        one_liner: string
        main_video_embed: string
        main_video_url: string
        image_small_url: string
        image_url: string
        thanks_video_url: string
        thanks_embed: string
        thanks_msg: string
        is_monthly: boolean
        is_nsfw: boolean
        created_at: string
        published_at: string
        pledge_url: string
        pledge_sum: number
        patron_count: number
        creation_count: number
        outstanding_payment_amount_cents: number
    }
    relationships: {
        creator: User
        rewards: Tier[]
        goals: Goal[]
        pledges: Pledge[]
    }
}

export type Pledge = {
    type: 'pledge',
    id: string
    attributes: {
        amount_cents: number
        created_at: string
        declined_since: string
        pledge_cap_cents: number
        patron_pays_fees: boolean
        total_historical_amount_cents?: number
        is_paused?: boolean
        has_shipping_address?: boolean
        status?: 'valid' | 'declined' | 'pending' | 'deleted'
    }
    relationships: {
        patron: User
        rewards: Tier[]
        creator: User
        address: Address
    }
}

export type User = {
    type: 'user',
    id: string
    attributes: {
        first_name: string
        last_name: string
        full_name: string
        vanity: string
        email: string
        about: string
        facebook_id: string
        image_url: string
        thumb_url: string
        youtube: string
        twitter: string
        facebook: string
        created: string
        url: string
        like_count?: number
        comment_count?: number
    }
    relationships: {
        campaign: Campaign
    }
}