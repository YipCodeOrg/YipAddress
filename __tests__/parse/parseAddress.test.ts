import { Address } from "../../core/address"
import { parseStrToAddress } from "../../parse/parseAddress"

describe("parseStrToAddress", () => {
    describe.each([{rawAddress: "", rawAddressDesc: "empty", expectedLines: [], expectedAliasMap: {}}])
    ('$rawAddressDesc raw address', ({rawAddress, expectedLines, expectedAliasMap}) => {

        let parsedAddress: Address

        beforeAll(() => {
            // Act
            parsedAddress = parseStrToAddress(rawAddress)
        })

        it("preserves input address", () => {
            expect(parsedAddress.rawAddress).toBe(rawAddress)
        })

        it("has expected lines", () => {
            expect(parsedAddress.addressLines).toEqual(expectedLines)
        })

        it("has expected aliases", () => {
            expect(parsedAddress.aliasMap).toEqual(expectedAliasMap)
        })
    })
})