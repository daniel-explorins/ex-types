import { Gender, UserRole } from './User';

export interface EmailForgotPasswordRequest {
    email: string;
}

export interface ForgotPasswordRequest {
    password: string;
    code: string;
}

export interface ForgotPasswordResponse {
    message: string;
}

export interface EmailForgotPasswordResponse {
    message: string;
}

export interface ConfirmRequest {
    code: string;
}

export interface ConfirmResponse {
    message: string;
}

export interface LbResponse {
    error?: object;
    success?: string;
}

export interface SignupRequest {
    email: string;
    password?: string;
    username?: string;
    firstName?: string;
    lastName?: string;
    phoneNumber?: string;
    phonePrefix?: string;
    birthdate?: Date;
    gender?: Gender;
    languageId: number;
    newsletterSubscription: boolean;
    role: string;
}

export interface SignUpWithEmailRequest {
    username: string,
    email: string,
    languageId: number
}

export interface SignupBusinessRequest extends SignupRequest {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    phonePrefix: string;

    companyName: string;
    companyNif: string;
    companyAddress: string;
    companyPostalCode: string;
    companyCountry: string;
}

export interface SignupResponse {
    id: number;
    /* name: string;
    lastName: string;
    birthdate: Date;
    gender: string; */
    email: string;
    /* phoneNumber: string; */
    username: string;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface SignInWithEmailLinkRequest {
    email: string;
    // password: string;
    emailLink: string;
}

type ThirdPartyLoginType = 'google' | 'facebook' | 'appleId';

export interface ThirdPartyLoginRequest {
    providerToken: string;
    type: ThirdPartyLoginType;
    rawNonce?: string;
}

export interface ITokenObject {
    idToken: string;
    refreshToken: string;
    expiresIn: number;
    created_at: Date;
    type: 'default' | ThirdPartyLoginType;
}

export interface ChangePasswordRequest {
    oldPassword: string;
    newPassword: string;
    accessToken: string;
}

export interface ChangePasswordResponse {
    message: string;
}
