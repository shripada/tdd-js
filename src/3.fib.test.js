import {test, expect} from 'vitest'
import {nthFibonacci} from './3.fib.js'

test('Fibonacci number', () => {
  expect(nthFibonacci).toBeDefined()
  expect(nthFibonacci(0)).toBe(0)
  expect(nthFibonacci(1)).toBe(1)
  expect(nthFibonacci(2)).toBe(1)
  expect(nthFibonacci(3)).toBe(2)
  expect(nthFibonacci(4)).toBe(3)
  expect(nthFibonacci(5)).toBe(5)
  expect(nthFibonacci(15)).toBe(610)
  expect(() => nthFibonacci(-1)).toThrowError()
})
