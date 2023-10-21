import PatreonAPIClient from "../client"
import { SanitizedAPIResourceType, CampaignV2, UserV2, PostV2 } from "../types/resources"
import { ExtendedPostV2, extendPostV2 } from "../types/resources/_postv2";
import { extendCampaignV2, ExtendedCampaignV2 } from "../types/resources/_campaignv2";
import { ExtendedUserV2, extendUserV2 } from "../types/resources/_userv2";

export type WrappedPostResponse = {
    id: string
    type: 'post'
    attributes: ExtendedPostV2 | null
    campaign: {
        id: string
        type: 'campaign'
        url: string
        attributes: ExtendedCampaignV2 | null
    }
    user: {
        id: string
        type: 'user'
        url: string
        attributes: ExtendedUserV2 | null
    }
}

export type WrappedPostsResponse = Array<WrappedPostResponse>

type PostResponse = Awaited<ReturnType<PatreonAPIClient['getRawPostFull']>>

type PostsResponse = Awaited<ReturnType<PatreonAPIClient['getRawCampaignPostsFull']>>

type UnwrapArray<T> = T extends Array<infer U> ? U : T

function mapPost(
    included: PostsResponse['included']
) {
    return (post: UnwrapArray<PostsResponse['data']>): WrappedPostResponse => {
        return {
            id: post.id,
            type: 'post',
            attributes: extendPostV2(post.attributes),
            campaign: {
                id: post.relationships.campaign.data.id,
                type: 'campaign',
                url: post.relationships.campaign.links.related,
                attributes: extendCampaignV2(included
                    .find(resource => resource.type === 'campaign'
                     && resource.id === post.relationships.campaign.data.id)?.attributes as unknown as SanitizedAPIResourceType<CampaignV2>)
            },
            user: {
                id: post.relationships.user.data.id,
                type: 'user',
                url: post.relationships.user.links.related,
                attributes: extendUserV2(included
                    .find(resource => resource.type === 'user'
                     && resource.id === post.relationships.user.data.id)?.attributes as unknown as SanitizedAPIResourceType<UserV2>)
            }
        }
    }
}

export function wrapPostResponse(apiResponse: PostResponse): WrappedPostResponse {
    return mapPost(apiResponse.included)(apiResponse.data)
}

export function wrapPostsResponse(apiResponse: PostsResponse): WrappedPostsResponse {
    return apiResponse.data.map(mapPost(apiResponse.included))
}