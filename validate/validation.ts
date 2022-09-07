import { isStringArray } from "../../../util/typePredicates"

export type ValidationResult = {
    errors: string[],
    warnings: string[]
}

export type ArrayValidationResult<TItemValid> = {
    topValidationResult: ValidationResult,
    itemValidations: TItemValid[]
}

export type ItemValidationResult<TFieldValid> = {
    flatValidations: ValidationResult,
    fieldValidations: TFieldValid
}

export function isValidationResult(obj: any): obj is ValidationResult{
    const { errors, warnings } = obj
    return isStringArray(errors) && isStringArray(warnings)
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

export function collectValidations(obj: any): ValidationResult{
    const validations = Object.keys(obj).map(k => obj[k])
        .filter(isValidationResult)
    return mergeValidations(validations)
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