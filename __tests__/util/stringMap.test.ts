import { hasKey, mapMapValues } from "../../util/stringMap"

describe("mapMapValues", () => {    
    
    const one = "One"
    const two = "Two"
    const other = "Other number"

    function mapper(x: number): string{
        if(x === 1){
            return one
        } else if(x === 2){
            return two
        } else {
            return other
        }
    }

    describe.each([
        {
            input: {
                Hello: 1,
                World: 2,
                Foo: -11,
                Bar: 12
            },            
            desc: "Non-empty map",
            expected:  {
                Hello: one,
                World: two,
                Foo: other,
                Bar: other
            }
        },
        {
            input: {},            
            desc: "Empty map",
            expected:  {}
        },
    ])(
        "$desc", ({input, expected}) => {

            it("equals expected", () => {
                //Act
                const actual = mapMapValues(input, mapper)

                //Assert
                expect(actual).toEqual(expected)
            })
    })
})

describe("hasKey", () => {
    
    describe("Key exists", () => {
        it("Returns true", () => {
            //Arrange
            const map = {
                k: 1,
                v: 2,
                u: 3
            }

            //Act
            const actual = hasKey(map, "v")

            //Assert
            expect(actual).toBe(true)
        })
    })

    describe("Key does not exist", () => {
        it("Returns false", () => {
            //Arrange
            const map = {
                k: 1,
                v: 2,
                u: 3
            }

            //Act
            const actual = hasKey(map, "Non-existent")

            //Assert
            expect(actual).toBe(false)
        })
    })
})

