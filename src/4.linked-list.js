/**
 * Creates a linked list and returns it
 * Linked list is made up of List nodes. Each node has the following structure
 * {
 *  value: <some value>,
 *  next: <a reference to another list node>
 * }
 * @returns Linked List
 */
export function createList() {
  return {
    head: null,
    tail: null,
    getLength() {
      let length = 0

      for (let temp = this.head; temp !== null; temp = temp.next) {
        length++
      }
      return length
    },
    nodeAtIndex(index) {
      let currentIndex = 0
      let currentNode = this.head
      if (index >= 0 && index < this.getLength()) {
        while (currentNode !== null) {
          if (currentIndex === index) {
            return currentNode
          }
          currentNode = currentNode.next
          currentIndex++
        }
      }
      return null
    },
    push(value) {
      const node = {
        value,
        next: null,
      }
      if (this.head === null) {
        this.head = node
      }
      if (this.tail === null) {
        this.tail = node
      }

      if (node !== this.tail) {
        this.tail.next = node
        this.tail = node
      }

      return node
    },
    pop() {
      const popped = this.tail
      if (this.head === this.tail) {
        this.head = null
        this.tail = null
      } else {
        const length = this.getLength()
        const penultimate = this.nodeAtIndex(length - 2)
        this.tail = penultimate
        this.tail.next = null
      }

      return popped
    },
    insertAtIndex(index, value) {
      const length = this.getLength()
      if (index >= length || index < 0) {
        throw new Error('IndexOutOfBound')
      }
      const node = {
        value,
        next: null,
      }

      if (index === 0) {
        node.next = this.head
        this.head = node
      } else {
        let prevNode = this.nodeAtIndex(index - 1)
        node.next = prevNode.next
        prevNode.next = node
      }

      return node
    },
    removeAtIndex(index) {
      const length = this.getLength()
      if (index >= length || index < 0) {
        throw new Error('IndexOutOfBound')
      }
      let removed = null
      if (index === 0) {
        removed = this.head
        this.head = this.head.next
      } else if (index === length - 1) {
        removed = this.pop()
      } else {
        let prevNode = this.nodeAtIndex(index - 1)
        removed = prevNode.next
        prevNode.next = prevNode.next.next
      }
      return removed
    },
    toString() {
      let stringRep = ''

      for (let temp = this.head; temp !== null; temp = temp.next) {
        stringRep += temp.value
        if (temp.next !== null) {
          stringRep += '->'
        }
      }
      return stringRep
    },
    [Symbol.iterator]: function () {
      let currentIndex = 0
      return {
        next: () => {
          if (currentIndex > this.getLength()) {
            currentIndex = this.getLength()
          }
          let isDone = currentIndex === this.getLength()
          return {value: this.nodeAtIndex(currentIndex++)?.value, done: isDone}
        },
      }
    },
  }
}
