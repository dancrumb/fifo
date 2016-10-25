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
   * @property {number} Number of items currently in the FIFO queue
   */
  get length () {
    return this.queue.length
  }

  /**
   * Enqueue a value to the FIFO
   *
   * @param {*} value A value to be enqueue to the FIFO
   * @fires FIFO#valueAdded
   * @fires FIFO#noLongerEmpty
   */
  enqueue(value) {
    this.queue.push(value);
    this.emit('valueAdded');
    if (this.length === 1) {
      this.emit('noLongerEmpty');
    }
  }

  /**
   * Dequeues a value from the FIFO
   *
   * @returns {*}
   * @fires FIFO#valueRemoved
   * @fires FIFO#empty
   */
  dequeue() {
    if (this.isEmpty()) {
      return null;
    }
    const value = this.queue.shift();

    this.emit('valueRemoved');
    if (this.isEmpty()) {
      this.emit('empty');
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
   * @fires FIFO#empty
   */
  reset(data) {
    this.queue = data || [];
    if (this.length === 0) {
      this.emit('empty');
    }
  }
}

/**
 * Fired whenever the FIFO drops to empty
 *
 * @event FIFO#empty
 */

/**
 * Fired when a value is added to an empty FIFO
 *
 * @event FIFO#noLongerEmpty
 */

/**
 * Fired whenever a value is added to the FIFO
 *
 * @event FIFO#valueAdded
 */

/**
 * Fired whenever a value is removed from the FIFO
 *
 * @event FIFO#valueRemoved
 */


export default FIFO;
