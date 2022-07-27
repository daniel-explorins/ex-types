import { HasId } from '.';
import { CRUD, CommonType, SocialLinks } from './Common';
import { TaxType } from './Route';
// export interface User extends CRUD; HasId {
export interface User extends HasId, CRUD {
    email: string;
    firstName: string;
    lastName: string;
    username: string;
    avatarUrl: string;
    avatar?: string;
    avatarContentType: string;
    birthdate: string;
    gender: string;
    phoneNumber: string;
    phonePrefix: string;
    newsletterSubscription: boolean;
    firebaseId: string;
    type: string;
    language: Language;
    shortDescription: string;
    description: string;
    purchasedRoutes?: string[];
    purchasedRoutePackages?: string[];
    role?: UserRole;
    companyName?: string;
    companyAddress?: string;
    iban?: string;
    companyNif?: string;
    companyPostalCode?: string;
    companyCountry?: string;
    isPremium?: boolean;
    socialLinks?: SocialLinks;
    soldRoutes?: number;
    cashRoutes?: number;
    taxType?: TaxType;
    slug?: string;
    isVendor?: boolean;
}

export interface UserRole {
    id: number,
    name: 'admin' | 'user' | 'business'
    i18nKey: string
}

export interface Language {
    id: number;
    acronym: string;
    name: string;
}

export type Gender = 'male' | 'female';


export const userSocialLinksOptionNames = [
    'website', 
    'instagram', 
    'twitter',
    'facebook',
    'spotify',
    'meetup',
    'linkedin',
    'youtubeVideo', 
    'youtubeChannel',
    'tinder'
]




export interface UserUpdateRequest {
    username?: string;
    firstName?: string;
    lastName?: string;
    birthdate?: Date;
    gender?: Gender;
    phoneNumber?: string;
    phonePrefix?: string;
    languageId?: number;
    newsletterSubscription?: boolean;
    shortDescription?: string;
    description?: string;
    role?: string;
    companyName?: string;
    companyNif?: string;
    companyAddress?: string;
    companyPostalCode?: string;
    companyCountry?: string;
    socialLinks?: SocialLinks;
}
export interface SendEmailRequest {
    userLanguage: string,
    routeId: string,
    attachmentUrl: string,
    mailjetTemplateId?: number,
    raffleId?: number
}
