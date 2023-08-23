---
marp: true
theme:
paginate: true
---

## Testing a function - old school method

Lets consider a very simple function that adds two given numbers and returns the sum.

```javascript
function isPrime(number) {
  // TODO: need to be implemented
  return true;
}
const num = prompt('Please enter the number);
const isNumPrime = isPrime(num)
console.log(num, ':', isNumPrime);
```

A way that many books teach to test your code, is to prompt the user to enter required params, and then invoke the said method. And then manually inspecting the output to check if it is behaving correctly.

---

## Question - what is wrong with this approach?

---

- There is no guarantee that user enters good test data
- Manual inspection is error prone
- To test with different input values, we need to run the program repeatedly
- With many functions, this method testing becomes impractical as it requires constant human intervention

---

## Solution?

---

## Test Driven Development

- Write tests first
- tests are piece of code that will help setup the invariant or conditions that needs to be satisfied by the function
- tests can automatically tell us for what input values,the function works, and for which inputs it does not work as expected
- Enumerating all tests help understand the function better
- removes all sort of manual inspection and unwanted usage of I/O for testing.

---

## Welcome to `assert`

`assert` is a powerful family of functions specifically designed for testing invariants (the conditions that need to hold good)
This helps us to automate the boring manual testing but with great accuracy

---

`assert` is a function which takes a boolean expression and an optional assertion message that explains the test.
We can handcode an assert ourselves:

```javascript
function assert(boolExpression, optionalMessage = '') {
  if (boolExpression === false) {
    throw `Assertion: ${optionalMessage} failed`;
  }
}
```

We can use the assert we wrote, to automate testing of a function.

```javascript
function add(a, b) {
  return a - b; // Wrong logic
}

let expected = 8;
assert(expected === add(3, 5), '3 plus 5 must be 8'); // throws exception as the logic is improper
// if we correct the logic and rerun, the assert goes silent
expected = 1;
assert(expected === add(0, 1), '0 plus 1 must be 1');
```

---

Good news is that we dont need to handcode such `assert` ourselves. We get a family of powerful assertions in language libraries or external packages.
In JavaScript, with `node`, we have a inbuilt module called `assert` itself.

```javascript
import assert from `assert`
function add(a, b) {
  return a - b; // Wrong logic
}
assert(expected === add(3, 5), '3 plus 5 must be 8'); // using the library's version of assert now
```

---

## Preconditions

Preconditions check whether the inputs received are valid. If they are ivalid, we want to throw an exception and let the world know about this.
For example, in our add function, both inputs a, and b must be of type number. This can be expressed as an assert.

```javascript
function add(a, b) {
  assert(typeof a === 'number' && typeof b === 'number');
  return a - b; // Wrong logic
}
```

---

## Post conditions

Post conditions are those invariants that need to hold good after the function is invoked with given parameters. Our expectations after a function is run are post conditions. We already have expressed few post conditions for the `add` function.
Post conditions need to be identified such that a wide range of inputs are covered are tested to generate expected output.

```javascript
function isPrime(number) {
  assert(typeof number === 'number'); // pre condition
  let isNumPrime = false;
  // logic here for checking if number is prime
  return isNumPrime;
}

// Post conditions
assert(isPrime(0) === false, '0 is not prime');
assert(isPrime(1) === false, '1 is not prime');
assert(isPrime(2) === true, '2 is a prime');
assert(isPrime(3) === true, '3 is a prime');
assert(isPrime(4) === false, '4 is not a prime');
```

---
