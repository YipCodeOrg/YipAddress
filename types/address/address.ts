import _ from "lodash"
import { isSimpleProperty, isStringArray } from "../../util/typePredicates"

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

export function removeAlias(map: AliasMap, alias: string){
    delete map[alias]
}

export function aliasMapFromList(list: [string, number][]): AliasMap{
    const aliasMap: AliasMap = {}
    for(let [alias, index] of list){
        aliasMap[alias] = index
    }
    return aliasMap
}

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

export function shallowCopyUpdateLine(address: Address, index: number, content: string) : Address{
    return(shallowCopyUpdateLines(address, a => {a[index] = content}))
}

/** 
 * Creates a new object which is a shallow copy of the original except for the addressLines
 * The addressLines are deep copied & the line at the given index is replaced with the given content
*/
export function shallowCopyUpdateLines(address: Address, update: (lines: string[]) => void)
: Address{        
    const addressLinesCopy = [...address.addressLines]
    update(addressLinesCopy)
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

export function printAddress(address: Address, lineSeparator: string){
    return address.addressLines.join(lineSeparator)
}

export function inverseAliasMap(address: Address) : Map<number, Set<string>>{
    const map = new Map<number, Set<string>>()
    const aliasMap = address.aliasMap
    
    for(let key in aliasMap){
        const index = aliasMap[key]
        if(index !== undefined){
            if(!map.has(index)){
                map.set(index, new Set<string>())
            }
            const set = map.get(index)
            if(set !== undefined){
                set.add(key)
            } else {
                throw new Error("Unexpected undefined set encountered");
                
            }
        }
    }
    
    return map
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