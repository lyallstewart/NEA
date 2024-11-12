const http = require('http');
const url = require('url');

class RequestQueue {
  constructor() {
    this.queue = [];
  }
  enqueue(req, priority) {
    this.queue.push({req, priority});
    this.queue.sort((a, b) => a.priority - b.priority);
  }
  dequeue() {
    return this.queue.shift()?.req || null;
  }
  isEmpty() {
    return this.queue.length === 0;
  }
}
