import {afterAll} from 'vitest'
import {createList} from './4.linked-list.js'

describe('Linked List tests', () => {
  beforeAll(() => {
    console.log('Before any test is picked up for running')
  })
  afterAll(() => {
    console.log('After all tests conclude')
  })

  let list
  beforeEach(() => {
    list = createList()
    list.push(1)
    list.push(2)
    list.push(3)
    list.push(4)
  })

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

  test('There should not be any nodes in a empty list', () => {
    const linkedList = createList()
    expect(linkedList.nodeAtIndex(0)).toBeNull()
  })

  test('Test node at index in a list', () => {
    expect(list.nodeAtIndex(0).value).toBe(1)
    expect(list.nodeAtIndex(2).value).toBe(3)
  })

  test('Want to iterate the list', () => {
    for (let val of list) {
      expect(val).toBeDefined()
      console.log(val)
    }
    const arr = [...list]
    console.log(arr)
    // [1, 2, 3]
    // expect(arr).toBe([1, 2, 3]) // this will fail with error:  If it should pass with deep equality, replace "toBe" with "toStrictEqual"
    expect(arr).toEqual([1, 2, 3, 4]) // toBe uses value semantics, it just tries to do a strict equal ===, which wont work in this case as we want to deeply compare two objects
  })
})
