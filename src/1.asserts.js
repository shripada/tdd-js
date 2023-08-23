import assert from 'assert'
let x = 10
assert(x === 10, 'After assigning 10 to x, x must be 10')
let y = x
y = 100
assert(
  y === 100,
  'Y must be 100 as there is an explicit assignment of 100 to it',
)

assert.equal(x, 10, 'x must be 10')

/**
 * Checks if the passed in string is a palindrome
 * @param {string} string to check
 * @returns true if the string is palindrome, false otherwise
 */
function isPalindrome(string) {
  // precondition
  assert(typeof string === 'string')

  // TODO: refactor the reversing logic into its own function and implement it in TDD using seperate asserts.
  let reversed = '' //undefined
  //   for (let ch of string) {
  //     reversed += ch
  //   }
  for (let i = string.length - 1; i >= 0; i--) {
    reversed += string[i]
  }
  if (reversed === string) {
    return true
  }
  return false
}

// empty string is a palindrome
assert(isPalindrome(''), 'Empty string is a palindrome')
// a string that is not a palindrome
assert(isPalindrome('abc') === false, 'abc is not a palindrome')
// a string is palindrome
assert(isPalindrome('racecar') === true, 'racecar is a palindrome')
// a lengthy palindrome
assert(isPalindrome('11111111111111111111') === true, 'a lengthy palindrome')
// passing a wrong type must throw an error
assert.throws(
  () => isPalindrome(13),
  'Passing a non string argument must throw',
)

// TODO: implement a function decimalToBinary, which converts a given decimal number to binary representation (in string format)
// with TDD approach.  Some examples of dec to binary transforms: 10 -> 1010  0  -> 0  4 -> 100
