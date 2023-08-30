/**
 * Creates a linked list and returns it.
 * Linked list is made up of List nodes. Each node has the following structure
 * {
 *   value: <some value>
 *   next : <a reference to another list node>
 * }
 * And for the users of such a list, we need a wrapper object which is going to maintain
 * the link to the head and tail of such a list of nodes. And also it should help pushing and popping
 * nodes, and also the length of the list.
 * The linked list object will look like this:
 * {
 *   head,
 *   tail,
 *   getLength(),
 *   push(value)
 *   pop()
 *
 * }
 * @returns linked list object
 */
function createList() {
  return {
    head: null,
    tail: null,
    getLength() {
      let length = 0
      let node = this.head
      while (node !== null) {
        length++
        node = node.next
      }
      return length
    },
    push(value) {
      // First create a new node
      const node = {value, next: null}

      // if head and tail are null, we need to assign them to the newly created node.
      if (this.head === null) {
        this.head = node
      }
      if (this.tail === null) {
        this.tail = node
      }

      // insert the node created only if it is not same as current tail
      if (node !== this.tail) {
        // node is not the only node in the list
        this.tail.next = node
        this.tail = node
      }

      return node
    }, // should create a node and insert to the end.
    pop() {
      //  check if the list contains only one node, if so remove it from list and return it.
      if (this.head !== null && this.head === this.tail) {
        const popped = this.head
        this.head = null
        this.tail = null
        return popped
      }
      // We should get the penultimate node, and set
      // and make it the tail.
      // penultimate node is at length-2
      const penultimate = this.nodeAtIndex(this.getLength() - 2)
      const nodeToPop = this.tail
      this.tail = penultimate
      this.tail.next = null
      return nodeToPop
    }, // should return the node that was popped out.

    toString() {
      // v1->v2->v3
      // ''
      // v1
      let node = this.head
      let stringRep = ''

      while (node !== null) {
        stringRep += node.value
        if (node.next !== null) {
          stringRep += '->'
        }
        node = node.next
      }

      return stringRep
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
    [Symbol.iterator]: function () {
      let currentIndex = 0
      // must return an iterator
      let that = this
      return {
        next() {
          if (currentIndex > that.getLength()) {
            currentIndex = that.getLength()
          }
          let isDone = currentIndex === that.getLength()

          return {value: that.nodeAtIndex(currentIndex++), done: isDone}
        },
      }
    },
  }
}

export {createList}
