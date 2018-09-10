import * as localforage from "localforage";
export default function singletonLocalStorage(qualifiedName) {
    var setItem = function (item) { return localforage.setItem(qualifiedName, item); };
    var getItem = function () { return localforage.getItem(qualifiedName); };
    return { setItem: setItem, getItem: getItem };
}
//# sourceMappingURL=singletonLocalStorage.js.map