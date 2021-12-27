export declare enum HttpMethod {
    GET = "GET",
    POST = "POST",
    PUT = "PUT"
}
export interface IRequest {
    url: string;
    /**
     * @default `HttpMethod.GET`
     */
    method?: HttpMethod | 'GET' | 'POST' | "PUT";
    /**
     * 查询数据
     */
    query?: {
        [key: string]: string | number | any;
    };
    /**
     * Request Header 信息
     */
    headers?: {
        [key: string]: string;
    };
    /**
     * Request Body 数据
     */
    body?: Record<string, unknown> | string;
    /**
     * 超时设置
     * @default 10 * 1000 毫秒
     */
    timeout?: number;
    /**
     * 传输格式
    */
    dataType?: string;
}
export interface IResponse {
    status: number;
    data?: string;
}
//# sourceMappingURL=httpReq.d.ts.map