import { ModelCollection } from "./Model3D";
import { PurchasePriceType, RouteObject, TaxType } from "./Route";
import { User } from "./User";

export type WorldTypeCode = 'routes' | 'products' | 'funding' | 'community' | 'partner' | 'nft' | 'info' | 'social-media' | 'universe-info' | 'marketboutique' | 'cube-gallery' | 'collection' | 'nft-store' | 'concept-lab' | 'ar-location' | 'quiz'  | 'donate' | 'events' | 'music-collection' | 'poap' | 'raffle' | 'raffle-ticket' | 'voice-recordings' | 'game-rewards' | 'qr-scanner'
// export type UniverseWorldSection = RouteWorldSection

export interface ThematicWorldType {
    id?: number,
    typeCode: WorldTypeCode,
    iconUrl?: string
    icon: string,
    name: string,
    isFeatured?: boolean
}

export interface ThematicUniverse {
    id?: string,
    name: string,
    slug?: string,
    isPublic: boolean
    logoUrl?: string,
    logoClearUrl?:string,
    mediaBasePathUrl?: string
    // svgIconName?: string,
    description?: string | object,
    thematicWorlds: ThematicWorld[] ,
    backgroundColor?: string,
    author?: User,
    iconUrl?:string,
    borderRadius?:number,
    isActive:true,
    launchDate?:number | null,
    backgroundImgUrl?:string,
    primaryColor?:string,
    accentColor?:string,
    textColor?:string
}

export interface UniversePreview extends ThematicUniverse {
    previewAngle:number
}
  
export interface ThematicWorld {
  id?: string,
  type: ThematicWorldType,
  name?: string,
  description?: string | Object | null,
  sections: ThematicWorldSection[],
  isFeatured: boolean,
  order?: number,
  backgroundImgUrl?: string,
  logoUrl?: string | null,
  iconUrl?: string | null
}

export interface PartnerEntity {
    id: string,
    name: string,
    logoUrl: string,
    linkUrl: string | null,
    sloganString: string | null,
    description: string | null,
    lat?: number,
    lon?: number,
    adress?: string,
    postalCode?: string,
    category?: PartnerEntityCategory,
    comment?: string,
}

export interface PartnerEntityCategory {
    name: string
    type: string,
    iconUrl: string,
    color: string,
    id: number
}
export interface ThematicWorldSectionType {
    typeCode: WorldTypeCode
    name: string;
}

export interface ThematicWorldSection {
  id?: string,
  description?: string | Object | null,
  name?: string,
  logoUrl?: string | null,
  iconUrl?: string | null,
  backgroundColor?: string | null,
  // thematicWorldType: ThematicWorldType
  sectionType: ThematicWorldSectionType
  routePackage?: RoutePackage,
  fundingPackages?: FundingPackage[]
  routes?: RouteObject[],
  partnerEntities?: PartnerEntity[],
  targetMediaType?: 'blogpost' | 'spotify' | 'socialMedia' | null,
  targetMediaId?: string | null,
  targetMediaParams?: string | null,
  order?: number | null,
  ctaWorldType?: ThematicWorldType |  null
  launchDate?: number | null,
  animationUrl?: string | null,
  places?: Place[]
  collections?: ModelCollection[],
  quiz?: Quiz,
  textSections?: string[],
  title?: string,
  ctaLinkUrl?: string,
  ctaText?: string,
  nftIds?: string,
  customMapId?: string,
  lat?: number,
    lon?: number,
  // cubeImages?: CubeImage[]
  // models?: any
}

export interface Place {
    coords: Geopoint,
    position?: [number, number, number]
}

export interface Quiz {

    pendingImgUrl?: string
    challenges: QuizChallenge[]
}

export interface QuizChallenge {
    imgUrl?: string,
    id: number,
    question?: string,
    description?: string
    options?:QuizOption[]
    isSolved?: boolean
}

export interface QuizOption {
    reply?: string | number;
    isSolution: boolean
}

export interface CubeImage {
    imgUrl?: string,
    description?: string,
    name?: string
    id: number
    
}
export interface Geopoint {
    _lat?: number, 
    _long?: number,
    latitude?: number, 
    longitude?: number,
    // position?: [number, number, number]
}

/* export interface Place {
    name?: string,
    lat: number,
    lng: number
} */
  // routes?: Route[]

export interface FundingPackage {
name: string;
description: string;
backgroundColor: string;
iconUrl: string;
logoUrl: string;
saldo: number;
// routePackages: RoutePackage[]
receivingEntity: PartnerEntity;
thematicWorldSections: ThematicWorldSection[];
}

export interface RoutePackage {
    description?: string
    id: string
    name?: string
    routes: RouteObject[]
    customIcons: CustomIconsSet,
    customReplies: any,
    customMapId: string,
    priceType: PurchasePriceType,
    taxType: TaxType,
    customMapMask: {
        boundaries: [[number, number][]]
    }
}

export interface CustomIconsSet {
    pathUrl: string,
    confirm: string[],
    deny: string[]
}

export interface CreateUniverseRequest {
    name: string
}

export interface CreateThematicWorldRequest {
    name: string
}

export interface CreateThematicWorldSectionRequest {
    name: string
}

export interface UpdateThematicSectionRequest {
    sectionId?: string,
    routeIds?: string[],
    name?: string
    description?: string | null,
    backgroundColor?: string,
    targetMediaId?: string | null,
    targetMediaParams?: string,
    targetMediaType?: string | null
}

export interface CreatePartnerEntityRequest {
    name: string
  }