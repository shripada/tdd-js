import fs from 'fs'

const executor = (resolve, reject) => {
  const square = 4 * 4
  //throw 'This is also same as reject?!'
  resolve(square)
  reject('rejected, some error')
}

const aPromise = new Promise(executor)
aPromise.then(
  (resolved) => {
    console.log(resolved)
  },
  (rejected) => {
    console.log('Reject:', rejected)
  },
)

aPromise.then(
  (resolved) => {
    console.log(resolved)
  },
  (rejected) => {
    console.log('Reject:', rejected)
  },
)

console.log('Hi world!')

// aPromise.catch((error) => {
//   console.log('Catch: ', error)
// })

// aPromise
//   .then((resolved) => {
//     console.log('resolved', resolved)
//     //return 10 // It will wrap returns in a then callback as a promise itself
//     // new Promise((resolve) => resolve(10))
//     //throw 'error in then' // new Promise((resolve, reject) => reject("error"));
//     //return new Promise((resolve, reject) => reject('error'))
//     // return Promise.reject('error')
//     return Promise.resolve('resolved')
//   })
//   .then((valueReturnedByEarlierThen) =>
//     console.log('value of previous then', valueReturnedByEarlierThen),
//   )
//   .catch((error) => {
//     console.log('rejected', error)
//   })

new Promise((resolve, reject) => {
  resolve(10)
})
  .then((value) => {
    console.log(value)
    throw 'Not happy with value!'
    //return value * value
  })
  .then((value) => {
    console.log('Value', value)
  })
  .catch((error) => {
    console.log('first catch', error)
    return 200 // resolved promise
  })
  .catch((error) => {
    console.log('second catch', error)
  })
  .then((value) => {
    console.log(value)
  })

// A promisified fs.stat aync API that uses callback
function promisifiedFsStat(path) {
  //fs.stat(path, (err, stats) => {})
  return new Promise((resolve, reject) => {
    fs.stat(path, (err, stats) => {
      if (err) {
        reject(err)
      }
      resolve(stats)
    })
  })
}
const aPath = '/Users1/shripada/projects/test-driven-development/tdd-js'

// If we miss catch and promise is in rejected state, then js will raise an exception for us.
promisifiedFsStat(aPath)
  .then((stats) => console.log(stats))
  .catch(() => {
    // Have atleast one catch block in the prmise chain.
    console.log('Something is wrong')
  })
