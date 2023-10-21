import {APIResourceType, CampaignV2, Member, SanitizedAPIResourceType} from "./index"
import { Writeable } from "../utils"

export interface UserV2 extends APIResourceType {
    about: string | null
    can_see_nsfw: boolean | null
    created: string
    email: string
    first_name: string | null
    full_name: string
    hide_pledges: boolean | null
    image_url: string
    is_email_verified: boolean
    last_name: string | null
    like_count: number
    social_connections: {
        deviantart: string | null
        discord: {
            url: string | null
            user_id: string | null
        } | null
        facebook: string | null
        google: string | null
        instagram: string | null
        reddit: string | null
        spotify: string | null
        spotify_open_access: string | null
        twitch: string | null
        twitter: string | null
        vimeo: string | null
        youtube: string | null
    }
    thumb_url: string
    url: string
    vanity: string | null

    _type: 'user',
    _relationships: UserV2Relationships
}

export interface ExtendedUserV2 extends Omit<SanitizedAPIResourceType<UserV2>, 'created'> {
    created: Date
}

export function extendUserV2(user: SanitizedAPIResourceType<UserV2>): ExtendedUserV2 {
    return {
        ...user,
        created: new Date(user.created)
    }
}

export const UserV2FieldsList = [
    'about',
    'can_see_nsfw',
    'created',
    'email',
    'first_name',
    'full_name',
    'hide_pledges',
    'image_url',
    'is_email_verified',
    'last_name',
    'like_count',
    'social_connections',
    'thumb_url',
    'url',
    'vanity'
] as const

export type UserV2Fields = Writeable<typeof UserV2FieldsList>

export type UserV2Relationships = {
    campaign: CampaignV2
    memberships: Array<Member>
}