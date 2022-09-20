import { hasErrors, hasWarnings, printMessages, ValidationResult, ValidationSeverity } from "./validation"

export type EnhancedValidation = {
    validation: ValidationResult,
    errorMessages: string,
    warningMessages: string,
    hasErrors: boolean,
    hasWarnings: boolean
}

export function lazyEnhancedValidationOrNull(validation: ValidationResult | null){
    if(validation === null){
        return null
    } else {
        return lazyEnhancedValidation(validation)
    }
}

export function lazyEnhancedValidation(validation: ValidationResult) : EnhancedValidation{
    return new LazyEnhancedValidation(validation)
}

export function functionBackedEnhancedValidation(args: FunctionBackedEnhancedValidationArgs): EnhancedValidation{
    return new FunctionBackedEnhancedValidation(args)
}

export type FunctionBackedEnhancedValidationArgs = {
    validation: ValidationResult,
    errorMessagesGenerator: () => string,
    warningMessagesGenerator: () => string,
    hasErrorsGenerator: () => boolean,
    hasWarningsGenerator: () => boolean
}

class FunctionBackedEnhancedValidation implements EnhancedValidation {

    #args: FunctionBackedEnhancedValidationArgs

    constructor(args: FunctionBackedEnhancedValidationArgs){
        this.#args = args
    }

    get validation(): ValidationResult{
        return this.#args.validation
    }

    get errorMessages(): string{
        return this.#args.errorMessagesGenerator()
    }

    get warningMessages(): string{
        return this.#args.warningMessagesGenerator()
    }

    get hasErrors(): boolean{
        return this.#args.hasErrorsGenerator()
    }

    get hasWarnings(): boolean{
        return this.#args.hasWarningsGenerator()
    }

}

class LazyEnhancedValidation implements EnhancedValidation {
    #validation: ValidationResult
    #errorMessages: Lazy<string>
    #warningMessages: Lazy<string>
    #hasErrors: Lazy<boolean>
    #hasWarnings: Lazy<boolean>

    constructor(validation: ValidationResult){
        this.#validation = validation
        this.#errorMessages = new Lazy(() => printMessages(validation, ValidationSeverity.ERROR))
        this.#warningMessages = new Lazy(() => printMessages(validation, ValidationSeverity.WARNING))
        this.#hasErrors = new Lazy(() => hasErrors(validation))
        this.#hasWarnings = new Lazy(() => hasWarnings(validation))
    }

    get validation(): ValidationResult{
        return this.#validation
    }

    get errorMessages(): string{
        return this.#errorMessages.value
    }

    get warningMessages(): string{
        return this.#warningMessages.value
    }

    get hasErrors(): boolean{
        return this.#hasErrors.value
    }

    get hasWarnings(): boolean{
        return this.#hasWarnings.value
    }
}

class Lazy<T> {
    #val: T | undefined
    #init: () => T    
    constructor(init: () => T) {this.#init = init}
    public get value(): T {
      return this.#val ??= this.#init();
    }
}