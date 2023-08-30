import assert from 'assert'

function prime(number) {
  assert(typeof number === 'number')

  // if it is 0, 1 it is not prime, 2 is a prime.
  // if there is no number in range (2, number/2) that can devide the given number without a remainder, then it is not prime
  // else it is a prime.
  if (number === 0 || number === 1) {
    return false
  }

  const absNumber = Math.abs(number)
  for (let i = 2; i <= absNumber / 2; i++) {
    if (absNumber % i === 0) {
      return false
    }
  }
  return true
}

export {prime}
