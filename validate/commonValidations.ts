import { inverseIndexDuplicatesMap } from "../util/arrayUtil"
import { addValidationMessage, ArrayValidationResult, collectValidations, hasErrors, hasWarnings, ItemValidationResult, newEmptyValidationResult, TopLevelArrayValidationFunction, ValidationResult, ValidationSeverity } from "./validation"

export function validateNameNotBlank<T>(t: T, nameField: (t: T) => string | null | undefined): ValidationResult{
    return validateStringNotBlank(t, nameField, "Name")
}

export function validateStringNotBlank<T>(t: T, field: (t: T) => string | null | undefined, fieldDesc: string): ValidationResult{
    const validation = newEmptyValidationResult()
    if(!field(t)){
        validation.errors.push(`${fieldDesc} must not be blank`)
    }
    return validation
}

export function validateUniqueStr<T, TIV>(validation: ValidationResult, arr: T[], field: (t: T) => string,
itemValidations: TIV[], itemValidationField: (v: TIV) => ValidationResult, severity: ValidationSeverity, fieldDesc: string){
    return(validateUnique(validation, arr, field, itemValidations, itemValidationField, severity, fieldDesc, s => s))
}

/** 
 * Adds a validation message per each duplicate item found in the array
*/
export function validateUnique<T, TF, TIV>(validation: ValidationResult, arr: T[], field: (t: T) => TF, 
itemValidations: TIV[], itemValidationField: (v: TIV) => ValidationResult, severity: ValidationSeverity, fieldDesc: string, print: (t: TF) => string){
    const dupes = inverseIndexDuplicatesMap(arr, field)
    for(let [key, numSet] of dupes.entries()){
        const indicesStr = printIndices(numSet)
        let printed = print(key)
        const msg = printed !== "" ? `Duplicate ${fieldDesc} '${printed}' found at indices: ${indicesStr}` :
            `Duplicate blank ${fieldDesc} found at indices: ${indicesStr}`
        addValidationMessage(msg, validation, severity)
        for(let i of numSet){
            const itemValidation = itemValidations[i]
            if(itemValidation !== undefined){
                const fieldValidation = itemValidationField(itemValidation)
                addValidationMessage(`Duplicate ${fieldDesc}`, fieldValidation, severity)
            }
        }        
    }
}

function printIndices(numSet: Set<number>) : string{
    const arr = Array.from(numSet.values())
    return arr.map(i => i.toString()).join(", ")
}

/** Maps input array to array of validations and simultaneously collects top-level validation messages.*/
export function validateAndCollectItems<T, TValid>(ts: T[], validate: (t: T) => TValid,
    getResult: (v: TValid) => ValidationResult, topLevel: ValidationResult, objDescriptor: string): TValid[]{
        const itemValidations = ts.map(validate)
        const itemValidationResults = itemValidations.map(getResult)

        itemValidationResults.forEach((v, i) => {
            if(hasErrors(v)){
                topLevel.errors.push(`One or more validation errors at position ${i} of the ${objDescriptor} list`)
            }
            if(hasWarnings(v)){
                topLevel.warnings.push(`One or more validation warnings at position ${i} of the ${objDescriptor} list`)
            }
        })

        return itemValidations
}

export function validateItemResultArray<T, TFieldValid>(ts: T[], validate: (t: T) => ItemValidationResult<TFieldValid>,
validateTopLevel: TopLevelArrayValidationFunction<T, ItemValidationResult<TFieldValid>>, objDescriptor: string)
: ArrayValidationResult<ItemValidationResult<TFieldValid>>{
    return validateArray(ts, validate, v => v.flatValidation, validateTopLevel, objDescriptor)
}

export function validateArray<T, TValid>(ts: T[], validate: (t: T) => TValid,
getFlatValidation: (v: TValid) => ValidationResult, validateTopLevel: TopLevelArrayValidationFunction<T, TValid>, objDescriptor: string)
: ArrayValidationResult<TValid>{
    const topValidationResult = newEmptyValidationResult()
    const itemValidations = validateAndCollectItems(ts, validate,
        getFlatValidation, topValidationResult, objDescriptor)
    validateTopLevel(topValidationResult, ts, itemValidations)
    return {
        topValidationResult,
        itemValidations
    }
}

export function liftFieldValidationToItemValidation<T, TFieldValid>(fieldValidate: (t: T) => TFieldValid)
: (t: T) => ItemValidationResult<TFieldValid>{
    return (t) => {
        const fieldValidations = fieldValidate(t)
        return {
            flatValidation: collectValidations(fieldValidations),
            fieldValidations
        }
    }
}