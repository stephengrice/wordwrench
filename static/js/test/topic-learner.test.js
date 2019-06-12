const assert = require('assert');
const sinon = require('sinon');

const TopicLearner = require('../topic-learner');

describe('Topic Learner', () => {
  var logStub, errorStub;
  beforeEach(() => {
    // stub console methods
    logStub = sinon.stub(console, 'log');
    errorStub = sinon.stub(console, 'error');
  });
  afterEach(() => {
    logStub.restore();
    errorStub.restore();
  });
  it('will log "nothing" when foo method called', () => {
    let learner = new TopicLearner();
    learner.foo();
    assert(errorStub.notCalled);
    assert(logStub.called);
    assert(logStub.calledWithExactly('nothing'));
  });
});
