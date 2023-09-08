import {evalExpression} from './eval-2.js'

test('evalExpression tests ', () => {
  expect(evalExpression('')).toBe('')
  expect(() => evalExpression('12-1+3=8')).toThrowError(
    'Unrecognized token found in the expression!',
  )
  expect(evalExpression('12-1+3-8')).toBe('6')
  expect(evalExpression('12-1+3')).toBe('14')
  expect(() => evalExpression('1+-1')).toThrowError()
  expect(() => evalExpression('1--1')).toThrowError(
    'operator needs to follow an operand',
  )
  expect(evalExpression('1-1')).toBe('0')
  expect(evalExpression('1+1')).toBe('2')
  expect(evalExpression('123')).toBe('123')
  expect(evalExpression('12')).toBe('12')
  expect(evalExpression('1')).toBe('1')
  expect(evalExpression('1+1')).toBe('2')

  expect(() => evalExpression('1--1')).toThrowError()

  expect(evalExpression('12-1+3')).toBe('14')
  expect(evalExpression('12-1+3-8')).toBe('6')
  expect(() => evalExpression('12-1+3=8')).toThrowError()
  expect(() => evalExpression('12-1+3=8-')).toThrowError()
  expect(() => evalExpression('+12-1+3=8-')).toThrowError()
  expect(evalExpression('12 - 1 + 3 - 8')).toBe('6')
})
