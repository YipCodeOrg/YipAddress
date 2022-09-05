import { inverseIndexDuplicatesMap } from "../util/arrayUtil"
import { addValidationMessage, newEmptyValidationResult, ValidationResult, ValidationSeverity } from "./validation"

export function validateNameNotBlank<T>(t: T, nameField: (t: T) => string | null | undefined): ValidationResult{
    return validateStringNotBlank(t, nameField, "name")
}

export function validateStringNotBlank<T>(t: T, field: (t: T) => string | null | undefined, fieldDesc: string): ValidationResult{
    const validation = newEmptyValidationResult()
    if(!field(t)){
        validation.errors.push(`${fieldDesc} must not be blank`)
    }
    return validation
}

export function validateUniqueStr<T>(validation: ValidationResult, arr: T[], field: (t: T) => string, 
severity: ValidationSeverity, fieldDesc: string){
    return(validateUnique(validation, arr, field, severity, fieldDesc, s => s))
}

/** 
 * Adds a validation message per each duplicate item found in the array
*/
export function validateUnique<T, TF>(validation: ValidationResult, arr: T[], field: (t: T) => TF, 
severity: ValidationSeverity, fieldDesc: string, print: (t: TF) => string){
    const dupes = inverseIndexDuplicatesMap(arr, field)
    for(let [key, set] of dupes.entries()){
        const msg = `Duplicate ${fieldDesc} '${print(key)}' found at indices: ${Array.of(set.values).join(", ")}`
        addValidationMessage(msg, validation, severity)
    }
}