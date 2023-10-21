import PatreonAPIClient from "../client"
import { SanitizedAPIResourceType, Member, Address, CampaignV2, UserV2, Tier } from "../types/resources"
import { ExtendedMember, extendMember } from "../types/resources/_member";
import { extendAddress, ExtendedAddress } from "../types/resources/_address";
import { extendCampaignV2, ExtendedCampaignV2 } from "../types/resources/_campaignv2";
import { ExtendedTier, extendTier } from "../types/resources/_tier";
import { ExtendedUserV2, extendUserV2 } from "../types/resources/_userv2";

export type WrappedMemberResponse = {
    id: string
    type: 'member'
    attributes: ExtendedMember | null
    address: {
        id: string
        type: 'address'
        attributes: ExtendedAddress | null
    } | null
    campaign: {
        id: string
        type: 'campaign'
        url: string
        attributes: ExtendedCampaignV2 | null
    }
    currently_entitled_tiers: Array<{
        id: string
        type: 'tier'
        attributes: ExtendedTier | null
    }>
    user: {
        id: string
        type: 'user'
        url: string
        attributes: ExtendedUserV2 | null
    }
}

export type WrappedMembersResponse = Array<WrappedMemberResponse>

type MemberResponse = Awaited<ReturnType<PatreonAPIClient['getRawMemberFull']>>

type MembersResponse = Awaited<ReturnType<PatreonAPIClient['getRawCampaignMembersFull']>>

type UnwrapArray<T> = T extends Array<infer U> ? U : T

function mapMember(
    included: MembersResponse['included']
) {
    return (member: UnwrapArray<MembersResponse['data']>): WrappedMemberResponse => {

        return {
            id: member.id,
            type: 'member',
            attributes: extendMember(member.attributes),
            address: member.relationships.address?.data != null ? {
                id: member.relationships.address.data.id,
                type: 'address',
                attributes: extendAddress(included
                    .find(resource => resource.type === 'address'
                        && resource.id === member.relationships.address.data.id)?.attributes as unknown as SanitizedAPIResourceType<Address>)
            } : null,
            campaign: {
                id: member.relationships.campaign.data.id,
                type: 'campaign',
                url: member.relationships.campaign.links.related,
                attributes: extendCampaignV2(included
                    .find(resource => resource.type === 'campaign'
                        && resource.id === member.relationships.campaign.data.id)?.attributes as unknown as SanitizedAPIResourceType<CampaignV2>)
            },
            currently_entitled_tiers: (member.relationships.currently_entitled_tiers?.data ?? []).map(tier => {
                const tierResource = included.find(resource => resource.type === 'tier' && resource.id === tier.id) as unknown as {
                    attributes: SanitizedAPIResourceType<Tier>
                }
                if (tierResource == null) throw new Error('Tier include not found')
                return {
                    id: tier.id,
                    type: 'tier',
                    attributes: extendTier(tierResource.attributes)
                }
            }),
            user: {
                id: member.relationships.user.data.id,
                type: 'user',
                url: member.relationships.user.links.related,
                attributes: extendUserV2(included
                    .find(resource => resource.type === 'user'
                        && resource.id === member.relationships.user.data.id)?.attributes as unknown as SanitizedAPIResourceType<UserV2>)
            }

        }

    }
}

export function wrapMemberResponse(apiResponse: MemberResponse): WrappedMemberResponse {
    return mapMember(apiResponse.included)(apiResponse.data)
}

export function wrapMembersResponse(apiResponse: MembersResponse): WrappedMembersResponse {
    return apiResponse.data.map(mapMember(apiResponse.included))
}