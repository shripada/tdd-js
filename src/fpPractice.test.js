test("Test: FP Assignment Quesions", () => {

    //1st Assingmnet question
    function fibonacci(n) {
        const fibs = [0, 1]
        function fibInternal(n) {
            if (fibs[n]) {
                return fibs[n]
            } else {
                for (let i = 2; i <= n; i++) {
                    fibs[i] = fibs[i - 1] + fibs[i - 2]
                }
                return fibs[n]
            }
        }
        return fibInternal(n)
    }

    function indexToFibValue(arr) {
        return arr.map((index) => fibonacci(index))
    }


    expect(indexToFibValue([2, 1, 5, 7])).toEqual([1, 1, 5, 13])
    expect(indexToFibValue([1, 2, 3, 4])).toEqual([1, 1, 2, 3])


    //2nd Assignment Question

    function convertAvgTempToFar(temp) {
        return parseFloat(((temp * (9 / 5)) + 32).toFixed(2))
    }

    function averageTemperatureToFahrenheit(ArrOfobj) {
        return ArrOfobj.map((obj) => {
            let fahrenheit = convertAvgTempToFar(obj.averageTemperature)
            obj.averageTemperature = fahrenheit
            return obj
        })

    }


    const poiArray = [
        {
            placeName: "Paris",
            famousFor: "Eiffel Tower",
            averageTemperature: 15.6
        },
        {
            placeName: "New York City",
            famousFor: "Statue of Liberty",
            averageTemperature: 12.8
        },
        {
            placeName: "Tokyo",
            famousFor: "Sushi",
            averageTemperature: 16.2
        },
        {
            placeName: "Rio de Janeiro",
            famousFor: "Carnival",
            averageTemperature: 24.5
        },
        {
            placeName: "Sydney",
            famousFor: "Sydney Opera House",
            averageTemperature: 21.3
        },
        {
            placeName: "Cairo",
            famousFor: "Pyramids of Giza",
            averageTemperature: 25.7
        },
        {
            placeName: "Rome",
            famousFor: "Colosseum",
            averageTemperature: 19.8
        },
        {
            placeName: "Cape Town",
            famousFor: "Table Mountain",
            averageTemperature: 17.2
        },
        {
            placeName: "Bali",
            famousFor: "Beaches",
            averageTemperature: 27.9
        },
        {
            placeName: "Machu Picchu",
            famousFor: "Inca Ruins",
            averageTemperature: 14.1
        }
    ];


    expect(averageTemperatureToFahrenheit(poiArray)).toEqual(
        [
            {
                placeName: "Paris",
                famousFor: "Eiffel Tower",
                averageTemperature: 60.08
            },
            {
                placeName: "New York City",
                famousFor: "Statue of Liberty",
                averageTemperature: 55.04
            },
            {
                placeName: "Tokyo",
                famousFor: "Sushi",
                averageTemperature: 61.16
            },
            {
                placeName: "Rio de Janeiro",
                famousFor: "Carnival",
                averageTemperature: 76.10
            },
            {
                placeName: "Sydney",
                famousFor: "Sydney Opera House",
                averageTemperature: 70.34
            },
            {
                placeName: "Cairo",
                famousFor: "Pyramids of Giza",
                averageTemperature: 78.26
            },
            {
                placeName: "Rome",
                famousFor: "Colosseum",
                averageTemperature: 67.64
            },
            {
                placeName: "Cape Town",
                famousFor: "Table Mountain",
                averageTemperature: 62.96
            },
            {
                placeName: "Bali",
                famousFor: "Beaches",
                averageTemperature: 82.22
            },
            {
                placeName: "Machu Picchu",
                famousFor: "Inca Ruins",
                averageTemperature: 57.38
            }
        ]
    )




})



