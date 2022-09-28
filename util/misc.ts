export function splitNewlines(s: string): string[]{
    return s.replace(/\r/g, "").split(/\n/);
}

/**
 * 
 * @param t Object to resolve the Promise
 * @param delayMilis Delay by this much before resolving the Promise
 */
export function timeoutPromiseOf<T>(t: T, delayMilis: number) : Promise<T>{
    return new Promise<T>(resolve => setTimeout(() => resolve(t), delayMilis))
}

export function timeoutRejectedPromiseOf<T>(delayMilis: number) : Promise<T>{
    return new Promise<T>((_, reject) => setTimeout(() => reject(), delayMilis))
}

export type ASyncFunction<Domain, Range> = (d: Domain) => Promise<Range>