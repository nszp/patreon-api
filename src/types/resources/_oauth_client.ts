import { APIResourceType, App, CampaignV2, UserV2 } from "./index"
import { Writeable } from "../utils"


export interface OAuthClient extends APIResourceType {
    author_name: string
    client_secret: string
    default_scopes: string
    description: string
    domain: string | null
    icon_url: string | null
    name: string
    privacy_policy_url: string | null
    redirect_uris: string
    tos_url: string | null
    version: number

    _type: 'oauth_client',
    _relationships: OAuthClientRelationships
}

export const OAuthClientFieldsList = [
    'author_name',
    'client_secret',
    'default_scopes',
    'description',
    'domain',
    'icon_url',
    'name',
    'privacy_policy_url',
    'redirect_uris',
    'tos_url',
    'version'
] as const

export type OAuthClientFields = Writeable<typeof OAuthClientFieldsList>

export type OAuthClientRelationships = {
    apps: Array<App>
    campaign: CampaignV2
    // creator_token: string
    user: UserV2
}