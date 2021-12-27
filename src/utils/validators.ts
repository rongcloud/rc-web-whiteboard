/**
 * 校验手机号
 * @param rule 规则
 * @param receiver_mobile 手机号
 * @param callback 回调
 * @returns 
 */
export const validateMobile = (rule: any, receiver_mobile: string | number, callback: any): void => {
  const isMobile = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1})|(14[0-9]{1}))+\d{8})$/;
  // const isMobile = /^[1][3,4,5,7,8][0-9]{9}$/;
  const isPhone = /^(?:(?:0\d{2,3})-)?(?:\d{7,8})(-(?:\d{3,}))?$/;
  if (!receiver_mobile) return callback(new Error('请输入有效的手机号'));
  receiver_mobile = receiver_mobile.toString();
  // 如果为1开头则验证手机号码
  if (receiver_mobile.substring(0, 1) == '1') {
    if (!isMobile.exec(receiver_mobile) || receiver_mobile.length != 11) {
      return callback(new Error('请输入有效的手机号'));
    }
  }
  // 如果为0开头则验证固定电话号码
  else if (receiver_mobile.substring(0, 1) === '0') {
    if (!isPhone.test(receiver_mobile)) {
      return callback(new Error('请输入有效固定电话号码'));
    }
  }
  // 否则全部不通过
  else {
    return callback(new Error('请输入有效的手机号'));
  }
  return callback();
}
/**
 * 校验二维码
 * @param rule 
 * @param code 
 * @param callback 
 * @returns 
 */
export const validateCode = (rule: any, code: string | number, callback: Function): void => {
  const reg = /^\d{6}\b/;
  code = code.toString()
  if (reg.test(code)) {
    return callback();
  } else {
    return callback(new Error('请输入六位数字'));
  }
}
/**
 * 校验注册协议
 */
export const validateProtocal = (rule: any, code: string | number, callback: Function): void => {
  return callback(code ? '' : new Error('请先阅读并同意《注册条款》'));
}
/**
 * 校验昵称
 * @description 不过滤特殊字符
 * @param rule 
 * @param code 
 * @param callback 
 * @returns 
 */
export const validateNickname = (rule: any, value: string | number, callback: Function): void => {
  const rx = /[a-z\d_.]/i;
  const rxcn = /[\u4e00-\u9fa5]/;
  let num = 0;
  let chr;
  value = value.toString()
  for (let i = 0, j = value.length; i < j; i++) {
    chr = value.charAt(i);
    if (rx.test(chr)) num += 1;
    else if (rxcn.test(chr)) num += 2;
    else {
      num += 1
    }
  }
  if (num > 16) {
    return callback('长度最多为8个汉字或16个字母数字！');
  } else if (num < 1) {
    return callback('昵称不为空！');
  }
  return callback();
}
/**
 * 特殊字符校验
 */
export const validateNicknameSpecial = (rule: any, value: string | number, callback: Function): void => {
  let flag = 1;
  const rx = /[a-z\d_.]/i;
  const rxcn = /[\u4e00-\u9fa5]/;
  let num = 0;
  let chr;
  value = value.toString()
  for (let i = 0, j = value.length; i < j; i++) {
    chr = value.charAt(i);
    if (rx.test(chr)) num += 1;
    else if (rxcn.test(chr)) num += 2;
    else {
      flag = 3;
      break;
    }
  }
  if (flag != 3) {
    if (num > 16) {
      return callback('长度最多为8个汉字或16个字母数字！');
    }
    else if (num < 1) {
      return callback('昵称不为空！');
    }
    return callback();
  }
  else {
    return callback('不能包含特殊字符！');
  }
}

