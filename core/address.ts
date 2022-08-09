import _ from "lodash"
import { isSimpleProperty, isStringArray } from "../../../util/typePredicates"

export type Address = {
    addressLines: string[],
    aliasMap: AliasMap
}

/**
 * Checks that the basic structure of the object conforms to the address type.
 * Note: this does not validate the address. It just checks the strucutre and types.
 */
export function isAddress(obj: any): obj is Address{
    if(!obj){        
        return false
    }
    const {addressLines, aliasMap} = obj
    return isStringArray(addressLines) && isAliasMap(aliasMap)
}

/**
 * Each line of an address can have any number of alises.
 */
export type AliasMap = { [id: string] : number}

export const emptyAddress: Address = {
    addressLines: [],
    aliasMap: {}
}

export function isAliasMap(obj: any): obj is AliasMap{
    if(!obj){
        return false
    }
    const symbolProps = Object.getOwnPropertySymbols(obj)
    if(symbolProps.length > 0){
        console.log("Symbol props")
        return false
    }
    for(var prop of Object.getOwnPropertyNames(obj)){
        if(!isSimpleProperty(obj, prop)){
            console.log("Not simple prop")
            return false
        }
        const val = obj[prop]
        if(!Number.isFinite(val)){
            return false
        }
    }
    return true
}

/** 
 * Creates a new object which is a shallow copy of the original except for the addressLines
 * The addressLines are deep copied & the line at the given index is replaced with the given content
*/
export function shallowCopyUpdateLine(address: Address, index: number, content: string) : Address{
    const addressLinesCopy = [...address.addressLines]
    addressLinesCopy[index] = content
    return {
        addressLines: addressLinesCopy,
        aliasMap: address.aliasMap
    }
}


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