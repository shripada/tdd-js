test('array basics', () => {
  // Each array objects inherits from Array.prototype object
  expect(Object.getPrototypeOf([])).toBe(Array.prototype)

  // JS array are untyped. You can mix different type of values
  // create array using literal
  const data = [1, 2, 'three', 4, 5, 6] // mixed values, here number and string
  expect(data).toBeDefined()
  // items are ordered and can be accessed by index. Arrays are specialised objects where keys are integers 0,1,2..but implementation is optimised.
  expect(data[0]).toBe(1)
  expect(data[1]).toBe(2)
  expect(data[2]).toBe('three')

  // trying to access non existent index will return undefined unlike in some other languages like C++ (where it is an error to access out of bounds)
  expect(data[100]).toBeUndefined()
  // Arrays can be dense or sparse. the above is dense, and thus the length is equal to number of items in it
  expect(data.length).toBe(6)

  // We can delete an item from array and leave a hole in the array, such arrays are sparse.
  // the length is still inclusive of hole, that means length no longer reflects actual count of items in array
  delete data[1]
  expect(data.length).toBe(6) //
  expect(data[1]).toBeUndefined() // Trying to access a deleted item will result in undefined.

  // Each array inherits from Array.prototype object that has a lot of methods that facilitate manipulating arrays
  expect(Object.getPrototypeOf(data)).toBe(Array.prototype)

  // Writing to array, just use [] operator and pass index (zero based)
  data[0] = 100

  // trying to set a value beyond current bounds is going to turn the  array into sparse, the length will be 100
  data[100] = 100
  // items between index 6 to 99 are all undefined.
  expect(data[6]).toBeUndefined()
  expect(data[99]).toBeUndefined()
  expect(data[100]).toBe(100)
  expect(data.length).toBe(101)

  // the index can be an expression that evals to a number
  let n = 10
  data[n + 1] = 11 // will result setting 11 to index 11 in array
  expect(data[11]).toBe(11)

  // checking if a variable represents an array
  expect(typeof data).toBe('object') // yes typeof on an array will return 'object'.
  // Need to use Array.isArray method
  expect(Array.isArray(data)).toBeTruthy()

  // using a non number as value to index will end up introduce that as a key value - just like in an object
  data['name'] = 'something' //this has no bearing on the array length.
  expect(data.name).toEqual('something')
  expect(data.length).toBe(101) // length is still 101
})

test('create using Array constructor', () => {
  let numbers = new Array(10) // create an array of size 10, array is sparse
  expect(numbers.length).toBe(10)
  // all items are undefined by default, we just check a random item and prove that it is undefined
  let randomIndex = Math.floor(Math.random() * 10)
  expect(numbers[randomIndex]).toBeUndefined()

  // assign values
  for (let i = 0; i < 10; i++) {
    numbers[i] = i
  }
  expect(numbers[randomIndex]).toBe(randomIndex)

  // Array.of helps create an array from variable number of args passed to it
  numbers = Array.of(1, 2, 4, 5, 6)
  expect(numbers.length).toBe(5)
  expect(numbers).toEqual([1, 2, 4, 5, 6])

  // Array.from creates an array from an iterable or array like object
  const anotherNumbers = Array.from(numbers)
  expect(anotherNumbers).toEqual(numbers)

  const anIterable = {
    [Symbol.iterator]: function* () {
      // a generator function!
      for (let i = 0; i < 10; i++) {
        yield i
      }
    },
  }

  const arrayFromIterable = Array.from(anIterable)
  expect(arrayFromIterable.length).toBe(10)
  expect(arrayFromIterable).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
})

test('shallow copying arrays using spread operator', () => {
  const arr = [1, 2, 3, 4, 5, {name: 'JS'}]
  const anotherArr = [...arr] // shallow copy creates a new array in memory. but members are copied in a shallow manner
  expect(arr).toEqual(anotherArr)
  // Shallow copy means, any objects will be copied by reference and no deep copy takes place
  expect(arr[5]).toBe(anotherArr[5])
})

