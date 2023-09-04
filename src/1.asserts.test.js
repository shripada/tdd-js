import assert from 'assert'
import {reverseString, isPalindrome} from './1.asserts.js'

function testReverseString() {
  assert.equal(
    reverseString(''),
    '',
    'Empty string when reversed must be empty',
  )
  assert.equal(
    reverseString('a'),
    'a',
    'A string with one char reversed must be that char only',
  )
  assert.equal(reverseString('ab'), 'ba', 'reverse(ab) must be `ba`')
  assert.equal(reverseString('abc'), 'cba', 'reverse(abc) must be `cba`')
  assert.equal(
    reverseString('abcdefghijklmnopqrstuvwxyz'),
    'zyxwvutsrqponmlkjihgfedcba',
    'reverse(abcdefghijklmnopqrstuvwxyz) must be `zyxwvutsrqponmlkjihgfedcba`',
  )
}

function testIsPalindrome() {
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
}

testReverseString()
testIsPalindrome()
