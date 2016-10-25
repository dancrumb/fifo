import chai from 'chai';
import sinonChai from 'sinon-chai';
import sinon from 'sinon';
import FIFO from '../src/FIFO';

chai.use(sinonChai);
const expect = chai.expect;

describe('Event Emitting FIFO', function () {
  it('allows users to enqueue values', function () {
    var fifo = new FIFO();

    fifo.enqueue(1);
    expect(fifo.length).to.equal(1);
    fifo.enqueue(1);
    expect(fifo.length).to.equal(2);
  });

  it('allows users to dequeue values', function () {
    var fifo = new FIFO();

    fifo.enqueue(1);
    fifo.enqueue(2);

    expect(fifo.dequeue()).to.equal(1);
    expect(fifo.dequeue()).to.equal(2);
    expect(fifo.dequeue()).to.be.null;
  });

  it('reports that it is empty (whenever it is empty)', function () {
    var fifo = new FIFO();
    expect(fifo.isEmpty()).to.be.true;
    fifo.enqueue(1);
    expect(fifo.isEmpty()).to.be.false;
  });

  it('fires a "noLongerEmpty" when the FIFO ceases to be empty', function (done) {
    var fifo = new FIFO();
    var eventSpy = sinon.spy();

    fifo.on('noLongerEmpty', eventSpy);
    fifo.enqueue(1);

    process.nextTick(function () {
      expect(eventSpy).to.have.been.calledOnce;
      done();
    });
  });

  it('fires a "empty" when the FIFO becomes empty', function (done) {
    var fifo = new FIFO();
    var eventSpy = sinon.spy();

    fifo.on('empty', eventSpy);
    fifo.enqueue(1);
    fifo.dequeue();

    process.nextTick(function () {
      expect(eventSpy).to.have.been.calledOnce;
      done();
    });
  });

  it('fires a "valueAdded" when a value is enqueued to the FIFO', function (done) {
    var fifo = new FIFO();
    var eventSpy = sinon.spy();

    fifo.on('valueAdded', eventSpy);
    fifo.enqueue(1);

    process.nextTick(function () {
      expect(eventSpy).to.have.been.calledOnce;
      done();
    });
  });

  it('fires a "valueRemoved" when a value is dequeued from the FIFO', function (done) {
    var fifo = new FIFO();
    var eventSpy = sinon.spy();

    fifo.on('valueRemoved', eventSpy);
    fifo.enqueue(1);
    fifo.dequeue();

    process.nextTick(function () {
      expect(eventSpy).to.have.been.calledOnce;
      done();
    });
  });

  it('can be reset to be empty', function () {
    var fifo = new FIFO();
    expect(fifo.isEmpty()).to.be.true;
    fifo.enqueue(1);
    fifo.enqueue(2);
    fifo.enqueue(3);
    expect(fifo.isEmpty()).to.be.false;
    fifo.reset();
    expect(fifo.isEmpty()).to.be.true;
  });

  it('can be reset to a starting queue', function () {
    var fifo = new FIFO();
    expect(fifo.isEmpty()).to.be.true;
    fifo.reset([1,2,3]);
    expect(fifo.length).to.equal(3);
    expect(fifo.dequeue()).to.equal(1);
    expect(fifo.dequeue()).to.equal(2);
    expect(fifo.dequeue()).to.equal(3);
  })
});