test('mutating array in place', () => {
  let a = [1, 2]

  // adding at the end
  a.push(10) // pushes 10 to the end of the array
  expect(a[a.length - 1]).toBe(10)
  expect(a.length).toBe(3)

  // removing an item from the end
  let popped = a.pop()
  expect(popped).toBe(10)
  expect(a.length).toBe(2) // popping will correctly reduce the length

  // adding at the beginning, unshift returns the new length.
  expect(a.unshift(100)).toBe(3)
  expect(a[0]).toEqual(100) // 100 is added in the beginning

  // shift method removes item from front and returns it, length gets reduced by 1
  expect(a.shift()).toBe(100)
  expect(a.length).toBe(2)

  // The splice, the imperative hammer to alter an array in place.
  // inserting elements after an index
  let b = [1, 2, 3, 4, 5]
  // lets delete 2 items (2,3) that appear from index 1
  let removed = b.splice(1, 2)
  expect(b).toEqual([1, 4, 5]) // 2 & 3 removed
  expect(removed).toEqual([2, 3])

  // splice can also be used insert after an index, need to set number of items to be removed
  // second arg to 0, and third arg onwards will be the items to be inserted
  let c = [1, 2, 3, 4, 5]
  removed = c.splice(1, 0, 6, 7) // Insert 6, 7 after index 1, without removing anything
  expect(removed).toEqual([]) // nothing removed
  expect(c).toEqual([1, 6, 7, 2, 3, 4, 5]) // 6, 7 got inserted at index 1, no item was removed.

  // remove 2 items added and insert 3 new items after index 1
  removed = c.splice(1, 2, 8, 9, 10)
  expect(c).toEqual([1, 8, 9, 10, 2, 3, 4, 5])
  expect(removed).toEqual([6, 7])

  // Splice takes negative values for index, the actual index will be computed
  // length - abs(index) in that case
  let d = [1, 2, 3, 4, 5]
  removed = d.splice(-2, 1) // length - 2  (6-2) = 4.
  expect(removed).toEqual([4]) // 1 item from index 4 is removed
})

test('manipulating array in an immutable way, original array will intact, modified will be a shallow copy', () => {
  // Welcome to the immutable cousin of the splice toSpliced, prefer this over splice.
  // this API will work only on NodeJS 20 onwards.
  // Refer: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/toSpliced
  let a = [1, 2, 4, 5, 6]
  let modified = a.toSpliced(1, 2, 8) // remove 2 items at index 1, and replace by 8
  expect(modified).not.toBe(a)
  expect(modified).toEqual([1, 8, 5, 6])
})

test('The slice() method of Array instances returns a shallow copy of a portion of an array without modifying it.', () => {
  // slice takes start and end (if not provided end will be the length, it will not be included)
  // creates a shallow copy and returns that. original array is not modified.
  const animals = ['ant', 'bison', 'camel', 'duck', 'elephant']
  // end is not provided, it will be animals.length, i.e 5
  expect(animals.slice(2)).toEqual(['camel', 'duck', 'elephant'])
  // check that animals is not modified
  expect(animals).toEqual(['ant', 'bison', 'camel', 'duck', 'elephant'])

  expect(animals.slice(2, 4)).toEqual(['camel', 'duck']) // items at 2, and 3
  expect(animals.slice(1, 5)).toEqual(['bison', 'camel', 'duck', 'elephant']) // items at 2, and 3
  expect(animals.slice(-2)).toEqual(['duck', 'elephant']) // when start is negative, it will be computed as start + array.length
  expect(animals.slice(-2, -1)).toEqual(['duck']) // start is computed start+array.length, end = end + array.length

  // If end < start, nothing will be returned
  expect(animals.slice(2, 1)).toEqual([])
  expect(animals.slice(-2, -3)).toEqual([])

  // if no start or end is provided, then entire array is returned
  expect(animals.slice()).toEqual(['ant', 'bison', 'camel', 'duck', 'elephant'])
  expect(animals.slice()).not.toBe(animals)
})

test('spread operator on array also can help build a shallow copy', () => {
  const animals = ['ant', 'bison', 'camel', 'duck', 'elephant']
  const birds = ['parrot', 'sparrow', 'crow', 'hawk']
  const animaslCopy = [...animals]
  expect(animaslCopy).toEqual(animals)
  expect(animaslCopy).not.toBe(animals)

  // We can easily create new copies with spread operator
  const animalsAndBirds = [...animals, ...birds]
  expect(animalsAndBirds).toEqual([
    'ant',
    'bison',
    'camel',
    'duck',
    'elephant',
    'parrot',
    'sparrow',
    'crow',
    'hawk',
  ])
})

test('array destructuring to create vars for various item or items in the given array', () => {
  const animals = ['ant', 'bison', 'camel', 'duck', 'elephant']
  const [ant, bison] = animals
  expect(ant).toBe('ant')
  expect(bison).toBe('bison')

  // if we use spread operator in left hand side (lhs) as last arg, then rest of items will be shallow copied into it
  const [anotherAnt, ...rest] = animals
  expect(anotherAnt).toBe('ant')
  expect(rest).toEqual(['bison', 'camel', 'duck', 'elephant'])
})
