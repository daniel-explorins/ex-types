// import { RoutePackage, ThematicUniverse } from "./ThematicUniverse";

import { RouteThumbnailData } from "./RouteThumbnail";

export interface FilterValues {
  category?: RouteCategoryTypeFilter[],
  location?: [LocationOption],
  distance: [[number]],
  transportType: [string],
  groupTypes: [string],
  budget: [string],
  // language: [string],
  keywordTypeName?: string[],
  discoverModeType?: string[],
  tags: [[]],
  startTime: [number],
  endTime: [number],
}

export enum RouteCategoryTypeFilter {
  wtf     = 'wtf',
  romance = 'romance',
  people  = 'people',
  money   = 'money',
  indoor  = 'indoor',
  healthy = 'healty',
  friends = 'friends',
  food    = 'food',
  culture = 'culture',
  budget  = 'budget',
  null    = '',
}

export enum RouteSearchGroupName {
  featured        = 'featured',
  interactive     = 'interactive',
  wtf             = 'wtf-0budget',
  familyFriends   = 'family-romance-nature',
  shoppingFood    = 'shopping-food',
  culturePeople   = 'history-culture-people',
  virtual         = 'virtual-travel',
  map             = 'map',
  ravalopoly      = 'ravalopoly'
}

export interface SearchGroup {
  id: number,
  name: RouteSearchGroupName,
  i18nKey: RouteSearchGroupName,
  // description?: string,
  icon: string,
  categories: RouteCategoryTypeFilter[],
  keywords: string,
  discoverModeTypes: string,
  data?: GeoJsonSearchResultData[],
  dataFilterValues?: FilterValues, 
}

export interface GeoJsonSearchResultData {
  id: string,
  type: "Feature",
  geometry: {
    type: "Point",
    // !!Unusual order: [lat, lon]
    coordinates: [number, number]
  },
  properties: RouteThumbnailData
}

export interface KeywordType {
  id: number,
  name: string,
  i18nKey: string
}

export interface LocationOption {
  placeName: string,
  location: number[],
  isActive: boolean,
}

export interface RouteSearchResult {
  searchResult: {
    total: number;
    data: GeoJsonSearchResultData[];
  },
  searchGroupId: number
}

export interface SearchDataResult {
    data: Object;
    searchParams: string;
}