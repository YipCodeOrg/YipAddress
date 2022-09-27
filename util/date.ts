export type SimpleDate = {
    milisSinceUnixEpoch: number
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