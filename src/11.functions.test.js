// function doStuff() {
//   // no args
//   console.log('Hello world1') // I/O  is also a side effect.
// }
// doStuff()

// function greet(person) {
//   console.log('hello' + person)
// }
// greet('john')

// function greetWithMessage(person, message) {
//   console.log('Hello' + person + ',' + message)
// }
// greetWithMessage('john', 'welcome to js')

// let globalMessage = ''
// function greetWithMessageDefault(person, message = 'welcome to js') {
//   console.log('Hello' + person + ',' + message)
//   globalMessage = message
// }
// greetWithMessageDefault('john')

// function greetFunny(person, message) {
//   if (!message) {
//     console.log(globalMessage)
//   } else {
//     greetWithMessage(person, message)
//   }
// }
// globalMessage = 'blah'
// greetFunny('Ram')

// // Pure function
// // Always produces same output for given inputs
// // No side effects - no console writes, or inputs from user, no writes or reads from a shared state
// function add(...numbers) {
//   let sum = 0
//   for (let num of numbers) {
//     sum += num
//   }
//   return sum
// }

// add(1, 2, 3, 4) // 10

// function firstAndRest(first, ...rest) {
//   let sum = add(...rest) // Same as add(2,3,4)
//   return sum * first
// }

// firstAndRest(1, 2, 3, 4)

// function getFullName({firstName, lastName}) {
//   return firstName + lastName
// }

// getFullName('Steve', 'Jobs')
// getFullName({firstName: 'Steve', lastName: 'Jobs', company: 'Apple'})

// Math.random() // 0.43
// Math.random() // 0.8
// Math.random() // 0.1

// // Arrow functions are known as lambda functions
// const displayFullName = function (salutation) {
//   console.log(salutation + ' ' + this.firstName + ' ' + this.lastName)
// }

// // displayFullName()
// const student = {
//   firstName: 'Foo',
//   lastName: 'Bar',
//   displayFullName() {
//     const addSalutation = () => {
//       return 'Hi' + this.firstName + ' ' + this.lastName
//     }

//     console.log(addSalutation())
//     //console.log('Hi' + this.firstName + ' ' + this.lastName)
//   },
// }

// // student.displayFullName()
// // Each function Function.prototype
// displayFullName.apply(student, ['Mr'])
// displayFullName.call(student, 'Mr')
// const boundDisplayFullName = displayFullName.bind(student)
// boundDisplayFullName('Mrs')

// function double(num) {
//   return num * 2
// }

// const doubleArr = (num) => num * 2

