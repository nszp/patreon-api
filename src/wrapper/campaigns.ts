import PatreonAPIClient from "../client"
import { Benefit, CampaignV2, Goal, SanitizedAPIResourceType, Tier, UserV2 } from "../types/resources"
import {extendCampaignV2, ExtendedCampaignV2} from "../types/resources/_campaignv2";
import {extendBenefit, ExtendedBenefit} from "../types/resources/_benefit";
import {ExtendedUserV2, extendUserV2} from "../types/resources/_userv2";
import {ExtendedGoal, extendGoal} from "../types/resources/_goal";
import {ExtendedTier, extendTier} from "../types/resources/_tier";

export type WrappedCampaignResponse = {
    id: string
    type: "campaign"
    attributes: ExtendedCampaignV2 | null
    benefits: Array<{
        id: string
        type: "benefit"
        attributes: ExtendedBenefit | null
    }> | null
    creator: {
        id: string
        type: "user"
        attributes: ExtendedUserV2 | null
    }
    goals: Array<{
        id: string
        type: "goal"
        attributes: ExtendedGoal | null
    }> | null
    tiers: Array<{
        id: string
        type: "tier"
        attributes: ExtendedTier | null
    }> | null
}

export type WrappedCampaignsResponse = Array<WrappedCampaignResponse>

type CampaignResponse = Awaited<ReturnType<PatreonAPIClient['getRawCampaignFull']>>

type CampaignsResponse = Awaited<ReturnType<PatreonAPIClient['getRawCampaignsFull']>>

type UnwrapArray<T> = T extends Array<infer U> ? U : T

function mapCampaign(
    included: CampaignsResponse['included']
) {
    return (campaign: UnwrapArray<CampaignsResponse['data']>): WrappedCampaignResponse => {
        return {
            id: campaign.id,
            type: 'campaign',
            attributes: extendCampaignV2(campaign.attributes),
            benefits: (campaign.relationships.benefits?.data ?? []).map(benefit => {
                const benefitResource =
                    included
                        .find(resource => resource.type === 'benefit' && resource.id === benefit.id) as unknown as {
                            attributes: SanitizedAPIResourceType<Benefit>
                        }
                if (benefitResource == null) return null
                return {
                    id: benefit.id,
                    type: 'benefit',
                    attributes: extendBenefit(benefitResource.attributes)
                }
            }) ?? null,
            creator: {
                id: campaign.relationships.creator.data.id,
                type: 'user',
                attributes: extendUserV2(included
                    .find(resource => resource.type === 'user'
                        && resource.id === campaign.relationships.creator.data.id)?.attributes as unknown as SanitizedAPIResourceType<UserV2>),
            },
            goals: (campaign.relationships.goals?.data ?? []).map(goal => {
                const goalResource =
                    included
                        .find(resource => resource.type === 'goal' && resource.id === goal.id) as unknown as {
                            attributes: SanitizedAPIResourceType<Goal>
                        }
                if (goalResource == null) return null
                return {
                    id: goal.id,
                    type: 'goal',
                    attributes: extendGoal(goalResource.attributes)
                }
            }) ?? null,
            tiers: (campaign.relationships.tiers?.data ?? []).map(tier => {
                const tierResource =
                    included
                        .find(resource => resource.type === 'tier' && resource.id === tier.id) as unknown as {
                            attributes: SanitizedAPIResourceType<Tier>
                        }
                if (tierResource == null) return null
                return {
                    id: tier.id,
                    type: 'tier',
                    attributes: extendTier(tierResource.attributes)
                }
            }) ?? null
        }
    }
}

export function wrapCampaignResponse(apiResponse: CampaignResponse): WrappedCampaignResponse {
    return mapCampaign(apiResponse.included)(apiResponse.data)
}

export function wrapCampaignsResponse(apiResponse: CampaignsResponse): WrappedCampaignsResponse {
    return apiResponse.data.map(mapCampaign(apiResponse.included))
}