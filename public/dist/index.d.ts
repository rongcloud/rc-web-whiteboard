import { RoleCate } from "./modules/getPageURL";
export interface IReceivedAppInfo {
    appkey: string;
    token: string;
    hubId: string | number;
    role: RoleCate;
    roomName: string;
    nickname: string;
}
export declare const joinRoom: (data: IReceivedAppInfo) => Promise<string>;
export declare const exitRoom: (data: {
    [key: string]: string;
}) => Promise<any>;
declare const RongWhiteWebSdk: {
    joinRoom: (data: IReceivedAppInfo) => Promise<string>;
    exitRoom: (data: {
        [key: string]: string;
    }) => Promise<any>;
};
export default RongWhiteWebSdk;
//# sourceMappingURL=index.d.ts.map