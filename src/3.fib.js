export function nthFibonacci(n) {
  if (n < 0) throw new Error('n must be greater than or equal to 0')
  let num1 = 0
  let num2 = 1
  for (let i = 0; i < n; i++) {
    let temp = num1 + num2
    num1 = num2
    num2 = temp
  }

  return num1
}
