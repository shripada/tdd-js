import movieData from './movies.json';
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
        let newArr = [...arr]
        return newArr.map((index) => fibonacci(index))
    }


    expect(indexToFibValue([2, 1, 5, 7])).toEqual([1, 1, 5, 13])
    expect(indexToFibValue([1, 2, 3, 4])).toEqual([1, 1, 2, 3])


    //2nd Assignment Question

    function convertAvgTempToFar(temp) {
        return parseFloat(((temp * (9 / 5)) + 32).toFixed(2))
    }

    function averageTemperatureToFahrenheit(ArrOfobj) {
        let newArr = [...ArrOfobj]
        return newArr.map((obj) => {
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

    //1st Question
    //  Write a Higher Order function(HOF):
    //  function createCutOff(cutOffValue)
    // This function should return, another function which takes a number as its argument and should return if the number is within cutoff value that it closes over its containing function.

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

    //2nd Question
    //Transform the  array such that in each item, we re arrange ‘CraftCode’ with ‘CodeCraft’.

    function changeCraftCodeToCodeCraft(arr) {
        let newArr = [...arr]
        return newArr.map((str) => str.replace("CraftCode", "CodeCraft"))
    }

    expect(changeCraftCodeToCodeCraft(["CraftCode is a nice company", "We love CraftCode", "We are working in CraftCode", "Where is CraftCode?"])).toEqual(["CodeCraft is a nice company", "We love CodeCraft", "We are working in CodeCraft", "Where is CodeCraft?"])

    //3rd Question
    //We have the following text, We need to actually filter out all lines that do not contain 4.  And then for each quantity we want to add 10. 

    function filterAndModifyPurchaseLines(str) {

        const filteredPurchase = str.split('\n').filter((item, index) => {
            if (index == 0) return false
            return !item.includes("4")
        })
        const modifiedPurchase = filteredPurchase.map(line => {
            const [item, qty] = line.split(' ');
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

    //4th Question
    //In the array given below, filter out all strings that contain  either ‘u’ or ‘g’.

    function filterStringNotContatingUOrG(arr) {
        let newArr = [...arr]
        return newArr.filter((str) => !str.includes("u") && !str.includes("g"))
    }

    expect(filterStringNotContatingUOrG(["umbrella", "name", "gang"])).toEqual(["name"])
    expect(filterStringNotContatingUOrG(['browl', 'faaast', 'energy', 'stand', 'eat', 'lunch'])).toEqual(['browl', 'faaast', 'stand', 'eat'])

    //5th Question
    //For the given input array, filter all elements that start with mang or end with fy

    function filterArray(arr) {
        let newArr = [...arr]
        return newArr.filter((str) => /^mang|fy$/.test(str));
    }

    expect(filterArray(["mango", "apple", "cherry", "modify", "satisfy"])).toEqual(['mango', 'modify', 'satisfy'])
    expect(filterArray(['mangalore', 'semangin', '2 lonely', 'verify', 'rectify', 'mangala', 'notifyy'])).toEqual(['mangalore', 'verify', 'rectify', 'mangala'])

    //6th Question
    //We want to add 10 to each number in an array of given numbers, and then filter out those that can be divided by 4.

    function add10AndFilter(arr) {
        let newArr = [...arr]
        return newArr
            .map((num) => num + 10)
            .filter((num) => num % 4 === 0)
    }

    expect(add10AndFilter([34, 45, 2, 53, 84, 542, 31, 23])).toEqual([44, 12, 552])

    //7th Question
    //For the given array of indices, we need to return an array containing fibonacci numbers at those indices

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
        let newArr = [...arr]
        return newArr.map((index) => fibonacci(index))
    }


    expect(indexToFibValue([2, 1, 5, 7])).toEqual([1, 1, 5, 13])
    expect(indexToFibValue([1, 2, 3, 4])).toEqual([1, 1, 2, 3])


    //8th Question
    //We want to extract all emails from the following array of strings.  Each string seems to be an address info, which also contains emails. Some addresses might miss the email. We need to ultimately have an array of emails where they are all in lowercase.

    function extractEmailID(arr) {
        let newArr = [...arr]
        return newArr
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

    //9th Question
    //For given obj get the list of ages.

    function getAges(arrayOfObj) {
        let newArrayOfObj = [...arrayOfObj]
        return newArrayOfObj.map((obj) => obj.age)
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

    //10th  Question
    //a)Can you find the food items that do not contain sugar here? // ["idli", “paneer masala”]

    function filterFoodNotContainSugar(foods) {
        let foodArr = [...foods]
        return foodArr
            .filter(food => !Object.values(food)[0].includes('sugar'))
            .map(food => Object.keys(food)[0])
    }

    //b)Food items that contain both chilli and oil ?  // ["pizza"]

    function filterFoodContainChilliAndOil(foods) {
        let foodArr = [...foods]
        return foodArr
            .filter(food => Object.values(food)[0].includes('chiili') && Object.values(food)[0].includes('oil'))
            .map(food => Object.keys(food)[0]);
    }

    //c)e need to also generate another array, that will have objects where key is the food name, and value will be  ‘safe’  or ‘unsafe’.   Foods that contain sugar are unsafe, rest are safe.

    function checkSafety(foods) {
        let foodArr = [...foods]
        return foodArr.map(food => {
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


    //11th Question
    //Find the second largest number in a given array first by using an imperative approach without using reduce. Use a forEach HOF to iterate over items and figure out the second largest item.
    //Also give a solution using reduce method.

    function findSecordLargest(arr) {
        if (arr.length < 2) throw new Error("Array length less than 2")
        let firstMax = arr[0]
        let secondMax = arr[0]
        arr.forEach(element => {
            if (element > firstMax) {
                secondMax = firstMax;
                firstMax = element;
            } else if (element > secondMax && element < firstMax) {
                secondMax = element;
            }
        });

        return secondMax;
    }


    expect(() => findSecordLargest([1])).toThrowError("Array length less than 2")
    expect(findSecordLargest([1, 2])).toBe(1)
    expect(findSecordLargest([1, 2, 1])).toBe(1)
    expect(findSecordLargest([10, 11, 23, 44, 55])).toBe(44)
    expect(findSecordLargest([10, 11, 12, 13, 14, 9, 11, 21])).toBe(14)
    expect(findSecordLargest([10, 11, 22, 21])).toBe(21)


    function findSecordLargestUsingReduce(arr) {
        let newArr = [...arr]
        if (arr.length < 2) throw new Error("Array length less than 2")
        let largest = Math.max(...arr)
        return newArr.reduce((secondLargest, currentValue) => {
            return currentValue < largest && currentValue > secondLargest ? currentValue : secondLargest
        }, -Infinity)
    }

    expect(() => findSecordLargestUsingReduce([1])).toThrowError("Array length less than 2")
    expect(findSecordLargestUsingReduce([1, 2])).toBe(1)
    expect(findSecordLargestUsingReduce([1, 2, 1])).toBe(1)
    expect(findSecordLargestUsingReduce([10, 11, 23, 44, 55])).toBe(44)
    expect(findSecordLargestUsingReduce([10, 11, 12, 13, 14, 9, 11, 21])).toBe(14)
    expect(findSecordLargestUsingReduce([10, 11, 22, 21])).toBe(21)

    //12th Question
    //Implement a method called as   some  that takes the array as its first argument, and a predicate as its second argument.  Predicate is a function that takes an item in the array as its argument, and returns a boolean.  some function will return true if at-least one item in the array passes the predicate, otherwise will return false. Give an imperative solution, and then give a solution using reduce. 
    //function some(items, predicate)

    function some(arr, predicate) {
        for (let num of arr) {
            if (predicate(num)) return true
        }
        return false
    }

    expect(some([1, 2, 3, 4], (num) => num % 2 === 0)).toBeTruthy()
    expect(some([1, 3, 5, 7], (num) => num % 2 === 0)).toBeFalsy()

    function someUsingReduce(arr, predicate) {
        let newArr = [...arr]
        return newArr.reduce((result, currentValue) => {
            if (predicate(currentValue)) return true
        }, false)
    }

    expect(someUsingReduce([1, 2, 3, 4], (num) => num % 2 === 0)).toBeTruthy()
    expect(someUsingReduce([1, 5, 3, 4], (num) => num % 2 === 0)).toBeTruthy()
    expect(someUsingReduce([1, 3, 5, 7], (num) => num % 2 === 0)).toBeFalsy()
    expect(someUsingReduce([1, 3, 5, 7, 9, 11], (num) => num % 2 === 0)).toBeFalsy()


    //13th Question
    //a)We want to get an object that will have keys as author names, and values will be an array of their quotes.  The sample output will look something like this:

    function authorAndTheirQuotes(arr) {
        let newArr = [...arr]
        return newArr.reduce((resultObj, currentObj) => {
            let result = { ...resultObj }
            if (!result.hasOwnProperty(currentObj.author)) {
                result[currentObj.author] = [currentObj.text]
            }
            else {
                result[currentObj.author].push(currentObj.text)
            }
            return result
        }, {})

    }

    let quotes = [
        {
            "text": "Genius is one percent inspiration and ninety-nine percent perspiration.",
            "author": "Thomas Edison"
        },
        {
            "text": "You can observe a lot just by watching.",
            "author": "Yogi Berra"
        },
        {
            "text": "To invent, you need a good imagination and a pile of junk",
            "author": "Thomas Edison"
        },
        {
            "text": "Difficulties increase the nearer we get to the goal.",
            "author": "Yogi Berra"
        },
        {
            "text": "Fate is in your hands and no one elses",
            "author": "Byron Pulsifer"
        },
        {
            "text": "Be the chief but never the lord.",
            "author": "Lao Tzu"
        },
        {
            "text": "Nothing happens unless first we dream.",
            "author": "Byron Pulsifer"
        },
        {
            "text": "Well begun is half done.",
            "author": "Aristotle"
        },
        {
            "text": "Life is a learning experience, only if you learn.",
            "author": "Yogi Berra"
        },
        {
            "text": "Self-complacency is fatal to progress.",
            "author": "Margaret Sangster"
        },
        {
            "text": "Peace comes from within. Do not seek it without.",
            "author": "Buddha"
        },
        {
            "text": "What you give is what you get.",
            "author": "Byron Pulsifer"
        },
        {
            "text": "We can only learn to love by loving.",
            "author": "Lao Tzu"
        },
        {
            "text": "Life is change. Growth is optional. Choose wisely.",
            "author": "Karen Clark"
        },
        {
            "text": "You'll see it when you believe it.",
            "author": "Buddha"
        }]



    expect(authorAndTheirQuotes(quotes)).toEqual({
        "Thomas Edison": [
            "Genius is one percent inspiration and ninety-nine percent perspiration.",
            "To invent, you need a good imagination and a pile of junk"
        ],
        "Yogi Berra": [
            "You can observe a lot just by watching.",
            "Difficulties increase the nearer we get to the goal.",
            "Life is a learning experience, only if you learn."
        ],
        "Byron Pulsifer": [
            "Fate is in your hands and no one elses",
            "Nothing happens unless first we dream.",
            "What you give is what you get."
        ],
        "Lao Tzu": [
            "Be the chief but never the lord.",
            "We can only learn to love by loving."
        ],
        "Buddha": [
            "Peace comes from within. Do not seek it without.",
            "You'll see it when you believe it."
        ],
        "Aristotle": [
            "Well begun is half done."
        ],
        "Margaret Sangster": [
            "Self-complacency is fatal to progress."
        ],
        "Karen Clark": [
            "Life is change. Growth is optional. Choose wisely."
        ]
    }
    )

    //b)A function getQuotesContainingWord(word). that will return an array of quotes (not the quote objects)  that contain the specified word. 

    function getQuotesContainingWord(arr, word) {
        let newArr = [...arr]
        return newArr.reduce((result, currentObj) => {
            let resultCopy = [...result]
            if (currentObj.text.includes(word)) {
                resultCopy.push(currentObj.text);
            }
            return resultCopy;
        }, []);
    }

    expect(getQuotesContainingWord(quotes, "Genius")).toEqual(["Genius is one percent inspiration and ninety-nine percent perspiration."])
    expect(getQuotesContainingWord(quotes, "the")).toEqual(["Difficulties increase the nearer we get to the goal.", "Be the chief but never the lord."])

    //c)Get the array of quote strings

    function getQuotes(arr) {
        let newArr = [...arr]
        return newArr.map((currentObj) => currentObj.text)
    }

    expect(getQuotes(quotes)).toEqual([
        "Genius is one percent inspiration and ninety-nine percent perspiration.",
        "You can observe a lot just by watching.",
        "To invent, you need a good imagination and a pile of junk",
        "Difficulties increase the nearer we get to the goal.",
        "Fate is in your hands and no one elses",
        "Be the chief but never the lord.",
        "Nothing happens unless first we dream.",
        "Well begun is half done.",
        "Life is a learning experience, only if you learn.",
        "Self-complacency is fatal to progress.",
        "Peace comes from within. Do not seek it without.",
        "What you give is what you get.",
        "We can only learn to love by loving.",
        "Life is change. Growth is optional. Choose wisely.",
        "You'll see it when you believe it."
    ]
    )


    //d)Array of all authors by removing any duplicates using reduce

    function getAuthors(arr) {
        let newArr = [...arr]
        return newArr.reduce((authors, currentObj) => {
            let authorsCopy = [...authors]
            if (!(authorsCopy.includes(currentObj.author))) {
                authorsCopy.push(currentObj.author)
            }
            return authorsCopy
        }, [])
    }

    expect(getAuthors(quotes)).toEqual([
        "Thomas Edison",
        "Yogi Berra",
        "Byron Pulsifer",
        "Lao Tzu",
        "Aristotle",
        "Margaret Sangster",
        "Buddha",
        "Karen Clark"
    ]
    )

    //14th Question

    let employees = [
        {
            "firstName": "Molly",
            "lastName": "Rojas",
            "age": 38,
            "email": "mollyrojas@plasmox.com",
            "salary": 3065
        },
        {
            "firstName": "Marguerite",
            "lastName": "Santiago",
            "age": 27,
            "email": "margueritesantiago@plasmox.com",
            "salary": 2796
        },
        {
            "firstName": "Evelyn",
            "lastName": "Oneil",
            "age": 26,
            "email": "evelynoneil@plasmox.com",
            "salary": 3947
        },
        {
            "firstName": "Consuelo",
            "lastName": "Case",
            "age": 23,
            "email": "consuelocase@plasmox.com",
            "salary": 2819
        },
        {
            "firstName": "Earline",
            "lastName": "Bush",
            "age": 29,
            "email": "earlinebush@plasmox.com",
            "salary": 3494
        },
        {
            "firstName": "Sanford",
            "lastName": "Hurley",
            "age": 26,
            "email": "sanfordhurley@plasmox.com",
            "salary": 3068
        },
        {
            "firstName": "Todd",
            "lastName": "Gomez",
            "age": 33,
            "email": "toddgomez@plasmox.com",
            "salary": 3906
        }
    ]


    //a)We want to find the total salary paid for employees whose age is less than 30.

    function totalSalaryPaidForAgeLessThan30(arr) {
        let employees = [...arr]
        return employees
            .filter((employee) => employee.age < 30)
            .reduce((totalSalary, currentEmployee) => {
                totalSalary = totalSalary + currentEmployee.salary
                return totalSalary
            }, 0)
    }

    expect(totalSalaryPaidForAgeLessThan30(employees)).toBe(16124)

    //b)Get the array of full-names of all employees. Full name is made up from first name and last name.

    function employeesFullName(arr) {
        let employees = [...arr]
        return employees.map(employee => employee.firstName + " " + employee.lastName)
    }

    expect(employeesFullName(employees)).toEqual(['Molly Rojas', 'Marguerite Santiago', 'Evelyn Oneil', 'Consuelo Case', 'Earline Bush', 'Sanford Hurley', 'Todd Gomez'])

    //c)Get a string that contains all email ids separated by comma.

    function emailString(arr) {
        let employees = [...arr]
        let emialArr = employees.map(employee => employee.email)
        return emialArr.join(",")
    }

    expect(emailString(employees)).toBe("mollyrojas@plasmox.com,margueritesantiago@plasmox.com,evelynoneil@plasmox.com,consuelocase@plasmox.com,earlinebush@plasmox.com,sanfordhurley@plasmox.com,toddgomez@plasmox.com")


    //16 Generate an array that contains first n natural numbers.  Then get us an object, that contains two keys, ‘odd’, and ‘even’.  Each of these keys will have values as  arrays of odd numbers and even numbers respectively.  How do you transform this result such that keys remain same, but values will be sums of odd numbers and even numbers?

    function first_N_NaturalNumbers(n) {
        let res = []
        for (let i = 1; i <= n; i++) {
            res.push(i)
        }
        return res
    }

    function oddEvenObject(arr) {
        let numbers = [...arr]
        return numbers.reduce((result, currentNum) => {
            let resultCopy={...result}
            currentNum % 2 === 0 ? result.even.push(currentNum) : result.odd.push(currentNum)
            return resultCopy
        }, { odd: [], even: [] })
    }

    function sumOfOddAndEven(obj) {
        let oddEvenObj = { ...obj }
        const oddSum = oddEvenObj.odd.reduce((sum, num) => sum + num, 0);
        const evenSum = oddEvenObj.even.reduce((sum, num) => sum + num, 0);

        oddEvenObj.odd = oddSum;
        oddEvenObj.even = evenSum;

        return oddEvenObj;
    }

    expect(first_N_NaturalNumbers(6)).toEqual([1, 2, 3, 4, 5, 6])
    expect(oddEvenObject(first_N_NaturalNumbers(6))).toEqual({ odd: [1, 3, 5], even: [2, 4, 6] })
    expect(sumOfOddAndEven(oddEvenObject(first_N_NaturalNumbers(6)))).toEqual({ odd: 9, even: 12 })

    //17.  Generate an array containing alphabets. Then produce an object that contain two keys, ‘vowels’ and 'consonants'. The values will be array of alphabets representing vowels and consonants.

    function generateAlphabhetArray() {
        const alphabetArray = [];
        for (let charCode = 97; charCode <= 122; charCode++) {
            const letter = String.fromCharCode(charCode);
            alphabetArray.push(letter);
        }
        return alphabetArray;
    }

    function vowelAndConsObject(arr) {
        let alphabetArray = [...arr]
        return alphabetArray.reduce((resultObj, currentAlphabhet) => {
            let result = { ...resultObj }
            if (/[aeiou]/.test(currentAlphabhet)) {
                result.vowels.push(currentAlphabhet)
            }
            else {
                result.consonants.push(currentAlphabhet)
            }
            return result
        }, { vowels: [], consonants: [] })
    }

    expect(generateAlphabhetArray()).toEqual(['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'])
    expect(vowelAndConsObject(generateAlphabhetArray())).toEqual({
        vowels: ['a', 'e', 'i', 'o', 'u'],
        consonants: [
            'b', 'c', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm',
            'n', 'p', 'q', 'r', 's', 't', 'v', 'w', 'x', 'y', 'z'
        ]
    }
    )

    //18.You need to embed this json in your program and load it and have the data in a variable for your use.  Write the following functions:

    // a) Get the array of all actor names  (cast) that are seen in the movies data.

    function getActors(data) {
        let movieList = [...data]
        return movieList.reduce((actorsList, movie) => {
            let actorsListCopy = [...actorsList]
             movie.cast.forEach((actor) => {
                if (!actorsListCopy.includes(actor)) actorsListCopy.push(actor)
            })
            return actorsListCopy
        }, [])
    }

    expect(getActors(movieData).length).toBe(2014)



    //b)Get an object with keys being year and values  being the array of names of movies released in the given year (consider only 3 at max). The format should be something like this:

    function getMovies(data) {
        let movieList = [...data]
        return movieList.reduce((resultObj, movie) => {
            let result = { ...resultObj }
            if (!result.hasOwnProperty(movie.year)) result[movie.year] = [movie.title]
            else {
                if (result[movie.year].length != 3) {
                    result[movie.year].push(movie.title)
                }
            }
            return result
        }, {})
    }

    expect(getMovies(movieData)).toEqual({
        "2017": ["The Book of Love", "Split", "xXx: Return of Xander Cage"],
        "2018": ["Insidious: The Last Key", "The Strange Ones", "Sweet Country"]
    })


    //19 Write the following string manipulation functions

    // a) trimLeading(str) Trims a string such that all leading whitespaces are removed.

    function trimLeading(str) {
        let leadingSpace = /^\s+/
        return str.replace(leadingSpace, "")

    }

    expect(trimLeading('    This is a string with leading spaces.')).toBe("This is a string with leading spaces.")
    expect(trimLeading('                               Hello   ')).toBe("Hello   ")


    // b)trimTrailing(str) this will trim whitespaces at the end of the string.

    function trimTrailing(str) {
        let trailingSpaces = /\s+$/
        return str.replace(trailingSpaces, "")
    }

    expect(trimTrailing("Hello      ")).toBe("Hello")
    expect(trimTrailing("Hello,      How Are you?     ")).toBe("Hello,      How Are you?")
    expect(trimTrailing("My name is xyz ?       ")).toBe("My name is xyz ?")

    //Write a function  singleSpace(str), that will replace multiple space characters between words in a string with single space and return the result.

    function singleSpace(str) {
        return str.replaceAll(/\s+/g, " ")
    }

    expect(singleSpace("Hi    Hello")).toBe("Hi Hello")
    expect(singleSpace("Hi    I    am    xyz    ")).toBe("Hi I am xyz ")

    //Use a compose or pipe mechanism to come up with a function  trim,  that composes the above functions.  Test it with some inputs.

    const compose =
        (...functions) =>
            (x) => {
                let accumulated = x
                for (let i = functions.length - 1; i >= 0; i--) {
                    const f = functions[i]
                    accumulated = f(accumulated)
                }
                return accumulated
            }


    let trim = compose(singleSpace, trimTrailing, trimLeading)
    expect(trim("     Hi        ")).toBe("Hi")
    expect(trim("     Hi Hello")).toBe("Hi Hello")
    expect(trim("Hi Hello      ")).toBe("Hi Hello")
    expect(trim("       My    name      is     xyz          ")).toBe("My name is xyz")
    expect(trim("       My name is xyz.What's ur name?                   ")).toBe("My name is xyz.What's ur name?")



























})