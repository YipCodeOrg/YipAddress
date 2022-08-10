const maxYipCodeLength = 16

export function isValidYipCode(unsafeStr: string){
    const length = unsafeStr.length
    if(length > maxYipCodeLength){
        return false
    }
    const validationRegex = /^[a-z0-9]+$/i
    return !!unsafeStr.match(validationRegex)
}