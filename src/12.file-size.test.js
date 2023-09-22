import {sizeOfFileAtPathAsync, sizeOfFileAtPathSync} from './12.file-size'

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

test.skip('finding size synchronously', () => {
  const aPath = '/Users/shripada/projects/test-driven-development/tdd-js'
  const timeBefore = performance.now()
  expect(sizeOfFileAtPathSync(aPath)).toBe(55621895)
  const timeAfter = performance.now()
  console.log(timeAfter - timeBefore)
})

test(
  'finding the size of a file or folder at path',
  () =>
    new Promise((resolve) => {
      // note change this a path suitable to your file system.
      const aPath =
        '/Users/shripada/projects/test-driven-development/tdd-js/src'
      const timeBefore = performance.now()
      sizeOfFileAtPathAsync(aPath, (fileSize, error) => {
        const timeAfter = performance.now()
        console.log('Time taken async: ', timeAfter - timeBefore)
        console.log(error)
        expect(error).toBeUndefined()
        console.log(fileSize)
        expect(fileSize).toBeGreaterThan(0)
        resolve()
      })
    }),
  10000,
)
