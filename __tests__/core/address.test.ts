import { Address, isAddress } from "../../core/address"

describe("isAddress", () => {
    
  describe("Valid address", () => {
      const validAddress: Address = {
        addressLines: ["123 Fake Street", "Imaginary Road", "Nowhereville", "Nonexistentland", "FUNPOSTCODE123"],
        aliasMap: {
          postCode: 4
        }
      }
      
      it("Returns true", () =>{
        expect(isAddress(validAddress)).toBe(true)
      })
    })

  describe("Invalid address", () => {
    describe.each([{
      invalidAddress: {
        aliasMap: {
          postCode: 4
        }
      },
      invalidAddressDesc: "missing lines"
    },{
      invalidAddress: {
        addressLines: ["123 Fake Street", "Imaginary Road", "Nowhereville", "Nonexistentland", "FUNPOSTCODE123"],
      },
      invalidAddressDesc: "missing aliasMap"
    },
    {
      invalidAddress: {
        addressLines: "WRONG TYPE",
        aliasMap: {
          postCode: 4
        }
      },
      invalidAddressDesc: "Wrong type of lines"
    },
    {
      invalidAddress: {
        addressLines: ["123 Fake Street", "Imaginary Road", "Nowhereville", "Nonexistentland", "FUNPOSTCODE123"],
        aliasMap: "WRONG TYPE"
      },
      invalidAddressDesc: "Wrong type of AliasMap"
    },
    {
      invalidAddress: {},
      invalidAddressDesc: "Empty object"
    },
    {
      invalidAddress: {
        addressLines: ["123 Fake Street", 22, "Nowhereville", "Nonexistentland", "FUNPOSTCODE123"],
        aliasMap: {
          postCode: 4
        }
      },
      invalidAddressDesc: "Mixed type of lines"
    },
    {
      invalidAddress: {
        addressLines: ["123 Fake Street", "Nowhereville", "Nonexistentland", "FUNPOSTCODE123"],
        aliasMap: {
          postCode: 4,
          badAlias: "BAD TYPE"
        }
      },
      invalidAddressDesc: "Mixed type of aliasMap"
    },
    {
      invalidAddress: undefined,
      invalidAddressDesc: "Undefined"
    },
    {
      invalidAddress: null,
      invalidAddressDesc: "Null"
    }  
  ])
  ('$invalidAddressDesc', ({invalidAddress}) => {        
    
    it("Returns false", () =>{
      expect(isAddress(invalidAddress)).toBe(false)
    })
  })
  })
})