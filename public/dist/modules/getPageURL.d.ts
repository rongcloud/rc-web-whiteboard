export declare enum RoleCate {
    AMDIN = "admin",
    VIEWER = " viewer",
    RECORD = "viewer"
}
export interface IReceivedGetPageURL {
    baseUrl: string;
    accessToken: string;
    adminToken: string;
    expiryTime: string | number;
    id: string | number;
    points: string | number;
    role?: RoleCate;
    server: string;
    signTime: string | number;
    roomName?: string;
    nickname?: string;
    appKey: string;
}
export interface IResponseGetPageURL {
    key: string;
}
declare const _default: (contract: IReceivedGetPageURL) => Promise<IResponseGetPageURL>;
export default _default;
//# sourceMappingURL=getPageURL.d.ts.map