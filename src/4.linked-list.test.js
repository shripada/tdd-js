import {test, expect} from 'vitest'
import {createList} from './4.linked-list.js'

test('Creating a linked List', () => {
  expect(createList).toBeDefined()
  const linkedList = createList()
  /*
        {
            head: null,
            tail: null,
            getLength(), // to return 0 on creation,
            push(value), // adds node to the end
            pop() // remove node from end
        }
    */
  expect(linkedList).toBeDefined()
  expect(linkedList.head).toBeNull()
  expect(linkedList.tail).toBeNull()
  expect(linkedList.getLength()).toBe(0)
  expect(linkedList.toString()).toBe('')
  let nodePushed = linkedList.push(10)
  expect(linkedList.head).toBe(nodePushed)
  expect(linkedList.tail).toBe(nodePushed)
  expect(linkedList.getLength()).toBe(1)
  expect(linkedList.toString()).toBe('10')
  let poppedNode = linkedList.pop()
  expect(poppedNode.value).toBe(10)
  expect(poppedNode).toBe(nodePushed)
  expect(linkedList.getLength()).toBe(0)
  expect(linkedList.toString()).toBe('')
  linkedList.push(100)
  linkedList.push(200)
  expect(linkedList.toString()).toBe('100->200')
  poppedNode = linkedList.pop()
  expect(poppedNode.value).toBe(200)
  expect(linkedList.toString()).toBe('100')
  linkedList.push(300)
  linkedList.push(300)
  linkedList.push(300)
  linkedList.push(300)
  linkedList.push(300)
  linkedList.push(300)
  linkedList.push(300)
  expect(linkedList.getLength()).toBe(8)
  poppedNode = linkedList.pop()
  expect(poppedNode.value).toBe(300)
  expect(linkedList.toString()).toBe('100->300->300->300->300->300->300')
  linkedList.insertAtIndex(2, 200)
  expect(linkedList.toString()).toBe('100->300->200->300->300->300->300->300')
  linkedList.insertAtIndex(0, 200)
  expect(linkedList.toString()).toBe(
    '200->100->300->200->300->300->300->300->300',
  )
  linkedList.insertAtIndex(8, 200)
  expect(linkedList.toString()).toBe(
    '200->100->300->200->300->300->300->300->200->300',
  )
  expect(() => linkedList.insertAtIndex(10, 200)).toThrowError()
  let removedNode = linkedList.removeAtIndex(1)
  expect(removedNode.value).toBe(100)
  expect(linkedList.toString()).toBe(
    '200->300->200->300->300->300->300->200->300',
  )
  linkedList.removeAtIndex(0)
  expect(linkedList.toString()).toBe('300->200->300->300->300->300->200->300')
  linkedList.removeAtIndex(4)
  expect(linkedList.toString()).toBe('300->200->300->300->300->200->300')
  removedNode = linkedList.removeAtIndex(6)
  expect(linkedList.toString()).toBe('300->200->300->300->300->200')
  expect(removedNode.value).toBe(300)
  expect(() => linkedList.removeAtIndex(10)).toThrowError()
  expect(() => linkedList.removeAtIndex(-1)).toThrowError()
  removedNode = linkedList.removeAtIndex(5)
  expect(removedNode.value).toBe(200)
  expect(linkedList.toString()).toBe('300->200->300->300->300')
  expect(linkedList.tail.value).toBe(300)
  linkedList.push(500)
  expect(linkedList.tail.value).toBe(500)
  expect(linkedList.toString()).toBe('300->200->300->300->300->500')
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
  expect(linkedList.toString()).toBe('1->2->3')
  for (let node of linkedList) {
    console.log(node.value)
    expect(node.value).toBeDefined()
  }
})
