declare class ServerError extends Error {
    constructor(message: string);
}
export default class Api {
    static setLocationSearch(data: any): void;
    static resolve(path: string): string;
    static encodeQueryString(obj: any): string;
    static encodeFormData(obj: any): FormData;
    /**
     *
     * @param {string} path the path after http://hltc.cs.ust.hk/webapi
     * @param data post data
     * @returns {Promise<any>}
     */
    static request(path: string, data?: any): Promise<any>;
}
export { ServerError };
