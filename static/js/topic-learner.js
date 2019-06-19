var INNER_HTML = ' \
<div id="progress_bar"> \
  <div id="solid"></div> \
</div> \
<div id="lbl_prompt"></div> \
<div id="lbl_translation"></div> \
<input id="txt_answer" /> \
<div id="lbl_grade"></div> \
<button id="btn_next"></button> \
';

var TopicLearner = (function() {
  var TopicLearner = function(element) {
    // Constructor
    if (element === undefined) {
      throw new Error("You must provide an element to instantiate TopicLearner");
    }
    if (element.length == 0) {
      throw new Error(`The element provided was not found in the DOM`)
    }
    this.element = element;
    this.element.html(INNER_HTML);
    // Sub-element init
    this.progress_bar = element.find('#progress_bar');
    this.lbl_prompt = element.find('#lbl_prompt');
    this.lbl_translation = element.find('#lbl_translation');
    this.txt_answer = element.find('#txt_answer');
    this.lbl_grade = element.find('#lbl_grade');
    this.btn_next = element.find('#btn_next');
    // Fields
    this.setPercentage(0.0);
  };

  TopicLearner.prototype.getPercentage = function() {
    return this.percentage;
  };

  TopicLearner.prototype.setPercentage = function(percentage) {
    this.progress_bar.find('#solid').css('width', (percentage * 100) + '%');
    this.percentage = percentage
  }

  return TopicLearner;
})();

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = TopicLearner;
} else {
  window.TopicLearner = TopicLearner;
}
