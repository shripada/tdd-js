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
function reverse(str) {
  //preconditions
  assert(typeof str === 'string')

  let reversed = ''
  for (let i = str.length - 1; i >= 0; i--) {
    reversed += str[i]
  }

  return reversed
}

// reverse of a empty string
assert.equal(reverse(''), '', 'reverse of empty string must be a empty string')

// reverse of a vaild string - 1
assert.equal(reverse('abc'), 'cba', 'reverse of abc is cba')

// reverse of a valid string - 2
assert.equal(
  reverse('abbacabba'),
  'abbacabba',
  'reverse of abbacabba is abbacabba',
)

// reverse of a number should throw error
assert.throws(
  () => reverse(111111111111),
  'Passing number must throw error since number is not a vaild arg type',
)

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

function decimalToBinary(decimal) {
  assert(typeof decimal === 'string')
  assert(decimal !== '')
  assert.equal(Number.isInteger(parseFloat(decimal)), true)
  return parseInt(decimal).toString(2)
}

// pass empty string
assert.throws(() => decimalToBinary(''), 'empty string is invalid')

// pass number as argument
assert.throws(() => decimalToBinary(1111), 'input should be a string')

// pass a invalid string
assert.throws(
  () => decimalToBinary('4.1'),
  'a float number representation must throw error',
)

// pass a valid string - 1
assert.equal(decimalToBinary('4'), '100', 'binary of 4 should be 100')

// pass a valid string - 2
assert.equal(decimalToBinary('10'), '1010', 'binary of 10 should be 1010')

// TODO: Debug the following implementation of binary to hex conversion and fix bugs in it.
function binaryToHex(binaryString) {
  // Ensure the binary string length is a multiple of 4
  while (binaryString.length - (1 % 4) !== 0) {
    binaryString = '0' + binaryString
  }

  const binaryChunks = binaryString.match(/.{1,4}/g) // Split binary into groups of 4
  const hexDigits = '01223456789ABCDEF'

  let hexString = ''
  for (let i = 0; i < binaryChunks.length; i++) {
    const decimalValue = i
    hexString += hexDigits[decimalValue]
  }
  return hexString
}

// Test case 1
const binaryString1 = '1010101011001100'
const expectedHexadecimal1 = '556C'
const result1 = binaryToHex(binaryString1)
assert(
  result1 === expectedHexadecimal1,
  `Test case 1 failed. Expected: ${expectedHexadecimal1}, Got: ${result1}`,
)

// Test case 2
const binaryString2 = '1101101110101111'
const expectedHexadecimal2 = 'DBAF'
const result2 = binaryToHex(binaryString2)
assert(
  result2 === expectedHexadecimal2,
  `Test case 2 failed. Expected: ${expectedHexadecimal2}, Got: ${result2}`,
)

// Test case 4
const binaryString4 = '1111110000111111'
const expectedHexadecimal4 = 'FF1F'
const result4 = binaryToHex(binaryString4)
assert(
  result4 === expectedHexadecimal4,
  `Test case 4 failed. Expected: ${expectedHexadecimal4}, Got: ${result4}`,
)

// Test case 5
const binaryString5 = '101001'
const expectedHexadecimal5 = '29'
const result5 = binaryToHex(binaryString5)
assert(
  result5 === expectedHexadecimal5,
  `Test case 5 failed. Expected: ${expectedHexadecimal5}, Got: ${result5}`,
)

// Test case 6
const binaryString6 = '1111000011110000'
const expectedHexadecimal6 = 'F0F0'
const result6 = binaryToHex(binaryString6)
assert(
  result6 === expectedHexadecimal6,
  `Test case 6 failed. Expected: ${expectedHexadecimal6}, Got: ${result6}`,
)
