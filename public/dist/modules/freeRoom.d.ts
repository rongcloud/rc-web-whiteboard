import { IReceivedGetPageURL } from "./getPageURL";
export interface IReceivedCreateRoom {
    baseUrl: string;
    'RC-Token': string;
    'RC-AppKey': string;
    hubId: string | number;
}
export interface IResponseCreateRoom {
    contract: IReceivedGetPageURL;
    serverId: string;
}
export interface IRequestFreeRoom {
    hubId: string;
    adminToken: string;
    applyId: string | '123';
    applyName: string | "test";
    reason: string | "nothing";
    'RC-Token': string;
    'RC-AppKey': string;
    baseUrl: string;
}
declare const _default: (data: IRequestFreeRoom) => Promise<boolean>;
export default _default;
//# sourceMappingURL=freeRoom.d.ts.map