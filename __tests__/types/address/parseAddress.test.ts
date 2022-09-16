import { Address } from "../../../types/address/address"
import { parseStrToAddress } from "../../../types/address/parseAddress"

describe("parseStrToAddress", () => {
    describe.each([{rawAddress: "", rawAddressDesc: "empty", expectedLines: [], expectedAliasMap: {}},
        {rawAddress: "Ending in slash n\n" +
        "\r\t Starting with slash r with leading and trailing space\t \n" +
        "\r\r\r\n\r\n\nEnding in slash r slash n\r\n" +
        "  \t   \t \r\t  \r\n  \t \t\t\t\n", rawAddressDesc: "mixed",
        expectedLines: ["Ending in slash n",
            "Starting with slash r with leading and trailing space",
            "Ending in slash r slash n"],
        expectedAliasMap: {line1: 0, line2: 1, line3: 2}
    }])
    ('$rawAddressDesc raw address', ({rawAddress, expectedLines, expectedAliasMap}) => {

        let parsedAddress: Address

        beforeAll(() => {
            // Act
            parsedAddress = parseStrToAddress(rawAddress)
        })

        it("has expected lines", () => {
            expect(parsedAddress.addressLines).toEqual(expectedLines)
        })

        it("has expected aliases", () => {
            expect(parsedAddress.aliasMap).toEqual(expectedAliasMap)
        })
    })
})