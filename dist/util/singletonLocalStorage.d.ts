export default function singletonLocalStorage<T>(qualifiedName: string): {
    setItem: (item: T) => Promise<T>;
    getItem: () => Promise<T | null>;
};
