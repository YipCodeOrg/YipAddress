import { emptyValidationResult, mergeValidations, newEmptyValidationResult } from "../../validate/validation"

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