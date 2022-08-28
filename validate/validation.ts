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

export function newEmptyValidationResult(){
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