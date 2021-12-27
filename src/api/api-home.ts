import { HOME_API as api } from "./api-all";
import { request } from "@/utils/index";
import { appkey } from "@/config";
import { RecvReqDeleRecord, RecvReqRecods, ReqHeaders } from "@/interfaces";
const headers: ReqHeaders = {
  'RC-AppKey': appkey,
  "RC-Token": ""
}
export function sendCode (data = {}): Promise<any> {
  return request.post(api.sendCode, data);
}
export function verifyCodeRegister (data = {}): Promise<any> {
  return request.post(api.verifyCodeRegister, data);
}
export function getRongToken (data = {}): Promise<any> {
  return request.post(api.getRongToken, data);
}
export function getRecords (params: RecvReqRecods): Promise<any> {
  headers["RC-Token"] = sessionStorage.getItem('token') as string
  return request.get(api.getRecords, { params, headers })
}
export function deleRecord (params: RecvReqDeleRecord): Promise<any> {
  headers["RC-Token"] = sessionStorage.getItem('token') as string
  params = params || {};
  const { id, ...reqQuery } = params;
  const url = `${api.deleRecord}`
  return request.delete(url, { params: { recordIds: id }, headers })
}
export function playRecord (data = {}): Promise<any> {
  headers["RC-Token"] = sessionStorage.getItem('token') as string
  return request.post(api.playRecord, data, {headers});
}