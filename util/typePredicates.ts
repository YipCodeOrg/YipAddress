export function isSimpleProperty(obj: any, property: PropertyKey){
    const desc = Object.getOwnPropertyDescriptor(obj, property)
    if(!!desc){
        return (!desc.get && !desc.set)
    }
    return false
}

export function isNumber(obj: any): obj is number{
    return typeof obj === 'number'
}

export function isSimpleStringProperty(obj: any, property: PropertyKey){
    return isSimpleProperty(obj, property) && isString(obj[property])
}

export function areSimpleStringProperties(obj: any, properties: PropertyKey[]){
    return properties.every(prop => isSimpleStringProperty(obj, prop))
}

export function isString(obj: any): obj is string{
    return ((!!obj || obj === "") && (typeof obj === 'string' || obj instanceof String))
}

export function isBoolean(obj: any): obj is boolean{
    return (typeof obj === 'boolean' || obj instanceof Boolean)
}

export function isTypedArray<T>(obj: any, isElementCorrectType: (obj: any) => obj is T): obj is T[]{
    if(!obj){
        return false
    }
    if(!Array.isArray(obj)){
        return false
    }
    return areAllCorrectType(obj, isElementCorrectType)
}

export function areAllCorrectType<T>(objs: any[], isElementCorrectType: (obj: any) => obj is T): objs is T[]{
    for(const obj of objs){
        if(!isElementCorrectType(obj)){
            return false
        }
    }
    return true
}

export function isStringArray(obj: any): obj is string[]{
    return isTypedArray(obj, isString)
}

export function areStrings(objs: any[]): objs is string[]{
    return areAllCorrectType(objs, isString)
}
