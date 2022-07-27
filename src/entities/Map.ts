export interface RouteLine {
    coordinates: number[][];
    distance: number;
    duration: number;
    summary: string;
    steps?: RouteStep[];
    from: string; // id of first marker
    to: string; // id of second marker
}

export interface RouteStep {
    distance: number;
    duration: number;
    coordinates: number[][];
    maneuver: string;
}

export interface RouteFilter {
    role: 'author' | 'client';
    isCompleted: boolean;
    page: number;
    userId?: string;
}

export type MapVisualizationType = 'navigation' | 'edit' | 'preview' | 'search';
