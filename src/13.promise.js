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
const aPath = '/Users/shripada/projects/test-driven-development/tdd-js/src'

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

// To implementation of  Promise.all
// Problem of composing or piping the promises.
// Promise.all ==> [resolved1, resolved2.....resolved-n]

// p1, p2

function pipePromises(p1, p2) {
  return p1.then((resolved1) => {
    return p2.then((resolved2) => [resolved1, resolved2])
  })
}
const p1 = Promise.resolve(0)
const p2 = Promise.resolve(1)
const piped = pipePromises(p1, p2)
piped.then((combined) => console.log(combined)) // [0,1]

function pipePromises1(...promises) {
  let accumulated = Promise.resolve([])
  for (let promise of promises) {
    accumulated = accumulated.then((accumulatedValues) => {
      // get the resolved value of current promise, and return new values that has the current resolved
      // value appended
      return promise.then((currentValue) => [
        ...accumulatedValues,
        currentValue,
      ])
    })
  }
  return accumulated
}

const p3 = Promise.resolve('Good')
pipePromises1(p1, p2, p3)
  .then((values) => console.log('piped promise values: ', values))
  .catch((error) => console.log('Piped error: ', error))

function pipePromises1UsingReduce(...promises) {
  return promises.reduce((accumulatedPromise, currentPromise) => {
    return accumulatedPromise.then((accumulatedPromiseValues) => {
      return currentPromise.then((currentPromiseValue) => [
        ...accumulatedPromiseValues,
        currentPromiseValue,
      ])
    })
  }, Promise.resolve([]))
}

pipePromises1UsingReduce(p1, p2, p3)
  .then((values) =>
    console.log('piped promise values (reduce version): ', values),
  )
  .catch((error) => console.log('Piped error (reduce): ', error))

// Fetch profile information of 1000 users
const profileIds = []
for (let i = 0; i < 1000; i++) {
  profileIds.push(i)
}

const baseURL = 'https://swapi.dev/api/people/'
// This is going to create all 1000 promises in one shot.
// this is going to put huge load on network layer
// and overall perfromance of app is going to degrade.

function fetchProfile(id){
  return fetch(`baseURL/${id}`).then((response) => response.json())
}
const profilePromises = profileIds.map((id) =>
fetchProfile(id)
)
Promise.all(profilePromises).then((profiles) => {
  // process those profiles.
})

// natural solution is to batch promises.
// We need to first have batches of the profile ids
function createBatchesOfProfileIds(ids, batchSize) {
  // create an array of batches
  // [[id1, id2, id3 ], [id4, id5, id6], ...]
  const result = []
  for (let i = 0; i < ids.length; i++) {
    // Should we start a new batch?
    if (i % batchSize === 0) {
      result.push([ids[i]])
    } else {
      // insert this item to the most recent batch.
      const lastBatch = result[result.length-1];
      lastBatch.push(ids[i]);
    }
  }

  return result; //[[0,1,2], [3,4,5], [6,7,8]...] if batch size is 3
}

const batchedProfileIds = createBatchesOfProfileIds(profileIds, 5);


// Now we need to create promises for each batch only after the previous batch has finished.
for(let i=0; i< batchedProfileIds.length; i++){
   const batchOfIds = batchedProfileIds[i];
   const batchedPromises = batch.map(id =>)
}