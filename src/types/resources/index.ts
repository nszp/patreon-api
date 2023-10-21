import { Address, AddressFields, AddressFieldsList } from "./_address"
import { Benefit, BenefitFields, BenefitFieldsList } from "./_benefit"
import { CampaignV2, CampaignV2Fields, CampaignV2FieldsList } from "./_campaignv2"
import { Deliverable, DeliverableFields, DeliverableFieldsList } from "./_deliverable"
import { Goal, GoalFields, GoalFieldsList } from "./_goal"
import { Media, MediaFields, MediaFieldsList } from "./_media"
import { Member, MemberFields, MemberFieldsList } from "./_member"
import { OAuthClient, OAuthClientFields, OAuthClientFieldsList } from "./_oauth_client"
import { PledgeEvent, PledgeEventFields, PledgeEventFieldsList } from "./_pledge_event"
import { PostV2, PostV2Fields, PostV2FieldsList } from "./_postv2"
import { Tier, TierFields, TierFieldsList } from "./_tier"
import { UserV2, UserV2Fields, UserV2FieldsList } from "./_userv2"
import { Webhook, WebhookFields, WebhookFieldsList } from "./_webhook"
import { APIResourceType } from "./base"

export type APIResourceNames = {
    address: Address
    benefit: Benefit
    campaign: CampaignV2
    deliverable: Deliverable
    goal: Goal
    media: Media
    member: Member
    oauth_client: OAuthClient
    pledge_event: PledgeEvent
    post: PostV2
    tier: Tier
    user: UserV2
    webhook: Webhook
}

export { APIResourceType }
export type SanitizedAPIResourceType<Resource extends APIResourceType> = Omit<Resource, '_type' | '_relationships'>

export { Address, Benefit, CampaignV2, Deliverable, Goal, Media, Member, OAuthClient, PledgeEvent, PostV2, Tier, UserV2, Webhook }
export { CampaignInstallation, Category, App } from './shims'

export { AddressFields, BenefitFields, CampaignV2Fields, DeliverableFields, GoalFields, MediaFields, MemberFields, OAuthClientFields, PledgeEventFields, PostV2Fields, TierFields, UserV2Fields, WebhookFields }
export { AddressFieldsList, BenefitFieldsList, CampaignV2FieldsList, DeliverableFieldsList, GoalFieldsList, MediaFieldsList, MemberFieldsList, OAuthClientFieldsList, PledgeEventFieldsList, PostV2FieldsList, TierFieldsList, UserV2FieldsList, WebhookFieldsList }