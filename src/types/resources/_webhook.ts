import {APIResourceType, CampaignV2, OAuthClient, SanitizedAPIResourceType} from "./index"
import { Writeable } from "../utils"

export interface Webhook extends APIResourceType {
    last_attempted_at: string
    num_consecutive_times_failed: number
    paused: boolean
    secret: string
    triggers: string[]
    uri: string

    _type: 'webhook',
    _relationships: WebhookRelationships
}

export interface ExtendedWebhook extends Omit<SanitizedAPIResourceType<Webhook>, 'last_attempted_at'> {
    last_attempted_at: Date
}

export function extendWebhook(webhook: SanitizedAPIResourceType<Webhook>): ExtendedWebhook {
    return {
        ...webhook,
        last_attempted_at: new Date(webhook.last_attempted_at)
    }
}

export const WebhookFieldsList = [
    'last_attempted_at',
    'num_consecutive_times_failed',
    'paused',
    'secret',
    'triggers',
    'uri'
]

export type WebhookFields = Writeable<typeof WebhookFieldsList>

export type WebhookRelationships = {
    campaign: CampaignV2
    client: OAuthClient
}