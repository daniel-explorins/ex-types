import { RouteMarker } from "./Marker";
import { MediaItem } from "./Media";
import { TaxType } from "./Route";
import { User } from "./User";

export interface ProductRequestResponse {
    products: MarketplaceProduct[], 
    sectionId: string
}

export interface MarketplaceProduct {
    id: string,
    name?: string,
    description?: string,
    author?: string,
    techDetails?: string,
    width?: number,
    height?: number,
    depth?: number,
    weightInGr?: number,
    netPrice?: number,
    stock?: number 
    taxType?: TaxType,
    routeMarker?: RouteMarker,
    media?: MediaItem[],
    vendor: User,
    transportOptions: TransportOption[],
}

export interface MarketplaceProductUpdateRequest {
    name?: string,
    description?: string,
    author?: string,
    techDetails?: string,
    width?: number,
    height?: number,
    depth?: number,
    weightInGr?: number,
    netPrice?: number,
    stock?: number 
}

export interface MarketplaceProductCategory {
    id: number 
    name: string
    isUnique: boolean
}

export interface TransportOption {
    id: number;
    companyName: string,
    comments: string,
    netPrice?: number,
    isInsured?: boolean,
    name?: string,
    deliveryTimeMin?: number,
    deliveryTimeMax?: number,
    regionType: TransportRegionType
    pickupAddress: UserMarketplaceShippingAddress
}

export type ShippingOptionsRequest = ShippingOption[]

export interface ShippingOption {
    id: string,
    label: string,
    detail: string,
    amount: number,
}

export interface TransportRegionType {
    id: number,
    name: 'spain' | 'eu' | 'us' | 'world' | 'pickup'
}

export interface UserMarketplaceOrder {
    id?: string,
    name?: 'eXplorins MarketBoutique',
    statusType: MarketplaceOrderStatusType,
    orderSelections: MarketplaceOrderSelection[],
    customer?: User,
    taxType?: TaxType,
    totalNetAmount?: number,
    transportCost?: number,
    transportRegionType?: TransportRegionType,
    shippingAddress?: UserMarketplaceShippingAddress,
}

export interface UserMarketplaceOrderUpdateRequest {
    orderSelections?: MarketplaceOrderSelection[],
    shippingAddress?: UserMarketplaceShippingAddress,
    transportRegionType? : TransportRegionType
}

export interface UserMarketplaceShippingAddress {
    name?: string,
    addressLine?: string,
    // addressLine2?: string,
    city?: string,
    state?: string,
    postalCode?: string,
    country?: string,
}

export interface MarketplaceOrderSelection {
    quantity: number,
    product: MarketplaceProduct,
    transportOption: TransportOption,
}

export interface PaymentResult {
    purchaseType: TPurchaseTypes, 
    cancel?: boolean, 
    success?: boolean, 
    paymentIntent?: any, 
    error?: any
}


export interface MarketplaceOrderStatusType {
    id?: number,
    name: 'pending' | 'processing' | 'confirmed' | 'canceled' | 'expired'
}

export interface PurchaseIntentResponse {
    purchaseType: TPurchaseTypes, 
    cancel?: boolean, 
    success?: boolean, 
    paymentIntent?: any, 
    error?: any
}

export enum TPurchaseTypes {
    stripePurchase    = 'stripePurchase',
    iosInAppPurchase  = 'iosInAppPurchase',
    freePurchase      = 'free'
}

export enum PurchaseProductTypes {
    routePurchase       = 'routePurchase',
    marketPlaceProduct  = 'marketplaceProduct',
    mintbaseThing       = 'mintbaseThing',
    nftThing            = 'nftThing'
}
  
export interface CreatePaymentIntentResponse {
    // id: string
    clientSecret: string
}
  
export interface GetCardsResponse {
    id: string
    brand: string
    country: string
    last4: string
    expMonth: number
    expYear: number
    zip: number
}
