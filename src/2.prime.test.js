import {expect} from 'vitest'
import {prime} from './2.prime'

test('Testing prime function', () => {
  expect(prime(0)).toBeFalsy()
  expect(prime(1)).toBeFalsy()
  expect(prime(2)).toBeTruthy()
  expect(prime(3)).toBeTruthy()
  expect(prime(4)).toBeFalsy()
  expect(prime(5)).toBeTruthy()
  expect(prime(7)).toBeTruthy()
  expect(prime(9)).toBeFalsy()
  expect(prime(29)).toBeTruthy()
  expect(prime(709)).toBeTruthy()
})
