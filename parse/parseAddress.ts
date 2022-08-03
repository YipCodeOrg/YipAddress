import { Address, AliasMap } from "../core/address";
import { splitNewlines } from "../util/misc";

export function parseStrToAddress(rawAddress: string) : Address{
    return parseStrToAddressWithAlias(rawAddress, (_, i) => "line" + (i+1))
}

export function parseStrToAddressWithAlias(rawAddress: string,
    aliasProducer: (line: string, index: number) => string) : Address{

        const addressLines = splitNewlines(rawAddress)
        const aliasMap: AliasMap = {}

        addressLines.forEach((line, index) => {
            const alias = aliasProducer(line, index)
            aliasMap[alias] = index
        })

        const address = {
            rawAddress,
            addressLines,
            aliasMap
        }

        return address
}