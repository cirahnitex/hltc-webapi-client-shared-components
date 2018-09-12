import * as localforage from "localforage";
export default function singletonLocalStorage(qualifiedName) {
    var set = function (item) { return localforage.setItem(qualifiedName, item); };
    var get = function () { return localforage.getItem(qualifiedName); };
    return { set: set, get: get };
}
//# sourceMappingURL=singletonLocalStorage.js.map