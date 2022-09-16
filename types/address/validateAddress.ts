import { validateBasicArray, validateStringNotBlank } from "../../validate/commonValidations"
import { ArrayValidationResult, ItemValidationResult, ValidationResult } from "../../validate/validation"
import { Address } from "./address"

export type AddressFieldValidationResult = {
    addressLines: ArrayValidationResult<ValidationResult>
}

export type AddressValidationResult = ItemValidationResult<AddressFieldValidationResult>


function fieldValidateAddress(ad: Address): AddressFieldValidationResult{
    return {
        addressLines: validateBasicArray(ad.addressLines, validateAddressLine, (_ts, _vs, _r) => {}, "Address Line")
    }
}

function validateAddressLine(line: string): ValidationResult{
    
    //TODO: Enhance this beyond just checking for blanks
    return validateStringNotBlank(line, s => s, "Address Line")
}