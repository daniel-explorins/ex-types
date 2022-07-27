export interface GoogleObj {
    q: string[];
    target: string;
}

export interface Createable {
    createdAt: string;
}

export interface Updateable {
    updatedAt: string;
}

export interface Deleteable {
    deletedAt: string;
}

export interface CRUD extends Createable, Updateable, Deleteable {}

export interface PrivacyStatus {
    isPublic: boolean;
}

export interface HasId {
    id?: string;
}

export interface Likeable {
    likedByMe?: boolean;
    likesDone?: number;
    likesReceived?: number;
}

export interface Likeable {
    likedByMe?: boolean;
    likesDone?: number;
    likesReceived?: number;
}

export interface CRUDBy {
    createdById: string;
    updatedById: string;
}

export interface Count {
    count: number;
}

export interface FileUploadRequest {
    contentType: ImageFileType;
    originalFilename: string;
    file: File;
}

export interface FileUploadResponse {
    type: ImageFileType;
    s3File: string;
    id: string;
}

export type ImageFileType = 'image/jpeg' | 'image/png' | 'application/pdf';

export type PageAction = 'resetPassword' | 'verifyEmail';

export type SwapMarkerDirection = 'UP' | 'DOWN';

export type MoveMarkerCases = 'MOVE_TO_FIRST' | 'MOVE_TO_LAST' | 'DEFAULT';

export type TextType = 'dark' | 'clear';

export interface UpdateFileRequest {
    contentType: ImageFileType;
    originalFilename: string;
    type?: string;
}
export interface TabButtonType {
    id?: number,
    typeCode: string,
    iconUrl?: string,
    icon: string,
    name: string,
    isFeatured?: boolean
}

export interface UpdateFileConfirm {
    s3File: string;
    contentType: ImageFileType;
    type?: string;
}

export interface UpdateFileResponse {
    contentType: ImageFileType;
    s3Url: string;
    s3File: string;
}

export interface CommonType {
    id: number;
    name: string;
    i18nKey ?: string;
    acronym ?: string;
}

export interface SocialLinks {
    website?: string;
    instagram?: string;
    twitter?: string;
    facebook?: string;
    spotify?: string;
    meetup?: string;
    linkedin?: string;
    youtubeVideo?: string;
    youtubeChannel?: string;
    tinder?: string;
}

export interface SocialLinksOption {
    name: string,
    iconCode: string,
    urlReference: string,
    url: string,
    urlSnippet?: string
}

export interface PageTabType {
    id?: number,
    icon?: string,
    name?: string,
    component: string,
    backgroundColor?: string,
    backgroundImg?: string,
    title?: string,
    subtitle?: string,
    description?: string,
    category?: string,
    categoryDescription?: string;
}

export interface MediaStream {
    active: boolean
    id: string
    onactive: any
    onaddtrack: any
    oninactive: any
    onremovetrack: any
}

export const socialLinksStructure: SocialLinksOption[] = [
    {name: 'website', iconCode:'e-icon-earth', urlReference: '', url: 'http'}, 
    {name: 'instagram', iconCode: 'e-icon-socialmedia_instagram', urlReference: 'https://www.instagram.com', urlSnippet: 'www.instagram.com', url: ''},
    {name: 'twitter', iconCode: 'e-icon-twitter-brands', urlReference: 'https://twitter.com', urlSnippet: 'twitter.com', url: ''},
    {name: 'facebook', iconCode: 'e-icon-facebook-f-brands', urlReference: 'https://www.facebook.com', urlSnippet: 'www.facebook.com', url: ''},
    {name: 'spotify', iconCode:'e-icon-spotify-brands', urlReference: 'https://open.spotify.com', urlSnippet: 'open.spotify',  url: ''},
    {name: 'meetup', iconCode:'e-icon-meetup', urlReference: 'https://www.meetup.com', urlSnippet: 'www.meetup.com', url: ''},
    {name: 'linkedin', iconCode:'e-icon-linkedin-in-brands', urlReference: 'https://www.linkedin.com', urlSnippet: 'www.linkedin.com', url: ''},
    {name: 'youtubeVideo', iconCode: 'e-icon-youtube-brands', urlReference: 'youtu', urlSnippet: 'youtu', url: ''},
    {name: 'youtubeChannel', iconCode: 'e-icon-youtube-brands', urlReference: 'youtu', urlSnippet: 'youtu', url: ''},
    {name: 'tinder', iconCode:'e-icon-tinder',urlReference: 'https://www.gotinder.com', urlSnippet: 'www.gotinder.com', url: ''}
]