test("Test:Functional Programming Coding Challenges", () => {

    //1st
    function createCutOff(cutOffValue) {
        return function (mark) {
            if (mark >= cutOffValue) {
                return true
            }
            return false
        }
    }
    const cutOff100 = createCutOff(100)
    expect(cutOff100(100)).toBe(true)
    expect(cutOff100(101)).toBe(true)
    expect(cutOff100(120)).toBe(true)
    expect(cutOff100(80)).toBe(false)
    expect(cutOff100(90)).toBe(false)

    //2nd
    function changeCraftCodeToCodeCraft(arr) {
        return arr.map((str) => str.replace("CraftCode", "CodeCraft"))
    }

    expect(changeCraftCodeToCodeCraft(["CraftCode is a nice company", "We love CraftCode", "We are working in CraftCode", "Where is CraftCode?"])).toEqual(["CodeCraft is a nice company", "We love CodeCraft", "We are working in CodeCraft", "Where is CodeCraft?"])

    //3rd
    function filterAndModifyPurchaseLines(str) {

        const filteredPurchase = str.split('\n').filter((item, index) => {
            if (index == 0) return false
            return !item.includes("4")
        })
        const modifiedPurchase = filteredPurchase.map(line => {
            const [item, qty] = line.trim().split(' ');
            const newQty = parseInt(qty) + 10;
            return `${item} ${newQty}`
        });

        return ['items qty', ...modifiedPurchase].join('\n');
    }
    const purchases = `items qty
    apple 24
    mango 50
    guava 42
    onion 31
    water 10`
    expect(filterAndModifyPurchaseLines(purchases)).toBe(`items qty
mango 60
onion 41
water 20`)

    //4th
    function filterStringNotContatingUOrG(arr) {
        return arr.filter((str) => !str.includes("u") && !str.includes("g"))
    }

    expect(filterStringNotContatingUOrG(["umbrella", "name", "gang"])).toEqual(["name"])
    expect(filterStringNotContatingUOrG(['browl', 'faaast', 'energy', 'stand', 'eat', 'lunch'])).toEqual(['browl', 'faaast', 'stand', 'eat'])

    //5th
    function filterArray(arr) {
        return arr.filter((str) => /^mang|fy$/.test(str));
    }

    expect(filterArray(["mango", "apple", "cherry", "modify", "satisfy"])).toEqual(['mango', 'modify', 'satisfy'])
    expect(filterArray(['mangalore', 'semangin', '2 lonely', 'verify', 'rectify', 'mangala', 'notifyy'])).toEqual(['mangalore', 'verify', 'rectify', 'mangala'])

    //6th
    function add10AndFilter(arr) {
        return arr
            .map((num) => num + 10)
            .filter((num) => num % 4 === 0)
    }

    expect(add10AndFilter([34, 45, 2, 53, 84, 542, 31, 23])).toEqual([44, 12, 552])

    //7th
    function fibonacci(n) {
        const fibs = [0, 1]
        function fibInternal(n) {
            if (fibs[n]) {
                return fibs[n]
            } else {
                for (let i = 2; i <= n; i++) {
                    fibs[i] = fibs[i - 1] + fibs[i - 2]
                }
                return fibs[n]
            }
        }
        return fibInternal(n)
    }

    function indexToFibValue(arr) {
        return arr.map((index) => fibonacci(index))
    }


    expect(indexToFibValue([2, 1, 5, 7])).toEqual([1, 1, 5, 13])
    expect(indexToFibValue([1, 2, 3, 4])).toEqual([1, 1, 2, 3])


    //8th
    function extractEmailID(arr) {
        return arr
            .map((str) => str.split(",")[2])
            .filter((str) => {
                if (str === undefined) return false
                return /(email:\s?)?[a-zA-Z]+\.[a-zA-Z]+/.test(str.trim())
            })
            .map((str) => {
                let splittedStr = str.split(":")
                if (splittedStr.length == 1) {
                    return splittedStr[0].trim().toLowerCase()
                } return splittedStr[1].trim().toLowerCase()
            })
    }

    let info = ["34, brighten street, email: BS@sft.com", "Behind hotel paragon, rode street, micHel@sun.it", "ulef court, cown street, email:cown@street", "Codecraft"]

    expect(extractEmailID(info)).toEqual(["bs@sft.com", "michel@sun.it"])

    //9th
    function getAges(arrayOfObj) {
        return arrayOfObj.map((obj) => obj.age)
    }


    const people = [
        {
            name: 'John',
            age: 13
        },
        {
            name: 'Mark',
            age: 56,
        },
        {
            name: 'Rachel',
            age: 45,
        },
        {
            name: 'Nate',
            age: 67,
        },
        {
            name: 'Jeniffer',
            age: 65,
        }
    ];
    expect((getAges(people))).toEqual([13, 56, 45, 67, 65])

    //10th
    function filterFoodNotContainSugar(foods) {
        return foods
            .filter(food => !Object.values(food)[0].includes('sugar'))
            .map(food => Object.keys(food)[0])
    }

    function filterFoodContainChilliAndOil(foods) {
        return foods
            .filter(food => Object.values(food)[0].includes('chiili') && Object.values(food)[0].includes('oil'))
            .map(food => Object.keys(food)[0]);
    }


    function checkSafety(foods) {
        return foods.map(food => {
            if (!Object.values(food)[0].includes('sugar')) {
                return { [Object.keys(food)[0]]: "safe" };
            } else {
                return { [Object.keys(food)[0]]: "unsafe" };
            }
        });
    }


    const foods = [
        { idli: ['rice', 'urad', 'oil', 'cashew', 'water'] },
        { chapathi: ['atta', 'gluten', 'water', 'oil', 'sugar'] },
        { pizza: ['maida', 'sugar', 'oil', 'chiili', 'flakes', 'sause'] },
        { 'paneer masala': ['paneer', 'onion', 'tomato', 'garlic', 'oil'] },
    ];

    expect(filterFoodNotContainSugar(foods)).toEqual(["idli", "paneer masala"])
    expect(filterFoodContainChilliAndOil(foods)).toEqual(["pizza"])
    expect(checkSafety(foods)).toEqual([{ "idli": "safe" }, { "chapathi": "unsafe" }, { "pizza": "unsafe" }, { "paneer masala": "safe" }])



})