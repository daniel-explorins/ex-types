import { HasId, CRUD, User } from '.';
import { CommonType } from './Common';

export interface SubscriptionReplyData extends UserSubscription {
    latestInvoiceData?: InvoiceData,
}
  
export interface InvoiceData {
    id: string;
    status: InvoiceStatus;
    pdfUrl?: string;
    paymentIntent?: PaymentIntent | null  
}
  
export interface PaymentIntent {
    id: string;
    status: PaymentIntentStatus;
    clientSecret: string;
}
  
export enum PaymentIntentStatus {
    requiresPaymentMethod = 'requires_payment_method',
    requiresConfirmation  = 'requires_confirmation',
    requiresAction        = 'requires_action',
    processing            = 'processing',
    requiresCapture       = 'requires_capture',
    canceled              = 'canceled',
    succeeded             = 'succeeded'
}
  
export enum InvoiceStatus {
    draft         = 'draft',
    open          = 'open',
    paid          = 'paid', 
    uncollectible = 'uncollectible',
    void          = 'void'
}
  
export enum StripeSubscriptionStatusTypeName {
    active             = 'active',
    pastDue            = 'past_due',
    unpaid             = 'unpaid',
    canceled           = 'canceled',
    incomplete         = 'incomplete',
    incompleteExpired  = 'incomplete_expired',
    trialing           = 'trialing'
}

export interface SubscriptionType extends CommonType{
    name: string;
    netAmountPerMonth: number;
    currency: string;
    freeTrialDays: number;
    stripePriceId: string;
    stripeProductId: string;
    description: string;
    isUserPremium: boolean;
    isRoutesPremium: boolean;
    isActive: boolean;
}

export interface SubscriptionStatusType extends CommonType{
    name: StripeSubscriptionStatusTypeName,
}


export interface UserSubscription extends CRUD, HasId {
    cancelAtPeriodEnd: boolean;
    canceledAt: number;
    currentPeriodEnd: number;
    currentPeriodStart: number;
    trialEnd: number;
    paymentMethodId: string;
    stripeSubscriptionId: string;
    latestInvoiceId: string;
    user: User;
    subscriptionStatus: SubscriptionStatusType;
    subscriptionType: SubscriptionType;
}
