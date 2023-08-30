import {prime} from './2.prime'
import {test, expect} from 'vitest'

test('Testing prime function', () => {
  expect(prime(0)).toBeFalsy()
  expect(prime(1)).toBeFalsy()
  expect(prime(2)).toBeTruthy()
  expect(prime(3)).to.equal(true)
  expect(prime(4)).to.equal(false)
  expect(prime(5)).toBeTruthy()
  expect(prime(7)).toBeTruthy()
  expect(prime(8)).toBeFalsy()
  expect(prime(9)).toBeFalsy()
  expect(prime(29)).toBeTruthy()
  expect(prime(709)).toBeTruthy()
  expect(prime(100000)).toBeFalsy()
})