test('recursive functions', () => {
  function foo(number) {
    // base conditions
    if (number === 0) {
      return
    }
    return foo(number - 1) // call self
  }

  const fooA = (number) => {
    // base conditions must be present
    // and some point of call sequence, these need to hit and we must
    // be stopping the recursion.
    if (number === 0) {
      return
    }
    return fooA(number - 1) // call self
  }

  foo(10)

  // factorial of a number
  // fact(0) : 1
  // fact(1) : 1 * fact(0)
  // fact(2) : 2 * fact(1)
  // fact (3) : 3 * fact(2)
  // fact (4) : 4 * 3 * 2 * fact(1)
  // fact (n) : n * fact(n-1)
  function fact(number) {
    // base conditions
    if (number === 0) {
      return 1
    }
    return number * fact(number - 1)
  }

  function factI(number) {
    if (number === 0) return 1

    let factorial = number
    for (let i = number - 1; i > 0; i--) {
      factorial = factorial * i
    }
    return factorial
  }

  // fib(0): 0
  // fib(1): 1
  // fib(2): fib(1) + fib(2)
  // fib(3): fib(2) + fib(1)
  // fib(4): fib(3) + fib(2)
  //
  // fib(n): fib(n-1) + fib(n-2)
  function fib(n) {
    if (n === 0) return 0
    if (n === 1) return 1

    return fib(n - 1) + fib(n - 2)
  }

  expect(fib(0)).toBe(0)
  expect(fib(1)).toBe(1)
  expect(fib(2)).toBe(1)
  expect(fib(3)).toBe(2)
  expect(fib(4)).toBe(3)
  expect(fib(5)).toBe(5)
  expect(fib(6)).toBe(8) // fib(5)  fib(4)

  // An iterative solution for fib
  function fibI(n) {
    const fibs = [0, 1]
    if (n === 0 || n === 1) {
      return fibs[n]
    }
    for (let i = 2; i <= n; i++) {
      fibs[i] = fibs[i - 1] + fibs[i - 2]
    }
    return fibs[n]
  }

  expect(fibI(0)).toBe(0)
  expect(fibI(1)).toBe(1)
  expect(fibI(2)).toBe(1)
  expect(fibI(3)).toBe(2)
  expect(fibI(4)).toBe(3)
  expect(fibI(5)).toBe(5)
  expect(fibI(6)).toBe(8) // fib(5)  fib(4)

  let timeStamp = performance.now() // Date.now()
  fib(40)
  let timeTaken = performance.now() - timeStamp
  console.log('Time taken by recursive fib', timeTaken)

  timeStamp = performance.now()
  fibI(40)
  timeTaken = performance.now() - timeStamp
  console.log('Time taken by iterative fib', timeTaken)

  // Attempt with a closure
  function createFib() {
    const cache = [0, 1]
    function fibInternal(n) {
      if (cache[n]) {
        return cache[n]
      } else {
        for (let i = 2; i <= n; i++) {
          if (cache[i] === undefined) {
            // compute only if not found in cache
            cache[i] = cache[i - 1] + cache[i - 2]
          }
        }
        return cache[n]
      }
    }
    return fibInternal
  }
  const fibC = createFib()

  expect(fibC(0)).toBe(0)
  expect(fibC(1)).toBe(1)
  expect(fibC(2)).toBe(1)
  expect(fibC(3)).toBe(2)
  expect(fibC(4)).toBe(3)
  expect(fibC(5)).toBe(5)
  expect(fibC(6)).toBe(8) // fib(5)  fib(4)

  // We need to pass the cache to the function
  function fibMemoized(n, cache) {
    if (n === 0 || n === 1) {
      return cache[n]
    }

    if (cache[n]) {
      return cache[n]
    }

    for (let i = 2; i <= n; i++) {
      if (!cache[i]) {
        cache[i] = cache[i - 1] + cache[i - 2]
      }
    }
    return cache[n]
  }
  const cache = [0, 1]
  //   fibMemoized(6, cache)
  //   fibMemoized(7, cache)

  timeStamp = performance.now()
  fibMemoized(40, cache)
  timeTaken = performance.now() - timeStamp

  console.log('Memoized version of fib', timeTaken)

  timeStamp = performance.now()
  fibMemoized(40, cache)
  timeTaken = performance.now() - timeStamp

  console.log('Memoized version of fib again with same input 40', timeTaken)
})

test('closure mechanism - point free functions', () => {
  // A function that takes atleast one function argument or return a function as return value
  // is known as Higher order function.
  const adder = (delta) => {
    return (quantity) => quantity + delta
  }

  // when we invoke the adder with a delta, we get back a function, that has binding to the passed in delta
  const add2 = adder(2) // add2 still has link to the scope it was created
  expect(typeof add2).toBe('function')
  expect(add2(100)).toBe(102)
  expect(add2(3)).toBe(5)

  // The way of creating new functions via such higher order functions is known as point free functions.
  // create another point free function add100
  const add100 = adder(100) //add100 is a point free function.
  expect(add100(100)).toBe(200)

  // another example of higher order function, this time we pass a function to higher order function
  const multiAdder = (initialValue, ...adders) => {
    let final = initialValue
    adders.forEach((adder) => (final = adder(final))) // forEach is an inbuilt HOF, as it takes a callback function as its arg
    return final
  }

  expect(multiAdder(10, add2, add100)).toBe(112)

  // Closures often used to protect private data
  const createCounter = () => {
    let count = 0

    return {
      increment(value = 1) {
        // these methods by close over the count variable in the containing lexical scope.
        count += value
        return this // Nice trick to return ref to the this, so that these calls can be chained.
      },
      decrement(value = 1) {
        count -= value
        return this
      },
      reset() {
        count = 0
        return this
      },

      // only way to access count. Observe, there is no setter as we don't want someone to modify it.
      get count() {
        return count
      },
    }
  }
  const counter = createCounter()
  // observe there is no way for outsiders to access the count variable defined inside createCounter
  expect(counter.increment().count).toBe(1)
  expect(counter.increment(5).count).toBe(6)
  expect(counter.decrement().count).toBe(5)
  expect(counter.decrement(2).count).toBe(3)
  // Should not be able to set count as is not accessible
  expect(() => (counter.count = 10)).toThrow(
    'Cannot set property count of #<Object> which has only a getter',
  )
})

