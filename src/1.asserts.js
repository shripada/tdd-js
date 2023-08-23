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
 * This function reverses the given string
 * @param {string} str string to be reversed 
 * @returns the reversed version of input string
 */
function reverse(str){
  //preconditions
  assert(typeof str === 'string')

  let reversed = '';
  for (let i = str.length - 1; i >= 0; i--) {
    reversed += str[i];
  }

  return reversed
}

// reverse of a empty string
assert.equal(reverse(''), '', 'reverse of empty string must be a empty string')

// reverse of a vaild string - 1
assert.equal(reverse('abc'),'cba', 'reverse of abc is cba')

// reverse of a valid string - 2
assert.equal(reverse('abbacabba'), 'abbacabba', 'reverse of abbacabba is abbacabba')

// reverse of a number should throw error
assert.throws(() => reverse(111111111111), 'Passing number must throw error since number is not a vaild arg type')

/**
 * Checks if the passed in string is a palindrome
 * @param {string} string to check
 * @returns true if the string is palindrome, false otherwise
 */
function isPalindrome(string) {
  // precondition
  assert(typeof string === 'string')

  let reversed = reverse(string)
  
  return reversed === string

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
