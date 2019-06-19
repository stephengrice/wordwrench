const assert = require('assert');
const sinon = require('sinon');
const jsdom = require('jsdom');
const $ = require('jquery')(new jsdom.JSDOM(`<!DOCTYPE html><html></html>`).window);

const TopicLearner = require('../topic-learner');

describe('Topic Learner', () => {
  beforeEach(function() {
    var ajaxStub = sinon.stub($, 'ajax');
    ajaxStub.yieldsTo('success', 'hey');
    sinon.stub($, 'ajax').withArgs('http://www.google.com').returns({
      done: (callback) => {
        callback('hey');
      }
    });
  });
  afterEach(function() {
    $.ajax.restore();
  });
  it('stubs ajax method', () => {
    let val = $.ajax('http://www.google.com').done(function(data) {
      assert.equal(data, 'hey');
    });
  });
});
