import { mapMap } from "./mapUtil";

export function sortByKeyFunction<TKey, TData>(sortArray: TKey[], dataArray: TData[], keyMapper: (data: TData) => TKey): TData[]{
    
    const keyDataIndexMap = inverseIndexMap(dataArray, keyMapper)
    const usedIndices = new Set<number>()
    const resultArray: TData[] = []

    // Main sort
    for(let key of sortArray){
        if(keyDataIndexMap.has(key)){
            const index = keyDataIndexMap.get(key)
            if(index === undefined){
                throw new Error("Unexpected undefined index encountered during main sort");
            }
            const data = index === undefined ? undefined : dataArray[index]
            if(data === undefined){
                throw new Error("Unexpected undefined data encountered");
            }
            usedIndices.add(index)
            resultArray.push(data)
        }
    }

    // Append stragglers, if any
    if(dataArray.length !== usedIndices.size){
        for (let index = 0; index < dataArray.length; index++) {        
            if(!usedIndices.has(index)){
                const data = dataArray[index];
                if(data === undefined){
                    throw new Error("Unexpected undefined data encountered during append stragglers");
                }
                resultArray.push(data)
            }
        }
    }

    return resultArray
}

export function inverseIndexDuplicatesMap<TKey, TData>(a: TData[], keyMapper: (data: TData) => TKey) : Map<TKey, Set<number>>{
    const inverseSetMap = inverseIndexSetMap(a, keyMapper)
    const dupesMap = new Map<TKey, Set<number>>()
    for(var [k, s] of inverseSetMap){
        if(s.size > 1){
            dupesMap.set(k, s)
        }
    }
    return dupesMap
}

export function inverseIndexSetMap<TKey, TData>(a: TData[], keyMapper: (data: TData) => TKey) : Map<TKey, Set<number>>{
    const keyDataIndexMap = new Map<TKey, Set<number>>()

    for (let index = 0; index < a.length; index++) {
        const data = a[index];
        if(data === undefined){
            throw new Error("Unexpected undefined data encountered during map building");
        }
        const key = keyMapper(data)
        const val = keyDataIndexMap.get(key)
        if(val !== undefined){
             val.add(index)           
        } else{
            keyDataIndexMap.set(key, new Set([index]))
        }
    }

    return keyDataIndexMap
}

export function inverseIndexMap<TKey, TData>(a: TData[], keyMapper: (data: TData) => TKey) : Map<TKey, number>{
    const keyDataIndexMap = new Map<TKey, number>()

    for (let index = 0; index < a.length; index++) {
        const data = a[index];
        if(data === undefined){
            throw new Error("Unexpected undefined data encountered during map building");
        }
        const key = keyMapper(data)
        if(keyDataIndexMap.has(key)){
            throw new Error("Duplicate key found");            
        }
        keyDataIndexMap.set(key, index)
    }

    return keyDataIndexMap
}

export function inverseDataMap<TKey, TData>(a: TData[], keyMapper: (data: TData) => TKey) : Map<TKey, TData>{
    function getValueAtIndex(i: number){
        const val = a[i]
        if(val === undefined){
            throw new Error("Unexpected undefined element indexing array");            
        }
        return val
    }
    const invIndexMap = inverseIndexMap(a, keyMapper)
    return mapMap(invIndexMap, (k, i) => [k, getValueAtIndex(i)])
}