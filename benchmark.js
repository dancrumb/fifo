import Benchmark from 'benchmark';
import FIFO from './lib/FIFO';

var suite = new Benchmark.Suite;

// add tests
var f = new FIFO();
suite
  .add('FIFO', function() {
    f.reset();
    var i;
    for(i=0; i++; i < 100) {
      f.enqueue(i);
    }
    for(i=0; i++; i < 100) {
      f.dequeue();
    }
    for(i=0; i++; i < 100) {
      if(Math.random() > 0.5) {
        f.enqueue(i)
      } else {
        f.dequeue();
      }
    }
  })
  .add('Array', function() {
    var f = [];
    var i;
    for(i=0; i++; i < 100) {
      f.push(i);
    }
    for(i=0; i++; i < 100) {
      f.shift();
    }
    for(i=0; i++; i < 100) {
      if(Math.random() > 0.5) {
        f.push(i);
      } else {
        f.shift();
      }
    }
  })
  .on('cycle', function(event) {
    console.log(String(event.target));
  })
  .on('complete', function() {
    console.log('Fastest is ' + this.filter('fastest').map('name'));
  })
  // run async
  .run({async:true});
