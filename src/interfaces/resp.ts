/** 请求录像列表接口返回列表项 */
export interface RespReqRecord {
  /** 应用标识 */
  appId: string,
  /**  */
  hubId: string | number,
  /** 录像唯一标识 */
  id: string | number,
  /** 录像开始时间 */
  recordedTime: number,
  /**  */
  sessionId: string | number,
  /** 录像链接 */
  url: string,
  /** 录像者的唯一标识 */
  userId: string | number,
}
