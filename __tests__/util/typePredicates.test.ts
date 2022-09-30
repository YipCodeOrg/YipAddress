import { isBoolean, isNumber, isString } from "../../util/typePredicates"

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

describe("isNumber", () => {
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
                val: false,
                desc: "Boolean"
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
                    const actual = isNumber(val)

                    //Assert
                    expect(actual).toBe(false)
                })
        })
    })
    describe("true", () => {
        describe.each([
            {
                val: 0,
                desc: "Zero Int"
            },
            {
                val: 0.00,
                desc: "Zero with decimal point"
            },
            {
                val: 1232,
                desc: "Non-zero nat"
            },
            {
                val: -1232,
                desc: "Negative int"
            },
            {
                val: 2.234234234,
                desc: "Non-zero with decimal"
            },
            {
                val: -32.234,
                desc: "Negative wtih decimal"
            },
        ])(
            "$desc", ({val}) => {

                it("returns true", () => {                    
                    //Act
                    const actual = isNumber(val)

                    //Assert
                    expect(actual).toBe(true)
                })
        })
    })
})

