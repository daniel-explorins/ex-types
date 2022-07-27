import { UpdateFileRequest, UpdateFileConfirm, UpdateFileResponse, ImageFileType } from './Common';

export interface CreateMediaRequest extends UpdateFileRequest {
    order: number;
    entityType: MediaContainerEntityType
    mediaUsage?: 'iconUrl' | 'logoUrl' 
}

export interface CreateMarkerMediaResponse extends UpdateFileResponse {
    id: string;
}

export interface ConfirmMarkerMediaRequest extends UpdateFileConfirm {
    isMain: boolean;
}

export interface UpdateMediaRequest {
    s3File?: string;
    contentType?: ImageFileType;
    // isMain: boolean;
    order?: number,
    entityType: MediaContainerEntityType
}

export type MediaContainerEntityType = 'reward' | 'marker' | 'marketplace' | 'universe' | 'thematicSection' | 'partnerEntity' | 'thematicWorld'

export interface MediaItem {
    contentType: ImageFileType;
    createdAt: number;
    deletedAt: number;
    id: string;
    isMain?: boolean;
    updatedAt: number;
    url: string;
    order?: number;
    safeUrl?: any;
}

export interface MarkerIcon {
    name?: string;
    id?: number;
    i18nKey?: string;
}
