import _ from "lodash"

export type Address = {
    rawAddress: string,
    addressLines: string[],
    aliasMap: AliasMap
}

/**
 * Each line of an address can have any number of alises.
 */
export type AliasMap = { [id: string] : number}


export function getLine(address: Address, alias: string) : string{
    const lineOrError = getLineOrError(address, alias)
    const result = lineOrError.result
    if(!!result){
        return result            
    }
    throw new Error("Error getting line")
}

enum AliasIndexError{
    None,
    NoLineFound,
    NoIndexFound
}

type GetLineResult = {
    result?: string,
    error: AliasIndexError
}

function getLineOrError(address: Address, alias: string) : GetLineResult{
    const index = address.aliasMap[alias]
    if(_.isNumber(index)){
        const line = address.addressLines[index]
        if(!!line){
            return {result: line, error: AliasIndexError.None}
        }
        return {error: AliasIndexError.NoLineFound}
    }
    return {error: AliasIndexError.NoIndexFound}
}