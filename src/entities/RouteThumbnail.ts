import { User, MarkerIcon, RouteStatusType } from '.';

export interface RouteTypeIcon {
    id: number,
    name: 'premium' | 'interactive' | 'price' | 'gift',
    description: string,
    iconCode: string,
    i18nKey: string,
  }

export interface RouteThumbnailData {
    id: string;
    slug: string;
    category: string;
    title: string;
    description: string;
    author: User;
    language: string;
    imageURL: string;
    snapshotURL: string;
    status: RouteStatus;
    isFavourite: boolean;

    steps: MarkerIcon[];
    startMarkerPosition?: {
        lat: number,
        lon: number
    }
    price: number;
    distance: string;
    duration: string;
    rating: RouteRating;
    discoverModeType: string;
    mediaUrl: string;
    isPremium: boolean;
    isMarkerReward: boolean;
}

export type RouteStatus = 'pending' | 'completed' | 'draft' | 'pendingVerification' | 'published' ;

export interface RouteRating {
    score: number;
    votes?: number;
    comment?: string;
}
