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
})
