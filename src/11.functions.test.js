// Anatomy of a function in js
function doStuff() {
  // no args
  console.log('Hello world1')
}
doStuff()

function greet(person) {
  console.log('hello' + person)
}
greet('john')

function greetWithMessage(person, message) {
  console.log('Hello' + person + ',' + message)
}
greetWithMessage('john', 'welcome to js')

let globalMessage = ''
function greetWithMessageDefault(person, message = 'welcome to js') {
  console.log('Hello' + person + ',' + message)
  globalMessage = message
}
greetWithMessageDefault('john')

function greetFunny(person, message) {
  if (!message) {
    console.log(globalMessage)
  } else {
    greetWithMessage(person, message)
  }
}

greetFunny('Ram')

function add(...numbers) {
  let sum = 0
  for (let num of numbers) {
    sum += num
  }
  return sum
}

add(1, 2, 3, 4)

function firstAndRest(first, ...rest) {
  let sum = add(...rest) // Same as add(2,3,4)
  return sum * first
}

firstAndRest(1, 2, 3, 4)
