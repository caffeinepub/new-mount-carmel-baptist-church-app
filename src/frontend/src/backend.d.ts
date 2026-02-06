import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type Time = bigint;
export interface MemberProfile {
    displayName?: string;
    createdAt: Time;
}
export interface Livestream {
    updatedAt: Time;
    embedCode: string;
}
export enum LivestreamType {
    Facebook = "Facebook",
    YouTube = "YouTube",
    Other = "Other"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    getCallerUserRole(): Promise<UserRole>;
    getLivestream(livestreamType: LivestreamType): Promise<Livestream | null>;
    getMyProfile(): Promise<MemberProfile | null>;
    getUserProfile(user: Principal): Promise<MemberProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    saveLivestream(livestreamType: LivestreamType, embedCode: string): Promise<void>;
    upsertMyProfile(displayName: string | null): Promise<void>;
}
