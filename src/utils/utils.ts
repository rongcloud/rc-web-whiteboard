/**
 * 获取随机字符串
 * @param n 
 * @returns 
 */
export const generateMixed = (n: number): string => {
  const chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
  let res = ''
  for (let i = 0; i < n; i++) {
    const id = Math.ceil(Math.random() * 30)
    res += chars[id]
  }
  return res
}

/**
 * 判断是否为json字符串
 * @param str 
 * @returns 
 */
export function isJSONString (str: unknown): boolean {
  if (typeof str == 'string') {
    try {
      const obj = JSON.parse(str);
      return !!(typeof obj == 'object' && obj);
    } catch (e) {
      return false;
    }
  }
  return false
}
/**
 * 退出登录清除会话存储相应值
 */
export function deleLoginSession (): void {
  sessionStorage.removeItem('user');
  sessionStorage.removeItem('token');
  sessionStorage.removeItem('hubId');
}
// 正则删除字符串
export function deleStrReg (str: string, type?: string): string {
  const regEn = /[`~!@#$%^&*()_+<>?:"{},./;'[\]]/g;
  const regCn = /[·！#￥（——）：；“”‘、，|《。》？、【】[\]]/g;
  const regChinese = /^[\u4e00-\u9fa5]{0,}$/g
  const regEnglish = /^[A-Za-z]+$/g;
  const regSpace = /(^\s+)|(\s+$)|\s+/g;
  const regNum = /[^0-9]/g; // 非数字
  // const regSpecial = /[^u4e00-u9fa5w]/g;
  str = str.replace(regSpace, '')
  if (type === 'noSpecial') {
    return str.replace(regEn, '').replace(regCn, '')
  }
  if (type === 'nickname') {
    return str.replace(regEn, '').replace(regCn, '');
  }
  if (type === 'code') {
    return str.replace(regNum, '');
  }
  return str.replace(regEn, '').replace(regCn, '').replace(regChinese, '').replace(regEnglish, '').replace(regSpace, '');
}
// 事件监听方法封装
export function eventBind (obj: any, evname: string, fn: Function) {
  if (obj.addEventListener) {
    obj.addEventListener(evname, fn, false);
  } else {
    obj.attachEvent("on" + evname, function () {
      fn.call(obj);
    })
  }
}
/**
 * 获取iframe对象中链接的参数值
 * @param href 
 * @param variable 
 * @returns 
 */
export function getQueryVariable (href: string, variable: string): boolean | string {
  const query = href.substr(href.indexOf('?') + 1)
  const vars = query.split('&')
  for (let i = 0; i < vars.length; i++) {
    const pair = vars[i].split('=')
    if (pair[0] == variable) {
      return pair[1]
    }
  }
  return false
}
/**
 * 本地开发中获取本地白板链接iframe对象
 * @param iframe 
 * @param roomDiv 
 */
export const returnLocalIframe = (iframe: HTMLIFrameElement) => {
  const key = getQueryVariable(iframe.src, 'key');
  const iwbLeaseUri = getQueryVariable(iframe.src, 'iwbLeaseUri');
  const url = `http://localhost:8082?key=${key}&iwbLeaseUri=${iwbLeaseUri}`;
  /** 创建iframe对象 */
  const createIframe = (url: string): HTMLIFrameElement => {
    const iframe = document.createElement('iframe')
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    iframe.style.border = 'none';
    iframe.src = url;
    return iframe;
  }
  return createIframe(url);
}