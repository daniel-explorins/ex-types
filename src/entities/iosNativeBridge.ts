export enum IosNativeBridgeHandlerTypes { 
  inAppPurchaseGetProducts = 'inAppPurchaseGetProducts', 
  inAppPurchaseBuyProduct = 'inAppPurchaseBuyProduct', 
  inAppPurchaseConsumeProduct = 'inAppPurchaseConsumeProduct',
  loginRequest = 'loginRequest',
  applePay = 'applePay',
  openLink = 'openLink',
  openAR = 'openAR'
}

/* export interface NativeIosHandlerMessage {
  type: keyof typeof IosNativeBridgeHandlerTypes
  body: IosNativeBridgeType
} */

export type IosNativeBridgeType = 
      InAppPurchaseGetProductsRequest 
    | InAppPurchaseBuyProductRequest
    | InAppPurchaseConsumeProduct
    | LoginRequestRequest
    | ApplePayRequest
    | OpenLinkRequest
    | OpenARRequest

export interface InAppPurchaseGetProductsRequest {
  isStoreReady: boolean
}

export interface InAppPurchaseBuyProductRequest {
  productId: string
}

export interface InAppPurchaseConsumeProduct {
  isTransactionFinished: boolean
}

export interface LoginRequestRequest {
  requestData: {
    requestType?: "google" | "facebook" | "appleId",
    loginType?: "google" | "facebook" | "appleId",
    urlToLoad?: string,
    loginSuccess?: boolean,
  }
}

export interface ApplePayRequest {
  requestData: {
    isApplePaySupportRequest?: boolean,
    isGetPaymentRequest?: boolean, 
    label?: string, 
    amount?: number,
    isPaymentConfirmRequest?: boolean, 
    clientSecret?: string
  }

}

export interface OpenLinkRequest {
  requestData: {urlToLoad: string}
}

export interface OpenARRequest {
  requestData: {
    urlToLoad: string,
    currentUrl: string
  }
}