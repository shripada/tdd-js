import {beforeEach, describe, expect, test} from 'vitest'
import {createStack, braceMatcher} from './5.stack.js'
describe('Stack tests', () => {
  let stack
  beforeEach(() => {
    stack = createStack()
    stack.push(1)
    stack.push(2)
    stack.push(3)
  })

  test('Test: creating Stack', () => {
    expect(stack).toBeDefined()
    expect(stack.length()).toBe(3)
  })

  test('Test: stack methods', () => {
    expect(stack.peek()).toBe(3)
    let popped = stack.pop()
    expect(popped).toBe(3)
    expect(stack.isEmpty()).toBe(false)
    stack.pop()
    stack.pop()
    expect(() => stack.pop()).toThrowError()
    expect(stack.isEmpty()).toBe(true)
    expect(stack.length()).toBe(0)
    stack.push(100)
    expect(stack.peek()).toBe(100)
  })
})

describe('braceMatcher tests', () => {
  test('Test: simple brace match', () => {
    expect(braceMatcher('()')).toBeTruthy()
    expect(braceMatcher('(()())')).toBeTruthy()
    expect(braceMatcher('((()))')).toBeTruthy()
    expect(braceMatcher('))((')).toBeFalsy()
    expect(braceMatcher('((()))(')).toBeFalsy()
  })
})
