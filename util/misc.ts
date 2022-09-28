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

export function compose2<A, B, C>(f: (a: A) => B, g: (b: B) => C){
    return (a: A) => g(f(a))
}

/** Lifts a potentially undefined function into a defined function, yielding a no-op for undefined. */
export function liftUndefinedToNoOp<T>(f: ((_: T) => T) | undefined): (_: T) => T{
    return function(t: T){
        if(f !== undefined){
            return f(t)
        } else{
            return t
        }
    }
}