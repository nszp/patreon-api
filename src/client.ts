import { FetchResultTypes, fetch } from "@sapphire/fetch"
import { CampaignV2, UserV2, Member, PostV2, UserV2Fields, CampaignV2Fields, MemberFields, APIResourceNames, UserV2FieldsList, CampaignV2FieldsList, MemberFieldsList, TierFields, BenefitFields, GoalFields, TierFieldsList, BenefitFieldsList, GoalFieldsList, AddressFields, AddressFieldsList, PostV2Fields, PostV2FieldsList } from "./types/resources"
import { APIFieldsWithRequired } from "./types/fields"
import { NarrowAPIType, Writeable } from "./types/utils"
import { APIResponse } from "./types/response"
import { WrappedIdentityResponse, wrapIdentityResponse } from "./wrapper/identity"
import { WrappedCampaignResponse, WrappedCampaignsResponse, wrapCampaignResponse, wrapCampaignsResponse } from "./wrapper/campaigns"
import { WrappedMemberResponse, WrappedMembersResponse, wrapMemberResponse, wrapMembersResponse } from "./wrapper/members"
import { WrappedPostResponse, WrappedPostsResponse, wrapPostResponse, wrapPostsResponse } from "./wrapper/posts"


export default class PatreonAPIClient {

    accessToken: string

    constructor(accessToken: string) {
        this.accessToken = accessToken
    }

    private async get<T>(url: string, includes: string[], fields: Partial<{
        [key in keyof APIResourceNames]: PropertyKey[]
    }>, count: number = 20, cursor?: string): Promise<T> {

        const baseUrl = new URL('https://patreon.com/api/oauth2' + url)

        for (const resource of Object.keys(fields)) {
            if(fields[resource as keyof APIResourceNames]!!.length > 0) {
                baseUrl.searchParams.set(`fields[${resource}]`, fields[resource as keyof APIResourceNames]!!.join(','))
            }
        }

        if (includes.length > 0) baseUrl.searchParams.set('include', includes.join(','))

        if (cursor) baseUrl.searchParams.set('page[cursor]', cursor)
        baseUrl.searchParams.set('page[count]', count.toString())

        return await fetch<T>(baseUrl.toString(), {
            headers: {
                Authorization: `Bearer ${this.accessToken}`
            }
        }, FetchResultTypes.JSON)
    }

    async getRawIdentity<
        Includes extends Array<keyof UserV2['_relationships']>,
        Fields extends APIFieldsWithRequired<
            Array<
                UserV2 | NarrowAPIType<UserV2['_relationships'][Includes[number]]>
            >
        >
    >(includes: Includes = [] as any, fields: Fields = {
        user: []
    } as any): Promise<APIResponse<UserV2, Includes, Fields>> {
        return await this.get('/v2/identity', includes, fields)
    }

    async getRawIdentityFull(): Promise<APIResponse<UserV2, ['memberships', 'campaign'], {
        user: UserV2Fields,
        campaign: CampaignV2Fields,
        member: MemberFields
    }>> {
        return await this.get('/v2/identity', ['memberships', 'campaign'], {
            user: UserV2FieldsList as UserV2Fields,
            campaign: CampaignV2FieldsList as CampaignV2Fields,
            member: MemberFieldsList as MemberFields
        })
    }

    async getIdentity(): Promise<WrappedIdentityResponse> {
        return wrapIdentityResponse(await this.getRawIdentityFull())
    }

    async getRawCampaigns<
        Includes extends Array<keyof CampaignV2['_relationships']>,
        Fields extends APIFieldsWithRequired<
            Array<
                CampaignV2 | NarrowAPIType<CampaignV2['_relationships'][Includes[number]]>
            >
        >
    >(includes: Includes = [] as any, fields: Fields = {
        campaign: []
    } as any): Promise<APIResponse<CampaignV2[], Includes, Fields>> {
        return await this.get('/v2/campaigns', includes, fields)
    }

