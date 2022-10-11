import { isSimpleProperty } from "./typePredicates"

export type StringMap<T> = { [key: string] : T}

export function isStringMap<T>(obj: any,
    isVal: (x: any) => x is T): obj is StringMap<T>{
    if(!obj){
        return false
    }
    const symbolProps = Object.getOwnPropertySymbols(obj)
    if(symbolProps.length > 0){
        return false
    }
    for(var prop of Object.getOwnPropertyNames(obj)){
        if(!isSimpleProperty(obj, prop)){
            return false
        }
        const val = obj[prop]
        if(!isVal(val)){
            return false
        }
    }
    return true
}

export function mapMapValues<TDomain, TRange>(map: StringMap<TDomain>,
    mapper: (_ : TDomain) => TRange): StringMap<TRange>{

        const targetMap: StringMap<TRange> = {}

        for(let key in map){
            let val = map[key]
            if(val !== undefined){
                targetMap[key] = mapper(val)
            }
        }

        return targetMap
}