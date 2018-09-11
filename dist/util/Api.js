var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var ServerError = /** @class */ (function (_super) {
    __extends(ServerError, _super);
    function ServerError(message) {
        var _this = _super.call(this, message) || this;
        _this.name = 'ServerError';
        return _this;
    }
    return ServerError;
}(Error));
var Api = /** @class */ (function () {
    function Api() {
    }
    Api.setLocationSearch = function (data) {
        window.history.replaceState(null, "", '?' + Api.encodeQueryString(data));
    };
    Api.resolve = function (path) {
        if (path.indexOf('/') === 0 && window.location.host.startsWith('localhost'))
            return "http://hltc.cs.ust.hk/webapi" + path;
        return '/webapi' + path;
    };
    Api.encodeQueryString = function (obj) {
        var pieces = [];
        for (var key in obj) {
            if (!obj.hasOwnProperty(key))
                continue;
            pieces.push(encodeURIComponent(key) + "=" + encodeURIComponent(obj[key]));
        }
        return pieces.join("&");
    };
    Api.encodeFormData = function (obj) {
        var form = new FormData();
        for (var key in obj) {
            if (!obj.hasOwnProperty(key))
                continue;
            form.append(key, obj[key]);
        }
        return form;
    };
    /**
     *
     * @param {string} path the path after http://hltc.cs.ust.hk/webapi
     * @param data post data
     * @returns {Promise<any>}
     */
    Api.request = function (path, data) {
        if (typeof (data) === 'undefined')
            data = {};
        data.format = "json";
        var fetchOptions = {
            credentials: 'include',
            method: 'post',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: Api.encodeQueryString(data)
        };
        return fetch("http://127.0.0.1:8792" + path, fetchOptions)
            .then(function (r) {
            if (r.ok)
                return r;
            throw new ServerError("Server respond with status code " + r.status);
        })
            .catch(function () { return fetch(Api.resolve(path), fetchOptions); })
            .then(function (r) {
            if (r.ok)
                return r.json();
            throw new ServerError("Server respond with status code " + r.status);
        })
            .then(function (json) {
            if (!json.success) {
                throw new ServerError(json.message);
            }
            return json;
        });
    };
    return Api;
}());
export default Api;
export { ServerError };
//# sourceMappingURL=Api.js.map