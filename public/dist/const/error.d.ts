declare const ERROR_INFO: {
    [key: string]: {
        code: number;
        msg: string;
    };
};
declare const ERROR_CODE: {
    [key in number | string]: number | string;
};
declare const ERROR_CODE_TO_INFO: {
    [key: number]: {
        code: number;
        msg: string;
    };
};
export { ERROR_CODE, ERROR_INFO, ERROR_CODE_TO_INFO };
//# sourceMappingURL=error.d.ts.map