    async getRawCampaignsFull(): Promise<APIResponse<CampaignV2[], ['tiers', 'creator', 'benefits', 'goals'], {
        campaign: CampaignV2Fields,
        tier: TierFields,
        user: UserV2Fields,
        benefit: BenefitFields,
        goal: GoalFields
    }>> {
        return await this.get('/v2/campaigns', ['tiers', 'creator', 'benefits', 'goals'], {
            campaign: CampaignV2FieldsList as CampaignV2Fields,
            tier: TierFieldsList as TierFields,
            user: UserV2FieldsList as UserV2Fields,
            benefit: BenefitFieldsList as BenefitFields,
            goal: GoalFieldsList as GoalFields
        })
    }

    async getCampaigns(): Promise<WrappedCampaignsResponse> {
        return wrapCampaignsResponse(await this.getRawCampaignsFull())
    }

    async getRawCampaign<
        Includes extends Array<keyof CampaignV2['_relationships']>,
        Fields extends APIFieldsWithRequired<
            Array<
                CampaignV2 | NarrowAPIType<CampaignV2['_relationships'][Includes[number]]>
            >
        >
    >(campaignId: string, includes: Includes = [] as any, fields: Fields = {
        campaign: []
    } as any): Promise<APIResponse<CampaignV2, Includes, Fields>> {
        return await this.get(`/v2/campaigns/${campaignId}`, includes, fields)
    }

    async getRawCampaignFull(campaignId: string): Promise<APIResponse<CampaignV2, ['tiers', 'creator', 'benefits', 'goals'], {
        campaign: CampaignV2Fields,
        tier: TierFields,
        user: UserV2Fields,
        benefit: BenefitFields,
        goal: GoalFields
    }>> {
        return await this.get(`/v2/campaigns/${campaignId}`, ['tiers', 'creator', 'benefits', 'goals'], {
            campaign: CampaignV2FieldsList as CampaignV2Fields,
            tier: TierFieldsList as TierFields,
            user: UserV2FieldsList as UserV2Fields,
            benefit: BenefitFieldsList as BenefitFields,
            goal: GoalFieldsList as GoalFields
        })
    }

    async getCampaign(campaignId: string): Promise<WrappedCampaignResponse> {
        return wrapCampaignResponse(await this.getRawCampaignFull(campaignId))
    }

    async getRawCampaignMembers<
        Includes extends Array<keyof Member['_relationships']>,
        Fields extends APIFieldsWithRequired<
            Array<
                Member | NarrowAPIType<Member['_relationships'][Includes[number]]>
            >
        >
    >(campaignId: string, includes: Includes = [] as any, fields: Fields = {
        member: []
    } as any, count: number = 20, cursor?: string): Promise<APIResponse<Member[], Includes, Fields>> {
        return await this.get(`/v2/campaigns/${campaignId}/members`, includes, fields, count, cursor)
    }

    async getRawCampaignMembersFull(campaignId: string, count: number = 20, cursor?: string): Promise<APIResponse<Member[], ['address', 'campaign', 'currently_entitled_tiers', 'user'], {
        member: MemberFields,
        address: AddressFields,
        campaign: CampaignV2Fields,
        tier: TierFields,
        user: UserV2Fields,
    }>> {
        return await this.get(`/v2/campaigns/${campaignId}/members`, ['address', 'campaign', 'currently_entitled_tiers', 'user'], {
            member: MemberFieldsList as MemberFields,
            address: AddressFieldsList as AddressFields,
            campaign: CampaignV2FieldsList as CampaignV2Fields,
            tier: TierFieldsList as TierFields,
            user: UserV2FieldsList as UserV2Fields,
        }, count, cursor)
    }

    async getCampaignMembers(campaignId: string, count: number = 20, paginate: boolean = false): Promise<WrappedMembersResponse> {
        if (!paginate) return wrapMembersResponse(await this.getRawCampaignMembersFull(campaignId))

        const first = await this.getRawCampaignMembersFull(campaignId, count)
        if (first.data.length < first.meta.pagination.total) {
            while (first.data.length < first.meta.pagination.total) {
                const next = await this.getRawCampaignMembersFull(campaignId, count, first.meta.pagination.cursors.next)
                first.data = first.data.concat(next.data)
                first.included = first.included.concat(next.included)
                first.meta.pagination = next.meta.pagination
            }
        }
        return wrapMembersResponse(first)
    }

