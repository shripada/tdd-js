import {createList} from './4.linked-list.js'
export function createStack() {
  const list = createList()
  return {
    push(value) {},
    pop() {
      // remove the item at the top and return
    },
    peek() {
      // return the item at the top of the stack
    },
    length() {
      // length of the stack
    },
    isEmpty() {
      // returns true if empty, false otherwise.
    },
  }
}
