export default function singletonLocalStorage<T>(qualifiedName: string): {
    set: (item: T) => Promise<T>;
    get: () => Promise<T | null>;
};
