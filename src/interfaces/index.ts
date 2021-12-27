export * from './recv'
export * from './resp'
export interface CookieUser {
  id?: string,
  nickName?: string,
  token?: string
}
export interface ReqHeaders{
  'RC-Token': string,
  'RC-AppKey': string
}

export interface RuleFormHome {
  hubId: string | number,
  nickname: string
}