import * as localforage from "localforage";
export default function singletonLocalStorage<T>(qualifiedName:string) {
    const setItem = (item:T):Promise<T> => localforage.setItem<T>(qualifiedName, item);
    const getItem = ():Promise<T|null>=>localforage.getItem<T>(qualifiedName);
    return {setItem, getItem};
}