/**
 * WhiteWebSdk 错误码范围段
 */
export declare enum ErrorCode {
    /** 成功 */
    SUCCESS = 200,
    /** 白板成功处理 */
    LESSHOLDER_SUCCESS = 0,
    /** 发送频率过快 */
    SEND_FREQUENCY_TOO_FAST = 5000,
    /** 错误的请求 */
    REQUEST_ERROR = 400,
    /** 服务器错误 */
    SERVER_ERROR = 500,
    /** 验证码错误 */
    VERIFY_CODE_ERROR = 1000,
    /** 验证码过期 */
    VERIFY_CODE_TIMEOUT = 2000,
    /** 权限校验失败(未登录或登录凭证失效) */
    PERMISSION_DENIED = 403
}
//# sourceMappingURL=ErrorCode.d.ts.map