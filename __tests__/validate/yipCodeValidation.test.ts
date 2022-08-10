import { isValidYipCode } from "../../validate/yipCodeValidation"

describe("isValidYipCode", () => {

  describe("Invalid YipCode", () => {
    describe.each([
        {str: "", desc: "Empty string"},
        {str: "ABADHL55203<", desc: "Suffix invalid character"},
        {str: "<ABADHL55203", desc: "Prefix invalid character"},
        {str: "ABADH>L55203", desc: "Infix invalid character"},
        {str: "ABADHL55203 ", desc: "Suffix ispace"},
        {str: " ABADHL55203", desc: "Prefix space"},
        {str: "ABADH L55203", desc: "Infix space"},
        {str: "ABADHL55203S3456C", desc: "Too long"},
  ])
  ('$desc', ({str}) => {        
    
    it("Returns false", () =>{
      expect(isValidYipCode(str)).toBe(false)
    })
  })
  })

  describe("Valid YipCode", () => {
    describe.each([
        {str: "ABADHL55203S3456", desc: "Max length"},
        {str: "ABADHL5", desc: "Less than max length"},
        {str: "ABafDHL5", desc: "Mixed case and numbers"},
        {str: "abcdefghijklm", desc: "All lower case"},
        {str: "XYZWUVTRS", desc: "All upper case"},
  ])
  ('$desc', ({str}) => {        
    
    it("Returns true", () =>{
      expect(isValidYipCode(str)).toBe(true)
    })
  })
  })

})