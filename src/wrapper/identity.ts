import PatreonAPIClient from "../client"
import { CampaignV2, Member, SanitizedAPIResourceType, UserV2 } from "../types/resources"
import {ExtendedUserV2, extendUserV2} from "../types/resources/_userv2";
import {extendCampaignV2, ExtendedCampaignV2} from "../types/resources/_campaignv2";
import {ExtendedMember, extendMember} from "../types/resources/_member";

export type WrappedIdentityResponse = {
    id: string
    type: 'user'
    url: string
    attributes: ExtendedUserV2 | null
    campaign: {
        id: string
        type: 'campaign'
        url: string
        attributes: ExtendedCampaignV2 | null
    }
    memberships: Array<{
        id: string
        type: 'member'
        attributes: ExtendedMember | null
    }>
}

export function wrapIdentityResponse(apiResponse: 
    Awaited<ReturnType<PatreonAPIClient['getRawIdentityFull']>>): WrappedIdentityResponse {

    const user: WrappedIdentityResponse = apiResponse.data as unknown as WrappedIdentityResponse
    user.attributes = extendUserV2(apiResponse.data.attributes)
    user.url = apiResponse.links.self

    user.campaign = apiResponse.data.relationships.campaign.data as unknown as WrappedIdentityResponse['campaign']
    user.campaign.url = apiResponse.data.relationships.campaign.links.related
    const campaignInclude = apiResponse.included.find(resource => resource.type === 'campaign') as unknown as {
        attributes: SanitizedAPIResourceType<CampaignV2>
    }
    if (campaignInclude == null) return null
    user.campaign.attributes = extendCampaignV2(campaignInclude.attributes)

    user.memberships = apiResponse.data.relationships.memberships.data.map(member => {
        const memberResource = apiResponse.included.find(resource => resource.type === 'member' && resource.id === member.id) as unknown as {
            attributes: SanitizedAPIResourceType<Member>
        }
        if (memberResource == null) return null
        return {
            id: member.id,
            type: 'member',
            attributes: extendMember(memberResource.attributes)
        }
    })

    return user
}