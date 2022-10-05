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

export function compose2PairDomain<A1, A2, B, C>(f: (a1: A1, a2: A2) => B, g: (b: B) => C){
    return (a1: A1, a2: A2) => g(f(a1, a2))
}

export function compose2TripleDomain<A1, A2, A3, B, C>(f: (a1: A1, a2: A2, a3: A3) => B, g: (b: B) => C){
    return (a1: A1, a2: A2, a3: A3) => g(f(a1, a2, a3))
}

export function compose2Higher<A, B, X, Y, Z>(f: (a: A) => (x: X) => Y, g: (b: B) => (y: Y) => Z)
    : (a: A, b: B) => (x: X) => Z{
    return (a: A, b: B) => compose2(f(a), g(b))
}

export function compose3Higher<A1, A2, A3, X1, X2, X3, X4>(
    f1: (_: A1) => (_: X1) => X2,
    f2: (_: A2) => (_: X2) => X3,
    f3: (_: A3) => (_: X3) => X4
    )
    : (a1: A1, a2: A2, a3: A3) => (_: X1) => X4{
    return (a1: A1, a2: A2, a3: A3) => compose2(compose2(f1(a1), f2(a2)), f3(a3))
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

export function liftSingleArg<X1, X2, Y1, Y2>(f: (x: X2) => Y1,
    fx: (x: X1) => X2, fy: (y: Y1) => Y2): (x: X1) => Y2{
        return function(x: X1){
            const x2 = fx(x)
            const y1 = f(x2)
            return fy(y1)
    }
}