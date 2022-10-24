import { User } from ".";

export interface ClientData {
	id: string
}

export interface CubeClientData {
	name: string,
	description: string,
	id: number
}

export interface Model3D {
    id:string;
    name?: string;
    authorName?: string;
    subtitle?: string;
    description?: string;
    srcUrl:string | null;
    minimalSrcUrl?: string;
    iosSrcUrl?: string;
    posterImageUrl?:string;
    imgUrl?: string,
    environmentImageUrl?:string;
    autorotate?:boolean;
    autoPlayAnimation?:boolean
    hotSpots?:Model3DHotSpot[],
    light?: string // ej. 'type: ambient; color: #CCC'
    position?: [number, number, number] // ej. [1, 1, 1]
    scale?: string, // ej. '0.5 0.5 0.5'
    rotation?: string // ej. '0 180 0'
    marketplaceUrl?: string,
    token?: TokenInfo,
    metadata?: any,
    print3dPaymentLinkUrl?: string,
}

export interface TokenInfo {
    /* id?: string,
    address?: string,
    ercNum?: string */
    transferUrl?: string
}
export interface Model3DHotSpot {
    id:string;
    dataPosition:string,
    dataNormal:string,
    dataVisibilityAttribute:string,
    content:string
}

export interface ModelCollection {
    name: string,
    models: Model3D[],
    id?: string,
    previewAngle?: number,
    author?: User,
    iconUrl?:string,
    description?: string;
    conditions?: any
    // description2?: string;
}