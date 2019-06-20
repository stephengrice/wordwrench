const assert = require('assert');
const sinon = require('sinon');
const jsdom = require('jsdom');
const $ = require('jquery')(new jsdom.JSDOM(`
  <!DOCTYPE html>
  <html>
  <body>
    <div id="learner"></div>
  </body>
  </html>
`).window);
global.$ = $;

const TopicLearner = require('../topic-learner');

describe('Topic Learner', () => {
  var learner;
  var server;
  beforeEach(function() {
    learner = new TopicLearner($('#learner'), 'spanish', 'sample');

    server = sinon.fakeServer.create();
    // stubAjax = sinon.stub($, 'ajax').returns();
    // stubAjax.yieldsTo('success', 'hi');
    // sinon.replace($, 'ajax', sinon.fake());
  });
  afterEach(function() {
    server.restore();
  });
  it('throws an error with less than three arguments', () => {
    assert.throws(() => {
      let learner = new TopicLearner();
    }, Error);
    assert.throws(() => {
      let learner = new TopicLearner($('#learner'));
    }, Error);
    assert.throws(() => {
      let learner = new TopicLearner($('#learner'), 'not a lang');
    }, Error);
  });
  it('instantiates successfully with element, language, and topic arguments', () => {
    let mlearner = new TopicLearner($('#learner'), 'spanish', 'sample');
  });
  it('sets elements, language, and topic fields to the ones passed in constructor', () => {
    assert.equal(learner.element.attr('id'), $('#learner').attr('id'));
    assert.equal(learner.language, 'spanish');
    assert.equal(learner.topic, 'sample');
  });
  it('throws an error when element is not found', () => {
    assert.throws(() => {
      let mlearner = new TopicLearner($('#not-an-element'));
    }, Error);
  });
  it('has a progress_bar', () => {
    assertHasElement(learner, 'progress_bar');
  });
  it('has a lbl_translation', () => {
    assertHasElement(learner, 'lbl_translation');
  });
  it('has a lbl_prompt', () => {
    assertHasElement(learner, 'lbl_prompt');
  });
  it('has a txt_answer', () => {
    assertHasElement(learner, 'txt_answer');
  });
  it('has a lbl_grade', () => {
    assertHasElement(learner, 'lbl_grade');
  });
  it('has a btn_next', () => {
    assertHasElement(learner, 'btn_next');
  });
  it('has a percentage with default of 0.0', () => {
    assert.equal(learner.percentage, 0.0);
  });
  it('sets progressbar solid when percentage is changed', () => {
    assert.equal(learner.progress_bar.find('#solid').css('width'), learner.percentage + "%");
    learner.setPercentage(0.5);
    assert.equal(learner.progress_bar.find('#solid').css('width'), (learner.percentage * 100) + "%");
  });
  it('has topic and topic_loaded fields with initial values', () => {
    assert.equal(learner.topic_data, null);
    assert.equal(learner.loaded, false);
  });
  it('sends ajax request when load() is called', () => {
    let spy = sinon.stub($, 'ajax');
    learner.load();
    assert($.ajax.calledOnce);
  });
});

function assertHasElement(learner, element_id) {
  assert.notEqual(learner[element_id], undefined, `Element ${element_id} is undefined`);
  assert.equal(learner[element_id].attr('id'), $(`#learner #${element_id}`).attr('id'));
  assert.equal(learner[element_id].length, 1);
}
