import {APIResourceType, SanitizedAPIResourceType} from "./index"
import { Writeable } from "../utils"

export interface Media extends APIResourceType {
    created_at: string
    download_url: string
    file_name: string
    image_urls: object
    metadata: object | null
    mimetype: string
    owner_id: string
    owner_relationship: string
    owner_type: string
    size_bytes: number
    state: string
    upload_expires_at: string
    upload_parameters: object
    upload_url: string

    _type: 'media',
    _relationships: {}
}

export interface ExtendedMedia extends Omit<SanitizedAPIResourceType<Media>
    , 'created_at' | 'upload_expires_at'> {
    created_at: Date
    upload_expires_at: Date
}

export function extendMedia(media: SanitizedAPIResourceType<Media>): ExtendedMedia {
    return {
        ...media,
        created_at: new Date(media.created_at),
        upload_expires_at: new Date(media.upload_expires_at)
    }
}

export const MediaFieldsList = [
    'created_at',
    'download_url',
    'file_name',
    'image_urls',
    'metadata',
    'mimetype',
    'owner_id',
    'owner_relationship',
    'owner_type',
    'size_bytes',
    'state',
    'upload_expires_at',
    'upload_parameters',
    'upload_url'
] as const

export type MediaFields = Writeable<typeof MediaFieldsList>