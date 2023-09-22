import fs from 'fs'

// We want to develop a tool
// that will print the size of the path passed as an argument.
// node callback.js <path to file or folder>
// 10234
// 'path does not exist'
// 'args missing'

/**
 * This will be called whenever this file is executed in node runtime
 * It is going to validate if necessary args are passed, and there is
 * a valid path passed. If valid path is present, it is going to invoke
 * another function to compute the size of the path provided.
 */
function processArgs() {}

/**
 * This function computes the size of the file/folder at the path given and it is
 * asynchronous.
 * @pararm {string} path representing either a file or a folder.
 * @param  {Function} callback - a function that has first param a number indicate size in bytes, and an option second param indicating any error if exists.
 * @returns the size of the path / folder passed. Throws an exception if the path is invalid or no permissions.
 *
 */

//processArgs()

export function sizeOfFileAtPathSync(path) {
  const stat = fs.statSync(path)
  console.log(stat)
  if (stat.isFile()) {
    return stat.size // base case
  } else if (stat.isDirectory()) {
    // get all files in it, and add up their size and return.
    const files = fs.readdirSync(path)
    console.log(files)
    let size = 0
    for (let file of files) {
      const pathOfFile = path + '/' + file
      console.log(pathOfFile)
      size += sizeOfFileAtPathSync(pathOfFile)
    }
    return size
  }
}

export function sizeOfFileAtPathAsync(path, callback) {
  // Find if path is a file or folder
  fs.stat(path, (err, stats) => {
    if (path.includes('node_modules') || path.includes('.git')) {
      callback(0)
      return
    }
    if (err) {
      callback(0, err)
      return
    }
    if (stats.isFile()) {
      callback(stats.size)
    } else if (stats.isDirectory()) {
      fs.readdir(path, (err, files) => {
        if (err) {
          callback(0, err)
        } else {
          // accumulate the size by finding the size of each file and add it up
          let size = 0
          let fileCount = 0
          for (let file of files) {
            const pathOfFile = path + '/' + file
            sizeOfFileAtPathAsync(pathOfFile, (sizeIn, err) => {
              fileCount += 1
              if (err) {
                console.log(err)
                //throw err
                callback(0, err)
              } else {
                size += sizeIn
              }
              // Call the callback only after accumulating sizes of all files contained
              if (fileCount === files.length) {
                callback(size)
              }
            })
          }
        }
      })
    }
  })
}
