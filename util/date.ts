import { isNumber } from "./typePredicates"

export type SimpleDate = {
    milisSinceUnixEpoch: number
}

export function isSimpleDate(obj: any): obj is SimpleDate{
    if(obj === undefined){
        return false
    }
    if(!isNumber(obj.milisSinceUnixEpoch)){
        return false
    }
    return true
}

export function dateToSimpleDate(d: Date): SimpleDate{
    return {
        milisSinceUnixEpoch: Date.parse(d.toISOString())
    }
}

export function simpleDateToDate(d: SimpleDate): Date{
    return new Date(d.milisSinceUnixEpoch)
}

export function newSimpleDate(){
    return dateToSimpleDate(new Date())
}