test('curried functions and partial application', () => {
  // Curried function is a function that takes one argument and returns another function that
  // takes yet another function and so on, until all args are considered. The last function that
  // is returned will actually operate on all arguments passed and return the result.

  // a normal function that adds 4 numbers
  const add = (a, b, c, d) => {
    return a + b + c + d
  }

  // The curried version is here
  const addC = (a) => {
    return (b) => {
      return (c) => {
        return (d) => {
          return a + b + c + d
        }
      }
    }
  }

  // Curried functions enable partial application of functions and allow us to
  // create new functions in point free style.
  const add2 = addC(2) // arg 2 is fixed now, thus add2 is a partially applied function
  const add2res = add2(3)(4)(5)
  expect(add2res).toBe(14)

  const add23 = add2(3) // 2 and 3 are fixed in add23 now via closure mechanism, thus add23 is partially applied.
  const add23ans = add23(4)(5)
  expect(add23ans).toBe(14)

  // Partial applications are a powerful mechanism to abstract out the fixed invocations and allow creating
  // point free functions that know the fixed args, and users of these need to pass the changing argument.
  // logLevels can be DEBUG, INFO, WARNING
  const log = (logLevel, moduleName, message) => {
    const logged = `${logLevel}: ${moduleName}: ${message}`
    console.log(logged)
    return logged
  }
  // Now to create a debugLog to fix logLevel as DEBUG, all that we need to do first is come up with a curried version of the log
  // and then do a partial application to apply debug level
  const logC = (logLevel) => {
    return (moduleName) => {
      return (message) => {
        return log(logLevel, moduleName, message)
      }
    }
  }
  const debugLog = logC('DEBUG')
  expect(typeof debugLog).toBe('function')
  const debugLogMath = debugLog('Math') // We could easily create debugLogMath using partial application.
  expect(debugLogMath('some log message')).toBe('DEBUG: Math: some log message')
})

test('function composition and piping', () => {
  // curried functions make creating compositions of functions a breeze.
  const double = (x) => x * 2 // take only one param
  const increment = (x) => x + 1 // takes only one param

  const incrementAndDouble = (x) => double(increment(x))
  const doubleDouble = (x) => double(double(x))

  // We can create a special utility function called compose, which will help us to create composition of two functions
  // the pre condition for compose is f: a -> b, g: c -> a, basically f should be accepting what g is producing.
  let compose = (f, g) => (x) => f(g(x))

  // lets recreate the above functions, using now compose
  let incrementAndDoubleC = compose(double, increment) //order of functions is reverse, please note
  let doubleDoubleC = compose(double, double)

  expect(incrementAndDouble(10)).toBe(incrementAndDoubleC(10)).toBe(22)
  expect(doubleDouble(10)).toBe(doubleDoubleC(10)).toBe(40)

  // But we don't need to stop at composing just 2 functions, we can do better.
  // how about composing functions within an array?
  compose =
    (...functions) =>
    (x) => {
      let accumulated = x
      for (let i = functions.length - 1; i >= 0; i--) {
        const f = functions[i]
        accumulated = f(accumulated)
      }
      return accumulated
    }
  incrementAndDoubleC = compose(double, increment)
  doubleDoubleC = compose(double, double)
  expect(incrementAndDoubleC(10)).toBe(incrementAndDoubleC(10)).toBe(22)
  expect(doubleDouble(10)).toBe(doubleDoubleC(10)).toBe(40)

  // Sometimes debugging a chain of compositions might be challenging.
  // But it is easy to plug a simple logger function (curried version)
  // as we need to fix some labels for better context during logging.
  const log = (label) => (message) => {
    console.log(label + ': ' + message)
    return message
  }
  const afterIncrement = log('after increment')
  const afterDouble = log('after double')
  const incrementAndDoubleWithLog = compose(
    afterDouble,
    double,
    afterIncrement,
    increment,
  )
  expect(incrementAndDoubleWithLog(10)).toBe(22)

  // One thing you might have noticed so far with compose is its applying functions from right
  // to left. It would be cool to have a HOF, which is similar to compose, but applying functions
  // from left to right. And this is known as Pipe.

  const pipe =
    (...functions) =>
    (x) => {
      let accumulated = x
      for (let i = 0; i < functions.length; i++) {
        const f = functions[i]
        accumulated = f(accumulated)
      }
      return accumulated
    }

  let incrementAndDoubleP = pipe(increment, double)
  let doubleDoubleP = pipe(double, double)
  expect(incrementAndDoubleP(10)).toBe(22)
  expect(doubleDoubleP(10)).toBe(40)
})

