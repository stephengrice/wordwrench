const assert = require('assert');

const TopicLearner = require('../topic-learner');

describe('Topic Learner', () => {
  var $;
  before(function() {
    // Faking our JQuery method manually for now
    $ = {
      ajax: function(url, settings) {
        if (url == 'http://www.google.com') {
          return '{}';
        }
        return 'woohoo!';
      }
    };
  });
  it('stubs ajax method', () => {
    let val = $.ajax('http://www.google.com');
    assert.equal(val, '{}');
  });
});
