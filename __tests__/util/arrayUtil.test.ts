import { inverseDataMap, inverseIndexDuplicatesMap, inverseIndexMap, inverseIndexSetMap, sortByKeyFunction } from "../../util/arrayUtil"

describe("sortByKeyFunction", () => {    
    function f(data: {id: number, name: string}){return data.id}
    describe.each([
        {
            d: [{id: 1, name: "One"}, {id: 2, name: "Two"}, {id: 3, name: "Three"}],
            k: [1, 2, 3],
            desc: "Same elements and order",
            expected: [{id: 1, name: "One"}, {id: 2, name: "Two"}, {id: 3, name: "Three"}],
        },
        {
            d: [{id: 1, name: "One"}, {id: 2, name: "Two"}, {id: 3, name: "Three"}],
            k: [1, 3, 2],
            desc: "Same elements, different order",
            expected: [{id: 1, name: "One"}, {id: 3, name: "Three"}, {id: 2, name: "Two"}],
        },
        {
            d: [{id: 1, name: "One"}, {id: 2, name: "Two"}, {id: 3, name: "Three"}, {id: 4, name: "Four"}],
            k: [3, 500, 2],
            desc: "Different elements, different order",
            expected: [{id: 3, name: "Three"}, {id: 2, name: "Two"}, {id: 1, name: "One"}, {id: 4, name: "Four"}],
        },
    ])(
        "$desc", ({k, d, expected}) => {

            it("equals expected", () => {
                //Act
                const actual = sortByKeyFunction(k, d, f)

                //Assert
                expect(actual).toEqual(expected)
            })
    })
})

describe("inverseIndexMap", () => {
    function f(data: {id: number, name: string}){return data.name}
    
    type TestData = {id: number, name: string}

    type TestInput = {
        a: TestData[]
        desc: string,
        expected: [string, number][]
    }
    
    describe("happy", () => {
        describe.each<TestInput>([
            {
                a: [{id: 1, name: "One"}, {id: 2, name: "Two"}, {id: 3, name: "Three"}],
                desc: "Multiple values",
                expected: [["One", 0], ["Two", 1], ["Three", 2]],
            },
            {
                a: [{id: 1, name: "One"}],
                desc: "Single value",
                expected: [["One", 0]],
            },
            {
                a: [],
                desc: "Empty",
                expected: [],
            }
        ])(
            "$desc", ({a, expected}) => {

                it("has expected mappings", () => {
                    //Arrange
                    const expectedMap = new Map<string, number>(expected)
                    
                    //Act
                    const actual = inverseIndexMap(a, f)

                    //Assert
                    expect(actual).toEqual(expectedMap)
                })
        })
    })
    
    describe("failure", () => {
        describe.each([
            {
                a: [{id: 1, name: "One"}, {id: 2, name: "Two"}, {id: 3, name: "One"}],
                desc: "Duplicate keys"
            }
        ])(
            "$desc", ({a}) => {

                it("throws error", () => {                    
                    expect(() => inverseIndexMap(a, f)).toThrow(Error)
                })
        })
    })
})

describe("inverseDataMap", () => {
    function f(data: {id: number, name: string}){return data.name}
    
    type TestData = {id: number, name: string}

    type TestInput = {
        a: TestData[]
        desc: string,
        expected: [string, TestData][]
    }
    
    describe("happy", () => {
        const one = {id: 1, name: "One"}
        const two = {id: 2, name: "Two"}
        const three = {id: 3, name: "Three"}
        describe.each<TestInput>([
            {
                a: [one, two, three],
                desc: "Multiple values",
                expected: [["One", one], ["Two", two], ["Three", three]],
            },
            {
                a: [{id: 1, name: "One"}],
                desc: "Single value",
                expected: [["One", one]],
            },
            {
                a: [],
                desc: "Empty",
                expected: [],
            }
        ])(
            "$desc", ({a, expected}) => {

                let expectedMap: Map<string, TestData>
                let actualMap: Map<string, TestData>

                beforeAll(() => {
                    // Arrange
                    expectedMap = new Map<string, TestData>(expected)
                    
                    // Act
                    actualMap = inverseDataMap(a, f)
                })

                it("has expected mappings", () => {
                    expect(actualMap).toEqual(expectedMap)
                })
        })
    })
    
    describe("failure", () => {
        describe.each([
            {
                a: [{id: 1, name: "One"}, {id: 2, name: "Two"}, {id: 3, name: "One"}],
                desc: "Duplicate keys"
            }
        ])(
            "$desc", ({a}) => {

                it("throws error", () => {                    
                    expect(() => inverseDataMap(a, f)).toThrow(Error)
                })
        })
    })
})

describe("inverseIndexDuplicatesMap", () => {
    function f(data: {id: number, name: string}){return data.name}
    
    type TestData = {id: number, name: string}

    type TestInput = {
        a: TestData[]
        desc: string,
        expected: [string, Set<number>][]
    }
    
    describe("happy", () => {
        describe.each<TestInput>([
            {
                a: [{id: 1, name: "One"}, {id: 2, name: "Two"}, {id: 3, name: "One"}],
                desc: "Multiple values",
                expected: [["One", new Set([0,2])]]
            }
        ])(
            "$desc", ({a, expected}) => {

                it("has expected mappings", () => {
                    //Arrange
                    const expectedMap = new Map<string, Set<number>>(expected)
                    
                    //Act
                    const actual = inverseIndexDuplicatesMap(a, f)

                    //Assert
                    expect(actual).toEqual(expectedMap)
                })
        })
    })
})

describe("inverseIndexSetMap", () => {
    function f(data: {id: number, name: string}){return data.name}
    
    type TestData = {id: number, name: string}

    type TestInput = {
        a: TestData[]
        desc: string,
        expected: [string, Set<number>][]
    }
    
    describe("happy", () => {
        describe.each<TestInput>([
            {
                a: [{id: 1, name: "One"}, {id: 2, name: "Two"}, {id: 3, name: "One"}],
                desc: "Multiple values",
                expected: [["One", new Set([0,2])], ["Two", new Set([1])]]
            }
        ])(
            "$desc", ({a, expected}) => {

                it("has expected mappings", () => {
                    //Arrange
                    const expectedMap = new Map<string, Set<number>>(expected)
                    
                    //Act
                    const actual = inverseIndexSetMap(a, f)

                    //Assert
                    expect(actual).toEqual(expectedMap)
                })
        })
    })
})