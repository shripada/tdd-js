import assert from 'assert'

export function prime(number) {
  assert(typeof number === 'number')

  if (number < 2) return false

  if (number === 2) return true

  if (number % 2 === 0) return false

  for (let i = 3; i * i <= number; i += 2) {
    if (number % i === 0) return false
  }

  return true
}

export function primeSeries(start, end) {
  assert(typeof start === 'number')
  assert(typeof end === 'number')
  const result = []

  for (let i = start; i <= end; i++) {
    if (prime(i)) result.push(i)
  }

  return result
}
