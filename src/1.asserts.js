import assert from 'assert'

/**
 * Reverses the given string
 * @param {string} string
 * @returns reversed string
 */
function reverseString(string) {
  let reversed = ''
  for (let i = 0; i < string.length; i++) {
    reversed = string[i] + reversed
  }
  return reversed
}

/**
 * Checks if the passed in string is a palindrome
 * @param {string} string to check
 * @returns true if the string is palindrome, false otherwise
 */
function isPalindrome(string) {
  // precondition
  assert(typeof string === 'string')

  // TODO: refactor the reversing logic into its own function and implement it in TDD using seperate asserts.
  let reversed = reverseString(string)
  if (reversed === string) {
    return true
  }
  return false
}

export {reverseString, isPalindrome}
