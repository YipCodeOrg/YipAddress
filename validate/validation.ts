export type ValidationResult = {
    errors: string[],
    warnings: string[]
}

export function copyValidationResult({errors, warnings}: ValidationResult)
: ValidationResult {
    return {
        errors: [...errors],
        warnings: [...warnings]
    }
}

export const EmptyValidationResult: ValidationResult = {
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

function processTargetArray<T>(r: ValidationResult, severity: ValidationSeverity, op: (arr: string[]) => T) {
    const targetArray = severity === ValidationSeverity.ERROR ? r.errors : 
        severity === ValidationSeverity.WARNING ? r.warnings : null
    if(targetArray !== null){
        return op(targetArray)
    } else {
        throw new Error("Unkonwn severity")
    }
}
