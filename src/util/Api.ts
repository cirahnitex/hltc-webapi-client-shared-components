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
            if(window.location.host.startsWith('localhost')) return "http://hltc.cs.ust.hk/webapi" + path;
            else return '/webapi' + path;
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
     *
     * @param {string} path the path after http://hltc.cs.ust.hk/webapi
     * @param data post data
     * @returns {Promise<any>}
     */
    static request(path: string, data?: any) {
        if (typeof(data) === 'undefined') data = {};
        data.format = "json";
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
                if (r.ok) return r.json();
                throw new ServerError("Server respond with status code " + r.status);
            })
            .then(json => {
                if (!json.success) {
                    throw new ServerError(json.message);
                }
                return json;
            });
    }
}
export {ServerError};