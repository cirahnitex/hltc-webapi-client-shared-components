import * as localforage from "localforage";
export default function singletonLocalStorage<T>(qualifiedName:string) {
    const set = (item:T):Promise<T> => localforage.setItem<T>(qualifiedName, item);
    const get = ():Promise<T|null>=>localforage.getItem<T>(qualifiedName);
    return {set, get};
}