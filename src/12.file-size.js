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
export function sizeOfFileAtPath(path, callback) {
  // Find if path is a file or folder
  setTimeout(() => callback(0), 1000) //this is async
}

//processArgs()
