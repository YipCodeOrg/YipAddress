import { collectValidations, emptyValidationResult, mergeValidations, newEmptyValidationResult } from "../../validate/validation"

describe("mergeValidations", () => {
    describe.each([
        {rs: [], expected: emptyValidationResult, desc: "Empty array"},
        {rs: [emptyValidationResult, newEmptyValidationResult()], expected: emptyValidationResult, desc: "Array of empty results"},
        {rs: [{errors: ["E00"], warnings:["W00"]}, newEmptyValidationResult(), {errors: ["E20", "E21"], warnings:[]},
                {errors: [], warnings:["W30"]}],
            expected: {errors: ["E00", "E20", "E21"], warnings:["W00", "W30"]}, desc: "Array with non-empty results"},
    ])
    ('$desc', ({rs, expected}) => {        

        it("equals expected", () =>{
        expect(mergeValidations(rs)).toEqual(expected)
        })
    })
})

describe("collectValidations", () => {
    describe.each([
        {obj: {}, expected: emptyValidationResult, desc: "Empty object"},
        {obj: {v1: emptyValidationResult, v2: newEmptyValidationResult()}, expected: emptyValidationResult, desc: "Object of empty results"},
        {obj: {v1: emptyValidationResult, other1: 1231, other2: "Hello", v2: newEmptyValidationResult()}, expected: emptyValidationResult, desc: "Object with empty results and other props"},
        {obj: {v1: {errors: ["E00"], warnings:["W00"]}, other1: "Hello", v2: newEmptyValidationResult(), v3: {errors: ["E20", "E21"], warnings:[]}, v4: {errors: [], warnings:["W30"]}, other2: {errors: 1, warnings: []}, other3: {errors: [], warnings: "this is not a validation result"}},
            expected: {errors: ["E00", "E20", "E21"], warnings:["W00", "W30"]}, desc: "Object with empty, non-empty and other props"},
    ])
    ('$desc', ({obj, expected}) => {        

        it("equals expected", () =>{
        expect(collectValidations(obj)).toEqual(expected)
        })
    })
})