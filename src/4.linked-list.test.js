import {describe, test, expect, beforeEach} from 'vitest'
import {createList} from './4.linked-list.js'

describe('Linked List Tests', () => {
  let linkedList
  beforeEach(() => {
    linkedList = createList()
    linkedList.push(1)
    linkedList.push(2)
    linkedList.push(3)
  })

  test('Test: createList function', () => {
    expect(createList).toBeDefined()
    const linkedList = createList()
    expect(linkedList).toBeDefined()
    expect(linkedList.head).toBeNull()
    expect(linkedList.tail).toBeNull()
    expect(linkedList.getLength()).toBe(0)
  })

  test('Test: push method', () => {
    const linkedList = createList()
    let node = linkedList.push(1)
    expect(linkedList.head).toBe(node)
    expect(linkedList.tail).toBe(node)
    node = linkedList.push(2)
    expect(linkedList.getLength()).toBe(2)
  })

  test('Test: pop method', () => {
    const linkedList = createList()
    linkedList.push(1)
    let lastPushed = linkedList.push(2)
    let popped = linkedList.pop()
    expect(popped).toBe(lastPushed)
    expect(linkedList.getLength()).toBe(1)
  })

  test('Test: toString method', () => {
    expect(linkedList.toString()).toBe('1->2->3')
  })

  test('Test: nodeAtIndex method', () => {
    const linkedList = createList()
    expect(linkedList.nodeAtIndex(0)).toBeNull()
    let node = linkedList.push(1)
    expect(linkedList.nodeAtIndex(0)).toBe(node)
    linkedList.push(2)
    node = linkedList.push(3)
    expect(linkedList.nodeAtIndex(2)).toBe(node)
  })

  test('Test: insertAtIndex method', () => {
    expect(linkedList.toString()).toBe('1->2->3')
    let inserted = linkedList.insertAtIndex(0, 0)
    expect(linkedList.toString()).toBe('0->1->2->3')
    expect(linkedList.head).toBe(inserted)
    linkedList.insertAtIndex(3, 0)
    expect(linkedList.toString()).toBe('0->1->2->0->3')
    linkedList.insertAtIndex(2, 0)
    expect(linkedList.toString()).toBe('0->1->0->2->0->3')
    expect(() => linkedList.insertAtIndex(-1, 100)).toThrowError()
    expect(() => linkedList.insertAtIndex(6, 100)).toThrowError()
  })

  test('Test: removeAtIndex method', () => {
    expect(linkedList.toString()).toBe('1->2->3')
    let removed = linkedList.removeAtIndex(0)
    expect(removed.value).toBe(1)
    expect(linkedList.toString()).toBe('2->3')
    linkedList.push(2)
    linkedList.push(3)
    removed = linkedList.removeAtIndex(3)
    expect(removed.value).toBe(3)
    expect(linkedList.toString()).toBe('2->3->2')
    removed = linkedList.removeAtIndex(1)
    expect(removed.value).toBe(3)
    expect(linkedList.toString()).toBe('2->2')
    expect(() => linkedList.removeAtIndex(-1)).toThrowError()
    expect(() => linkedList.removeAtIndex(2)).toThrowError()
  })

  test('Test: Iterate the Linked List using for...of loop', () => {
    for (let elem of linkedList) {
      expect(elem).toBeDefined()
    }
  })

  test('Test: Array.from on Linked List', () => {
    expect(Array.from(linkedList)).toEqual([1, 2, 3])
  })

  test('Test: Spread operator on Linked List', () => {
    expect([...linkedList]).toEqual([1, 2, 3])
  })
})
