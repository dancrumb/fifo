# FIFO

This is an event-emitting implementation of a First-In-First-Out (FIFO) buffer.

A FIFO buffer (also known as a queue) is a simple ordered structure, where values
can be _enqueued_ to the back of the queue and _dequeued_ from the front of the queue.

This implementation provides that functionality with the addition of some
event emitting to help respond to changes of state to the FIFO.
