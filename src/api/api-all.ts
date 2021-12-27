
/**
 * demoServer接口文档：https://rongcloud.yuque.com/ofnwgp/sph4x8/azkg7a
 */
const HOME_API = {
  sendCode: "/user/send_code", // 获取手机登陆验证码
  verifyCodeRegister: "/user/verify_code_register", // 验证码登陆注册
  getRongToken: "/user/get_token", // 获取融云IM token
  getRecords: '/records', // 获取录制列表
  deleRecord: '/records', // 删除录像
  playRecord: '/player', // 播放录像
};
export {
  HOME_API
}

