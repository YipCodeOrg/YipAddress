import { isBoolean, isString } from "../../util/typePredicates"

describe("isString", () => {
    describe("false", () => {
        describe.each([
            {
                val: null,
                desc: "Null object"
            },
            {
                val: undefined,
                desc: "Undefined object"
            },
            {
                val: 234,
                desc: "Number"
            },
            {
                val: new Date(),
                desc: "Date"
            },
            {
                val: {foo: "Hello", bar: "World"},
                desc: "Simple object"
            },
        ])(
            "$desc", ({val}) => {

                it("returns false", () => {                    
                    //Act
                    const actual = isString(val)

                    //Assert
                    expect(actual).toBe(false)
                })
        })
    })
    describe("true", () => {
        describe.each([
            {
                val: "",
                desc: "Empty string"
            },
            {
                val: "  \n  \r",
                desc: "Whitespace string"
            },
            {
                val: "  Hello World! \n This is certainly a string \r Isn't it?",
                desc: "Mixture of whitespace and non-whitespace"
            },
        ])(
            "$desc", ({val}) => {

                it("returns true", () => {                    
                    //Act
                    const actual = isString(val)

                    //Assert
                    expect(actual).toBe(true)
                })
        })
    })
})

describe("isBoolean", () => {
    describe("false", () => {
        describe.each([
            {
                val: null,
                desc: "Null object"
            },
            {
                val: undefined,
                desc: "Undefined object"
            },
            {
                val: 234,
                desc: "Number"
            },
            {
                val: new Date(),
                desc: "Date"
            },
            {
                val: {foo: "Hello", bar: "World"},
                desc: "Simple object"
            },
        ])(
            "$desc", ({val}) => {

                it("returns false", () => {                    
                    //Act
                    const actual = isBoolean(val)

                    //Assert
                    expect(actual).toBe(false)
                })
        })
    })
    describe("true", () => {
        describe.each([
            {
                val: true,
                desc: "True"
            },
            {
                val: false,
                desc: "False"
            },
            {
                val: 1 === 1 || "HelloWorld",
                desc: "Exrpression including truthy but non-boolean values"
            },
        ])(
            "$desc", ({val}) => {

                it("returns true", () => {                    
                    //Act
                    const actual = isBoolean(val)

                    //Assert
                    expect(actual).toBe(true)
                })
        })
    })
})
