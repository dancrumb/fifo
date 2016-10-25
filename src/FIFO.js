import {
  EventEmitter
} from 'events';

/**
 * FIFO queue implementation
 */
class FIFO extends EventEmitter {
  constructor() {
    super();

    this.reset();
  }

  /**
   * Enqueue a value to the FIFO
   *
   * @param {*} value A value to be enqueue to the FIFO
   * @fires FIFO#fifoValueAdded
   * @fires FIFO#fifoNoLongerEmpty
   */
  enqueue(value) {
    this.queue.push(value);
    this.length += 1;
    this.emit('fifoValueAdded');
    if (this.length === 1) {
      this.emit('fifoNoLongerEmpty');
    }
  }

  /**
   * Dequeues a value from the FIFO
   *
   * @returns {*}
   * @fires FIFO#fifoValueRemoved
   * @fires FIFO#fifoEmpty
   */
  dequeue() {
    if (this.isEmpty()) {
      return null;
    }
    const value = this.queue[this.cursor];
    this.cursor += 1;
    this.length -= 1;
    if (this.cursor > this.queue.length / 2) {
      this.queue = this.queue.slice(this.cursor);
      this.length = this.queue.length;
      this.cursor = 0;
    }
    this.emit('fifoValueRemoved');
    if (this.isEmpty()) {
      this.emit('fifoEmpty');
    }

    return value;
  }

  /**
   * Checks whether the FIFO is empty
   * @returns {boolean}
   */
  isEmpty() {
    return this.length === 0;
  }

  /**
   * Clears the FIFO and prepares it for use
   * @fires FIFO#fifoEmpty
   */
  reset(data) {
    this.cursor = 0;
    this.queue = data || [];
    this.length = this.queue.length;
    if (this.length === 0) {
      this.emit('fifoEmpty');
    }
  }
}

/**
 * Fired whenever the FIFO drops to empty
 *
 * @event FIFO#fifoEmpty
 */

/**
 * Fired when a value is added to an empty FIFO
 *
 * @event FIFO#fifoNoLongerEmpty
 */


/**
 * Fired whenever a value is added to the FIFO
 *
 * @event FIFO#fifoValueAdded
 */

/**
 * Fired whenever a value is removed from the FIFO
 *
 * @event FIFO#fifoValueRemoved
 */


export default FIFO;
