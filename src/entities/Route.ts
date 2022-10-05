import { HasId, CRUD, User, RouteLine, RouteMarker } from '.';
import { CommonType } from './Common';
import { RouteThumbnailData } from './RouteThumbnail';
import { RoutePackage } from './ThematicUniverse';

import 'geojson'

type Line = GeoJSON.LineString;
type LineCollection = GeoJSON.FeatureCollection<Line>;

export interface RouteFixtureTypes {
    categoryTypes       : Array<CommonType>;
    statusTypes         : Array<CommonType>;
    budgetTypes         : Array<CommonType>;
    mapTypes            : Array<CommonType>;
    groupTypes          : Array<CommonType>;
    transportTypes      : Array<CommonType>;
    discoverModeTypes   : Array<CommonType>;
}

export interface RouteCategory extends CommonType {}
export interface RouteLanguage extends CommonType {}
export interface RouteStatusType extends CommonType { name: 'draft' | 'published' | 'pendingVerification' | 'deleted' | 'unpublished'}
export interface RouteTransportType extends CommonType {}
export interface BudgetType extends CommonType {}
export interface GroupType extends CommonType {}
export interface MapType extends CommonType {}
export interface TaxType extends CommonType { value: number }
export interface RouteDiscoverModeType extends CommonType { name: 'secret' | 'visible' | 'dynamic' | 'optimizedRouteFree' | 'routeFlip' }
export interface RouteObject extends CRUD, HasId {
    name?: string;
    slug?: string;
    imageUrl?: string;
    imageSnapshotUrl?: string;
    imageContentType?: string;
    description?: string;
    duration?: number;
    durationString?: string;
    priceType?: PurchasePriceType;
    steps: Array<RouteLine>;
    tags: Array<string>;
    budgetType?: BudgetType;
    categoryType?: RouteCategory;
    mapType?: MapType;
    groupTypes?: GroupType[];
    statusType?: RouteStatusType;
    transportType?: RouteTransportType;
    author?: User;
    language?: CommonType;
    marker: Array<RouteMarker>;
    occurrence: Array<Occurrence>;
    taxType: TaxType;
    youtubeUrl?: string;
    discoverModeType?: RouteDiscoverModeType;
    mediaUrl?: string;
    dynamicModeType?: RouteDynamicModeType;
    packageOrder?: number
    routeAction?: RouteAction;
    onboarding?: any;
    routePackage?: RoutePackage;
    customMapId?: string;

    distance?: string; // ?
    season?: string; // ?
    averageScore: number;
    firstOrderMarker?: RouteMarker;
    mode?: RouteMode;
    isRouteCompleted?: boolean;
    userLevelReached?: number
    additionalText?: AdditionalText;
    mailjetTemplateId?: number;
    // isRewardReceived?: boolean; 
}

export type RouteMode = 'preview' | 'edit' | 'navigation'

export interface RouteAction {
    levels?: RouteLevel[]
    gameRules?: {id: number},
    groupGame?: string
}

export type MilestoneType = 'isVisited' | 'isPhysicalVisited' | 'isQuizSolved' | 'quizReply' | 'isRewardReceived'

export interface RouteLevel {
    id: number,
    milestone: MilestoneType,
    benchmark: number,
    title: string,
    subtitle?: string, 
    animationUrl: string,
    raffleId?: number
}

export interface ReachNextLevelRequest {
    levelId: number,
    milestone: MilestoneType
    benchmark: number,
    raffleId?: number
}

export interface ReachNextLevelResponse {
    userLevelReached: RouteLevel,
    // userLevelReached: number, 
    raffleTickets: RaffleTicket[]
}

export interface CustomRouteOnboarding {
    routeId: string, 
    routeName: string,
    onboarding: any,
}

export interface RaffleTicket {
    id: string,
    ticketNumber: number,
    raffle: Raffle,
    user?: User,
    route?: RouteObject,
    isRaffleTCAccepted: boolean,
} 

export interface UserRaffleTicketUpdateRequest {
    isRaffleTCAccepted: boolean
}

export interface Raffle {
    id: number,
    name: string,
    description?: string,
    termsConditionsUrl?: string
    data?: {trophies?: RaffleTrophy[]},
    launchDate?: number   
}

export interface RaffleTrophy {
    order: number,
    name: string,
    animationUrl: string,
    winningTicketNumber?: number,
    color: string
}

export interface RouteDynamicModeType {
    id: number,
    name: string,
    dynamicModeOptions: DynamicModeOptions[]
}

export interface DynamicModeOptions {
    color: string,
    description: string,
    id: number,
    isActive: boolean,
    name: string,
    replyId: number
}

export interface UserRouteDynamicMode {
    id: string
    dynamicModeType: RouteDynamicModeType
    replyStats: {}
}

export interface AdditionalText {
    finalText: LanguageTextOptions[],
    externalCTA?:{}
  }
  
  export interface LanguageTextOptions {
    language: string,
    text: string
  }


export interface CreateRouteRequest {
    name: string;
    categoryTypeId: number;
    transportTypeId: number;
    mapTypeId: number;
}

export interface UpdateRouteRequest { // TODO: update
    steps?: string;
    statusTypeId?: number;
    languageId?: number;
    groupTypeIds?: number[];
    budgetTypeId?: number;
    description?: string;
    duration?: number;
    price?: number;
    occurrence?: Occurrence;
    name?: string;
    categoryTypeId?: number;
    transportTypeId?: number;
    mapTypeId?: number;
    youtubeUrl?: string;
}

export interface Occurrence {
    type: 'yearly' | 'monthly' | 'weekly',
    hourRange?: string;
    dateAvailability?: string;
}

export interface RouteOwnerState {
    isRouteOwned: boolean,
    isRoutePurchased: boolean,
    isRoutePurchasable: boolean,
    isRouteAllPublic: boolean
}

export interface RouteLineLayerObject {
    sourceName: string,
    layerId: string,
    data: LineCollection,
    color: string,
}

export enum MediaUploadFileType {
    routeImage = 'image',
    additionalMedia = 'additionalMedia',
    snapshot = 'snapshot'
}

export interface PurchasePriceType {
    name: string,
    netAmount: number,
    currency: string,
}

export interface RouteFilterResult {
    total: number,
    thumbnails: RouteThumbnailData[],
    filterType: RouteFilterType
    userId: string
}

/* export interface RouteFilterResult {
    total: number,
    thumbnails: RouteThumbnailData[],
    filterType: RouteFilterType
    userId: string
} */

export type RouteFilterType = 'pending' | 'completed' | 'created'