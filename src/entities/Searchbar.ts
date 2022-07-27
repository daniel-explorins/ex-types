export interface AddressSuggestion {
    bbox: number[];
    center: number[];
    geometry: { type: string, coordinates: number[] };
    id: string;
    place_name: string;
    place_type: string[];
    properties: { short_code: string, wikidata: string};
    relevance: number;
    text: string;
    type: string;
}

export interface GeocodingResponse {
    routes: Array<GeocodingRoute>;
}

export interface GeocodingRoute {
    geometry: {
        coordinates: any;
    },
    distance: number;
    duration: number;
    summary: string;
}

export type SearchbarType = 'default' | 'marker-modal' | 'landing' ;

export type GeocodingSearchType =
    'country'
    | 'region'
    | 'postcode'
    | 'district'
    | 'place'
    | 'locality'
    | 'neighborhood'
    | 'address'
    | 'poi';
