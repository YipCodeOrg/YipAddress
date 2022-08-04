import { Address, AliasMap } from "../core/address";
import { splitNewlines } from "../util/misc";

export type ParseOptions = {}

export function parseStrToAddress(rawAddress: string) : Address{
    return parseStrToAddressWithAlias(rawAddress, (_, i) => "line" + (i+1))
}

export function parseStrToAddressWithAlias(rawAddress: string,
    aliasProducer: (line: string, index: number) => string) : Address{

        const rawLines = splitNewlines(rawAddress)
        const trimmedLines = rawLines.map(s => s.trim())
        const addressLines = trimmedLines.filter(s => !!s)
        const aliasMap: AliasMap = {}

        addressLines.forEach((line, index) => {
            const alias = aliasProducer(line, index)
            aliasMap[alias] = index
        })

        const address = {
            addressLines,
            aliasMap
        }

        return address
}