test('mapping - transforming one collection into another', () => {
  // Lets start with couple of these problems:
  // 1. squaring an array of numbers
  // 2. Extracting full names of students
  function square(numbers) {
    const squareOf = (x) => x * x
    const result = []
    for (let num of numbers) {
      result.push(squareOf(num))
    }
    return result
  }
  expect(square([1, 2, 3])).toEqual([1, 4, 9])

  const students = [
    {
      firstName: 'John',
      lastName: 'Doe',
      courses: ['Mathematics', 'English', 'History'],
    },
    {
      firstName: 'Jane',
      lastName: 'Smith',
      courses: ['Science', 'Art', 'Physical Education'],
    },
    {
      firstName: 'Alice',
      lastName: 'Johnson',
      courses: ['Computer Science', 'Spanish', 'Music'],
    },
    // Add more student objects as needed
  ]

  const fullNames = (students) => {
    const result = []
    const fullName = (student) => student.firstName + ' ' + student.lastName
    for (let student of students) {
      result.push(fullName(student))
    }
    return result
  }

  expect(fullNames(students)).toEqual([
    'John Doe',
    'Jane Smith',
    'Alice Johnson',
  ])

  // It is clear that there is a fixed common algorithm involved here.
  // What really changes is the transformation function. In the first case it was
  // number to its square, and in the second case, it was from student to his full name
  // General theme is transforming a given array into another without mutating the original.

  // Let us try to now encapsulate such a function, where we will code the common algorithm,
  // the thing that changes( transform) will be passed as a callback.
  // transform will take an item in array and transform it to another value.
  const map = (array, transform) => {
    const result = []
    for (let item of array) {
      result.push(transform(item))
    }
    return result
  }

  // Square using map
  let transform = (item) => item * item
  expect(map([1, 2, 3], transform)).toEqual([1, 4, 9])

  // full names using map
  let fullName = (student) => student.firstName + ' ' + student.lastName
  expect(map(students, fullName)).toEqual([
    'John Doe',
    'Jane Smith',
    'Alice Johnson',
  ])

  // It would be cool if we could have this map part of array itself.
  // then we could call it like students.map(fullName)
  // We can do this by adding this as a method on Array.prototype
  Array.prototype['map'] = function (transform) {
    const result = []
    for (let item of this) {
      result.push(transform(item))
    }
    return result
  }
  expect(students.map(fullName)).toEqual([
    'John Doe',
    'Jane Smith',
    'Alice Johnson',
  ])

  // But thanks to Array.prototype, it already has such method with same name, and we dont need
  // to implement one 😀. Just comment the above extending and the following expect should still
  // work.
  expect(students.map(fullName)).toEqual([
    'John Doe',
    'Jane Smith',
    'Alice Johnson',
  ])

  // A puzzle, now let us say that, we need to prefix the college name to all student's full name.
  // lets assume that all students belong to the college 'Trinity'. But however, the college name is
  // not available in student's objects. This will need to be supplied to transform function somehow.
  // we don't want separate transform functions to be handcoded for different college names.
})

test('filtering elements in a collection', () => {
  // it is a most recurring problem that we should be able to filter
  // out items in an array satisfying a criteria

  // Lets look at couple of such examples.
  // 1. filtering all odd numbers in an array of numbers
  function filterOddNums(numbers) {
    let result = []
    let isOdd = (num) => num % 2
    for (let num of numbers) {
      if (isOdd(num)) {
        result.push(num)
      }
    }
    return result
  }
  expect(filterOddNums([1, 2, 3, 4])).toEqual([1, 3])

  //2. Filtering all students scoring more than 80 marks
  const students = [
    {
      firstName: 'John',
      lastName: 'Doe',
      score: 86,
    },
    {
      firstName: 'Jane',
      lastName: 'Smith',
      score: 75,
    },
    {
      firstName: 'Alice',
      lastName: 'Johnson',
      score: 92,
    },
    {
      firstName: 'Bob',
      lastName: 'Brown',
      score: 78,
    },
    {
      firstName: 'Eva',
      lastName: 'Williams',
      score: 95,
    },
    {
      firstName: 'Michael',
      lastName: 'Davis',
      score: 88,
    },
    {
      firstName: 'Olivia',
      lastName: 'Garcia',
      score: 70,
    },
    {
      firstName: 'William',
      lastName: 'Jones',
      score: 89,
    },
    {
      firstName: 'Sophia',
      lastName: 'Wilson',
      score: 91,
    },
    {
      firstName: 'Daniel',
      lastName: 'Martinez',
      score: 82,
    },
    // Add more student objects with their respective scores
  ]

  function filterStudentsScoringGreaterThan80(students) {
    let result = []
    let isScoreGreaterThan80 = (student) => student.score > 80
    for (let student of students) {
      if (isScoreGreaterThan80(student)) {
        result.push(student)
      }
    }
    return result
  }
  expect(filterStudentsScoringGreaterThan80(students))
})
