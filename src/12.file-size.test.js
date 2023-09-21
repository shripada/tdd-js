import {sizeOfFileAtPath} from './12.file-size'

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

test('finding the size of a file or folder at path', async () => {
  const aPath =
    '/Users/shripada/projects/test-driven-development/tdd-js/src/12.file-size.js'
  sizeOfFileAtPath(aPath, (fileSize, error) => {
    expect(error).toBeUndefined()
    expect(fileSize).toBeGreaterThan(0)
  })
  await wait(1100)
})
