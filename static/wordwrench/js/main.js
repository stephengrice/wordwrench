$(document).ready(function() {
  // Initialize any learner objects on the page
  $('#learner').each(function() {
    new TopicLearner($(this));
  });
});
