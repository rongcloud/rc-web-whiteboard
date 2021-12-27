export enum RoleCate {
  AMDIN = 'presenter',
  VIEWER = 'viewer',
  RECORD = 'record'
}
export interface RecvRoomJoin { 
  /** 鉴权使用 */
  token: string;
  /** 角色 */
  role: RoleCate;
  /** 房间号 */
  hubId: string | number;
  /** 用户名 */
  nickName: string;
  /** 房间名称 */
  hubName?: string;
  /** 用户唯一码 */
  id: string;
  /** 房间存在时间 */
  activeSeconds?: number;
  // /** 默认房间存活时长 */
  minutes?:number
}

export interface RecvLeaseIWBPlayer {
  name: string,
  outTradeNo: string,
  serverId: string,
  uid: string,
  url: string
}
export interface RecvGetPlayKey {
  roomCode: string | number,
  name: string,
  contract: { [key: string]: string | number },
  user: { [key: string]: string | number },
  token: string
}
/**
 * 获取白板录像列表请求参数
 */
export interface RecvReqRecods {
  /** 白板ID 房间号 */
  hubId?: string | number,
  /** 用户ID */
  userId?: string | number,
  /** 录制开始时间 */
  rsTime?: string | number,
  /** 录制结束时间 */
  reTime?: string | number,
  /** 页数 */
  offset?: string | number,
  /** 每页条数(每页最多200) */
  limit?: string | number,
  // 默认按录像时间倒序  order=0 倒序  order=1 正序
  order?:number,
}
/** 删除录像请求参数 */
export interface RecvReqDeleRecord {
  /** 录像id */
  id: string | number,
}
/**
 * 播放录像参数
 */
 export interface RecvPlayRecord {
  outTradeNo?: string;
  name?: string;
  serverId?: string;
  url: string;
  activeSeconds?: number;
  minutes?: number;
  nickName?: string;
  role?: RoleCate | string;
  id?: string;
  appkey?: string;
  token?: string;
  playHubId:string;
}