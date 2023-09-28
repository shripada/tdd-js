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
const aPath = '/Users1/shripada/projects/test-driven-development/tdd-js/src'

// If we miss catch and promise is in rejected state, then js will raise an exception for us.
promisifiedFsStat(aPath)
  .then((stats) => console.log(stats))
  .catch(() => {
    // Have atleast one catch block in the promise chain.
    console.log('Something is wrong')
  })

// promisified fs.readdir
function promisifiedFsReadDir(path) {
  return new Promise((resolve, reject) => {
    fs.readdir(path, (err, files) => {
      if (err) {
        reject(err)
      }
      resolve(files)
    })
  })
}

// promisified fileSize function
function promisifiedFindSize(path) {
  return promisifiedFsStat(path).then((stats) => {
    if (stats.isFile()) {
      return stats.size
    } else if (stats.isDirectory()) {
      return promisifiedFsReadDir(path)
        .then((files) => {
          //   let size = 0
          //   files.forEach((file, index) => {
          //     promisifiedFindSize(`${path}/${file}`).then((sizeIn) => {
          //       size += sizeIn
          //       if (files.length === index + 1) {
          //         resolve(size)
          //       }
          //     })
          //   })
          // Lets trasform the array of files into an array of promises.
          const promises = files.map((filePath) =>
            promisifiedFindSize(`${path}/${filePath}`),
          )
          // We need to wait until all promises resolve / or any one fails.
          // Thanks to Promise.all API, which exactly facilitates this.
          return Promise.all(promises).then((sizes) =>
            sizes.reduce((accumulated, current) => accumulated + current, 0),
          )
        })
        .catch((error) => {
          // swallowing the error!! dont do this.
          console.log('Error while computing size', error)
          // May be you throw a better error here after processing the passed error.
          //return Promise.reject(error)
          throw error
        })
    }
  })
}

promisifiedFindSize(aPath)
  .then((size) => {
    console.log('size computed using promisified findSize api ', size)
  })
  .catch((error) => {
    console.log('error encountered in promisified findSize api,', error)
  })
  .finally(() => {
    console.log('File size computation concluded')
  })

function promiseAll(promises) {
  return promises.reduce((combined, currentPromise, index) => {
    if (index === 0) return combined
    return combined.then((value) => {
      return currentPromise.then((val) => {
        if (Array.isArray(value)) {
          return [...value, val]
        } else {
          return [value, val]
        }
      })
    })
  }, promises[0])
}

promiseAll([
  Promise.resolve(10),
  Promise.reject('!!!rejection!!!'),
  Promise.resolve(2),
])
  .then((values) => {
    console.log(values)
  })
  .catch((error) => console.log(error))
