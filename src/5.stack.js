import {createList} from './4.linked-list.js'

export function createStack() {
  const list = createList()
  return {
    push(value) {
      list.push(value)
    },
    pop() {
      if (this.isEmpty()) {
        throw new Error('Stack is Empty')
      }
      return list.pop().value
    },
    peek() {
      if (this.isEmpty()) {
        throw new Error('Stack is Empty')
      }
      return list.tail.value
    },
    length() {
      return list.getLength()
    },
    isEmpty() {
      return list.getLength() === 0
    },
  }
}

export function braceMatcher(braceStr) {
  let stack = createStack()

  for (let brace of braceStr) {
    if (brace === '(') {
      stack.push(brace)
    } else {
      try {
        stack.pop()
      } catch (error) {
        return false
      }
    }
  }
  return stack.length() === 0
}
