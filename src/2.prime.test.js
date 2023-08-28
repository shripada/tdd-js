import {expect} from 'vitest'
import {prime, primeSeries} from './2.prime'

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

test('Testing primeSeries function', () => {
  expect(primeSeries(0, 1)).toEqual([])
  expect(primeSeries(10, 20)).toEqual([11, 13, 17, 19])
  expect(primeSeries(100, 110)).toEqual([101, 103, 107, 109])
  expect(primeSeries(50, 500)).toEqual([
    53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127, 131,
    137, 139, 149, 151, 157, 163, 167, 173, 179, 181, 191, 193, 197, 199, 211,
    223, 227, 229, 233, 239, 241, 251, 257, 263, 269, 271, 277, 281, 283, 293,
    307, 311, 313, 317, 331, 337, 347, 349, 353, 359, 367, 373, 379, 383, 389,
    397, 401, 409, 419, 421, 431, 433, 439, 443, 449, 457, 461, 463, 467, 479,
    487, 491, 499,
  ])
})
