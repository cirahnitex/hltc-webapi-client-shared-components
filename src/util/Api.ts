class ServerError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'ServerError';
    }
}

function toString(x:any) {
    if(x instanceof Date) {
        return x.toISOString();
    }
    return x.toString();
}

export default class Api {
    static setLocationSearch(data: any) {
        window.history.replaceState(null, "", '?' + Api.encodeQueryString(data));
    }

    static resolve(path: string) {
        if (path.indexOf('/') === 0) {
            const baseUrl = (window as any).WEBAPI_BASE_URL;
            return (baseUrl || '/webapi') + path;
        }
        else if(path.indexOf("http") === 0) {
            return path;
        }
        throw new Error(`invalid path ${path}`);
    }

    static encodeQueryString(obj: any): string {
        const pieces = [];
        for (let key in obj) {
            if (!obj.hasOwnProperty(key)) continue;
            pieces.push(encodeURIComponent(key) + "=" + encodeURIComponent(toString(obj[key])));
        }

        return pieces.join("&");
    }

    static encodeFormData(obj: any): FormData {
        const form = new FormData();
        for (let key in obj) {
            if (!obj.hasOwnProperty(key)) continue;
            form.append(key, obj[key]);
        }
        return form;
    }

    /**
     * @param {string} path the path after http://hltc.cs.ust.hk/webapi
     * @param data post data
     */
    static request(path: string, data?: any):Promise<Element> {
        // make request from React Native when possible
        if((window as any).NativeInject != null) {
            return (window as any).NativeInject.apiRequest(path, data);
        }
        if (typeof(data) === 'undefined') data = {};
        const fetchOptions: RequestInit = {
            credentials: 'include',
            method: 'post',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: Api.encodeQueryString(data)
        };
        return fetch(Api.resolve(path), fetchOptions)
            .then(r => {
                if (r.ok) return r.text();
                if (r.status === 500) {
                    return r.text().then(text=>{throw new ServerError(text);});
                }
                throw new ServerError("Server responded with status code " + r.status);
            })
            .then(text => {
                const root = new DOMParser().parseFromString(text, 'text/xml').firstElementChild;
                if(root == null || root.tagName === 'parsererror') {
                    throw new ServerError("Server responded with invalid XML document");
                }
                return root;
            });
    }
}
export {ServerError};