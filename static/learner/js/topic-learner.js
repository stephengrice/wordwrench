var INNER_HTML = ' \
  <div id="progress_bar"> \
    <div id="solid"></div> \
  </div> \
  <div id="lbl_prompt"></div> \
  <div id="lbl_translation"></div> \
  <input id="txt_answer" /> \
  <div id="lbl_grade"></div> \
  <button id="btn_next">Next</button> \
  ';

var TopicLearner = (function() {
  var TopicLearner = function(params) {
    // Constructor
    if (params === undefined || params['element'] === undefined || params['language'] === undefined || params['topic'] === undefined) {
      throw new Error("You must provide an object with element, language, and topic to instantiate TopicLearner");
    }
    if (params['element'].length == 0) {
      throw new Error(`The element provided was not found in the DOM`)
    }
    this.element = params['element'];
    this.element.html(INNER_HTML);
    // Sub-element init
    this.progress_bar = this.element.find('#progress_bar');
    this.lbl_prompt = this.element.find('#lbl_prompt');
    this.lbl_translation = this.element.find('#lbl_translation');
    this.txt_answer = this.element.find('#txt_answer');
    this.lbl_grade = this.element.find('#lbl_grade');
    this.btn_next = this.element.find('#btn_next');
    // Fields
    this.language = params['language'];
    this.topic = params['topic'];
    this.topic_data = null;
    this.loaded = false;
    this.setPercentage(0.0);
  };

  TopicLearner.prototype.API_ENDPOINT = '/api/topic';

  TopicLearner.prototype.getPercentage = function() {
    return this.percentage;
  };

  TopicLearner.prototype.setPercentage = function(percentage) {
    this.progress_bar.find('#solid').css('width', (percentage * 100) + '%');
    this.percentage = percentage
  }

  TopicLearner.prototype.load = function() {
    let that = this; // address scope issue in done()
    $.ajax({
      url: TopicLearner.API_ENDPOINT,
      data: {
        topic: this.topic,
        language: this.language
      }
    }).done(function(data) {
      if (data === undefined || data.constructor !== Array) {
        throw new Error('Invalid JSON response received: not an array');
      }
      that.storeData(data);
    }).fail(function(error) {
      throw new Error('Failed to get data: ' + error);
    });
  };

  TopicLearner.prototype.storeData = function(data) {
    this.topic_data = data;
  };

  return TopicLearner;
})();

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = TopicLearner;
} else {
  window.TopicLearner = TopicLearner;
}
