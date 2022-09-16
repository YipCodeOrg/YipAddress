import { isStringArray } from "../../../util/typePredicates"

export type ValidationResult = {
    errors: string[],
    warnings: string[]
}

export type TopValidationResultContainer = {
    topValidationResult: ValidationResult,
}

export type ArrayValidationResult<TItemValid> = {    
    itemValidations: TItemValid[]
} & TopValidationResultContainer

export type ItemValidationResult<TFieldValid> = {    
    fieldValidations: TFieldValid
} & TopValidationResultContainer

export type TopLevelArrayValidationFunction<T, TValid> = (topValidationResult: ValidationResult, ts: T[], 
    itemValidations: TValid[]) => void

export function isValidationResult(obj: any): obj is ValidationResult{
    if(!obj){
        return false
    }
    const { errors, warnings } = obj
    return isStringArray(errors) && isStringArray(warnings)
}

export function isTopLevelValidationResultContainer(obj: any): obj is TopValidationResultContainer{
    const { topValidationResult } = obj
    return isValidationResult(topValidationResult)
}

export function copyValidationResult({errors, warnings}: ValidationResult)
: ValidationResult {
    return {
        errors: [...errors],
        warnings: [...warnings]
    }
}

export const emptyValidationResult: ValidationResult = {
    errors: [],
    warnings: []
}

export function newEmptyValidationResult(): ValidationResult{
    return {
        errors: [],
        warnings: []
    }
}

export function hasErrors(r: ValidationResult | null) {
    if(r === null){
        return false
    }
    return r.errors.length > 0
}

export function hasWarnings(r: ValidationResult | null) {
    if(r === null){
        return false
    }
    return r.warnings.length > 0
}

export enum ValidationSeverity{
    ERROR,
    WARNING
}

export function printMessages(r: ValidationResult, severity: ValidationSeverity){
    return processTargetArray(r, severity, a => a.join("; "))
}

export function addValidationMessage(msg: string, r: ValidationResult, severity: ValidationSeverity): void{
    processTargetArray(r, severity, a => a.push(msg))
}

export function mergeValidations(rs: ValidationResult[]): ValidationResult{
    
    const result = newEmptyValidationResult()
    result.errors = result.errors.concat(...rs.map(r => r.errors))
    result.warnings = result.warnings.concat(...rs.map(r => r.warnings))

    return result
}

/** Goes through all properties of the object and merges together any validation results it finds.
 * Properties that are validation results are included in the merge, as are validation results that
 * are included inside top-level validation result containers.
*/
export function collectValidations(obj: any): ValidationResult{
    const keys = Object.keys(obj)
    const simpleValidations = keys.map(k => obj[k]).filter(isValidationResult)
    const containerValidations = keys.map(k => obj[k]).filter(isTopLevelValidationResultContainer).map(c => c.topValidationResult)
    return mergeValidations([...containerValidations, ...simpleValidations])
}

function processTargetArray<T>(r: ValidationResult, severity: ValidationSeverity, op: (arr: string[]) => T) {
    const targetArray = severity === ValidationSeverity.ERROR ? r.errors : 
        severity === ValidationSeverity.WARNING ? r.warnings : null
    if(targetArray !== null){
        return op(targetArray)
    } else {
        throw new Error("Unkonwn severity")
    }
}