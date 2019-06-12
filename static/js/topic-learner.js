var TopicLearner = (function() {
  var TopicLearner = function(options) {
    // Constructor
  };

  TopicLearner.prototype.foo = function foo() {
    console.log('nothing');
  };

  return TopicLearner;
})();

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = TopicLearner;
} else {
  window.TopicLearner = TopicLearner;
}