    async getRawMember<
        Includes extends Array<keyof Member['_relationships']>,
        Fields extends APIFieldsWithRequired<
            Array<
                Member | NarrowAPIType<Member['_relationships'][Includes[number]]>
            >
        >
    >(memberId: string, includes: Includes = [] as any, fields: Fields = {
        member: []
    } as any): Promise<APIResponse<Member, Includes, Fields>> {
        return await this.get(`/v2/members/${memberId}`, includes, fields)
    }

    async getRawMemberFull(memberId: string): Promise<APIResponse<Member, ['address', 'campaign', 'currently_entitled_tiers', 'user'], {
        member: MemberFields,
        address: AddressFields,
        campaign: CampaignV2Fields,
        tier: TierFields,
        user: UserV2Fields,
    }>> {
        return await this.get(`/v2/members/${memberId}`, ['address', 'campaign', 'currently_entitled_tiers', 'user'], {
            member: MemberFieldsList as MemberFields,
            address: AddressFieldsList as AddressFields,
            campaign: CampaignV2FieldsList as CampaignV2Fields,
            tier: TierFieldsList as TierFields,
            user: UserV2FieldsList as UserV2Fields,
        })
    }

    async getMember(memberId: string): Promise<WrappedMemberResponse> {
        return wrapMemberResponse(await this.getRawMemberFull(memberId))
    }

    async getRawCampaignPosts<
        Includes extends Array<keyof PostV2['_relationships']>,
        Fields extends APIFieldsWithRequired<
            Array<
            PostV2 | NarrowAPIType<PostV2['_relationships'][Includes[number]]>
            >
        >
    >(campaignId: string, includes: Includes = [] as any, fields: Fields = {
        post: []
    } as any, count: number = 20, cursor?: string): Promise<APIResponse<PostV2[], Includes, Fields>> {
        return await this.get(`/v2/campaigns/${campaignId}/posts`, includes, fields, count, cursor)
    }

    async getRawCampaignPostsFull(campaignId: string, count: number = 20, cursor?: string): Promise<APIResponse<PostV2[], ['campaign', 'user'], {
        post: PostV2Fields,
        campaign: CampaignV2Fields,
        user: UserV2Fields,
    }>> {
        return await this.get(`/v2/campaigns/${campaignId}/posts`, ['campaign', 'user'], {
            post: PostV2FieldsList as PostV2Fields,
            campaign: CampaignV2FieldsList as CampaignV2Fields,
            user: UserV2FieldsList as UserV2Fields,
        }, count, cursor)
    }

    async getCampaignPosts(campaignId: string, count: number = 20, paginate: boolean = false): Promise<WrappedPostsResponse> {
        if (!paginate) return wrapPostsResponse(await this.getRawCampaignPostsFull(campaignId))

        const first = await this.getRawCampaignPostsFull(campaignId, count)
        if (first.data.length < first.meta.pagination.total) {
            while (first.data.length < first.meta.pagination.total) {
                const next = await this.getRawCampaignPostsFull(campaignId, count, first.meta.pagination.cursors.next)
                first.data = first.data.concat(next.data)
                first.meta.pagination = next.meta.pagination
            }
        }
        return wrapPostsResponse(first)
    }

    async getRawPost<
        Includes extends Array<keyof PostV2['_relationships']>,
        Fields extends APIFieldsWithRequired<
            Array<
            PostV2 | NarrowAPIType<PostV2['_relationships'][Includes[number]]>
            >
        >
    >(postId: string, includes: Includes = [] as any, fields: Fields = {
        post: []
    } as any): Promise<APIResponse<PostV2, Includes, Fields>> {
        return await this.get(`/v2/posts/${postId}`, includes, fields)
    }

    async getRawPostFull(postId: string): Promise<APIResponse<PostV2, ['campaign', 'user'], {
        post: PostV2Fields,
        campaign: CampaignV2Fields,
        user: UserV2Fields,
    }>> {
        return await this.get(`/v2/posts/${postId}`, ['campaign', 'user'], {
            post: PostV2FieldsList as PostV2Fields,
            campaign: CampaignV2FieldsList as CampaignV2Fields,
            user: UserV2FieldsList as UserV2Fields,
        })
    }

    async getPost(postId: string): Promise<WrappedPostResponse> {
        return wrapPostResponse(await this.getRawPostFull(postId))
    }

}

