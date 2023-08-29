/**
 * Creates a linked list and returns it
 * Linked list is made up of List nodes. Each node has the following structure
 * {
 *  value: <some value>,
 *  next: <a reference to another list node>
 * }
 * And for the users of such a list, we need a wrapper object which is going to maintain
 * the link to the head and tail of such a list of nodes. And also it should help pushing and popping
 * nodes, and also
 * @returns
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
    }, // should create a node and insert to the end,
    pop() {
      // should return the last node
      const popped = this.tail
      if (this.head === this.tail) {
        this.head = null
        this.tail = null
      } else {
        const length = this.getLength()
        let temp = this.head
        for (let i = 1; i < length - 1; i++) {
          temp = temp.next
        }
        temp.next = null
        this.tail = temp
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
        let temp = this.head
        for (let i = 0; i < index - 1; i++) {
          temp = temp.next
        }

        node.next = temp.next
        temp.next = node
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
      } else {
        let temp = this.head
        for (let i = 0; i < index - 1; i++) {
          temp = temp.next
        }
        removed = temp.next
        temp.next = temp.next.next
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
  }
}
