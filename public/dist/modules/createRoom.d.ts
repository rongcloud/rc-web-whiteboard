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
declare const _default: (data: IReceivedCreateRoom) => Promise<IResponseCreateRoom>;
export default _default;
//# sourceMappingURL=createRoom.d.ts.map