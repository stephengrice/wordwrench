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

const TopicLearner = require('../topic-learner');

describe('Topic Learner', () => {
  var learner;
  beforeEach(function() {
    learner = new TopicLearner($('#learner'));
  });
  it('throws an error without an element argument', () => {
    assert.throws(() => {
      let learner = new TopicLearner();
    }, Error);
  });
  it('instantiates successfully with an element argument', () => {
    let mlearner = new TopicLearner($('#learner'));
  });
  it('sets element field to the one passed in constructor', () => {
    assert.equal(learner.element.attr('id'), $('#learner').attr('id'));
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
  })
});

function assertHasElement(learner, element_id) {
  assert.notEqual(learner[element_id], undefined, `Element ${element_id} is undefined`);
  assert.equal(learner[element_id].attr('id'), $(`#learner #${element_id}`).attr('id'));
  assert.equal(learner[element_id].length, 1);
}
