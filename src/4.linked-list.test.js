import {createList} from './4.linked-list.js'

test('Creating a linked list', () => {
  expect(createList).toBeDefined()
  const linkedList = createList()
  /*
        {
            head: null,
            tail: null,
            getLength() // to return 0 on creation.
            push(value) // adds item to end
            pop() // removes item from end
        
        }


    */
  expect(linkedList).toBeDefined()
  expect(linkedList.head).toBeNull()
  expect(linkedList.tail).toBeNull()
  expect(linkedList.toString()).toBe('')
  expect(linkedList.getLength()).toBe(0)
  const nodePushed = linkedList.push(10)
  expect(linkedList.head).toBe(nodePushed)
  expect(linkedList.tail).toBe(nodePushed)
  expect(linkedList.toString()).toBe('10')
  expect(linkedList.getLength()).toBe(1)
  let poppedNode = linkedList.pop()
  expect(poppedNode.value).toBe(10)
  expect(poppedNode).toBe(nodePushed)
  expect(linkedList.getLength()).toBe(0)
  expect(linkedList.toString()).toBe('')
  linkedList.push(7)
  linkedList.push(8)
  let lastNode = linkedList.push(9)
  poppedNode = linkedList.pop()
  expect(poppedNode).toEqual(lastNode)
})

test('Test node at index in a list', () => {
  const linkedList = createList()
  expect(linkedList.nodeAtIndex(0)).toBeNull()
  let node = linkedList.push(1)
  expect(linkedList.nodeAtIndex(0)).toBe(node)
  linkedList.push(2)
  node = linkedList.push(3)
  expect(linkedList.nodeAtIndex(2)).toBe(node)
  linkedList.push(4)
})

test('Want to iterate the list', () => {
  const linkedList = createList()
  linkedList.push(1)
  linkedList.push(2)
  linkedList.push(3)
  for (let val of linkedList) {
    expect(val).toBeDefined()
    console.log(val)
  }
  const arr = [...linkedList]
  console.log(arr)
  // [1, 2, 3]
  // expect(arr).toBe([1, 2, 3]) // this will fail with error:  If it should pass with deep equality, replace "toBe" with "toStrictEqual"
  expect(arr).toEqual([1, 2, 3]) // toBe uses value semantics, it just tries to do a strict equal ===, which wont work in this case as we want to deeply compare two objects
})
