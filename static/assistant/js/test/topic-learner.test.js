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
    learner = new TopicLearner({
      element: $('#learner'),
      language: 'spanish',
      topic: 'sample'
    });

    server = sinon.fakeServer.create();
    // stubAjax = sinon.stub($, 'ajax').returns();
    // stubAjax.yieldsTo('success', 'hi');
    // sinon.replace($, 'ajax', sinon.fake());
  });
  afterEach(function() {
    server.restore();
  });
  it('throws an error with improper params object', () => {
    assert.throws(() => {
      let learner = new TopicLearner();
    }, Error);
    assert.throws(() => {
      let learner = new TopicLearner($('#learner'));
    }, Error);
    assert.throws(() => {
      let learner = new TopicLearner($('#learner'), 'not a lang');
    }, Error);
    assert.throws(() => {
      let learner = new TopicLearner({});
    }, Error);
  });
  it('instantiates successfully with element, language, and topic arguments', () => {
    let mlearner = new TopicLearner({
      element: $('#learner'),
      language: 'spanish',
      topic: 'sample'
    });
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
  describe('load()', () => {
    it('sends ajax request when called', () => {
      var returnObject = {
        done: () => {return returnObject},
        fail: () => {}
      };
      sinon.replace($, 'ajax', sinon.fake.returns(returnObject));

      learner.load();
      assert($.ajax.calledOnce);

      sinon.restore();
    });
    it('throws an error if ajax not successful', () => {
      let returnObject = {
        done: (callback) => {
          return returnObject;
        },
        fail: (callback) => {
          callback('404 error');
          return returnObject;
        }
      };
      sinon.replace($, 'ajax', sinon.fake.returns(returnObject));

      assert.throws(() => {
        learner.load();
      });

      sinon.restore();
    });
    it('sends an ajax request with topic and language', () => {
      let returnObject = {
        done: (callback) => {
          callback([]);
          return returnObject;
        },
        fail: (callback) => {
          return returnObject;
        }
      };
      let m_fake = sinon.fake.returns(returnObject);
      sinon.replace($, 'ajax', m_fake);
      let callobject = {
        url: TopicLearner.API_ENDPOINT,
        data: {
          language: 'spanish',
          topic: 'sample'
        }
      };

      learner.load();

      sinon.assert.calledWith(m_fake, callobject);
      sinon.restore();
    });
    it('throws an error if data received is not an array', () => {
      let returnObject = {
        done: (callback) => {
          callback('not an array');
          return returnObject;
        },
        fail: (callback) => {
          return returnObject;
        }
      };
      let m_fake = sinon.fake.returns(returnObject);
      sinon.replace($, 'ajax', m_fake);
      assert.throws(() => {
        learner.load();
      });
      sinon.restore();
    });
    it('calls the storeData callback', () => {
      let dataArray = ['data1','data2','data3'];
      let returnObject = {
        done: (callback) => {
          callback(dataArray);
          return returnObject;
        },
        fail: (callback) => {
          return returnObject;
        }
      };
      let m_fake = sinon.fake.returns(returnObject);
      sinon.replace($, 'ajax', m_fake);
      let m_spy = sinon.spy(learner, 'storeData');

      learner.load();
      sinon.assert.calledOnce(m_spy);

      sinon.restore();
    });
  }); // </describe load()>
  describe('storeData()', () => {
    it('restores received data in topic_data', () => {
      assert(learner.topic_data == null);
      let dataArray = ['data1','data2','data3'];
      learner.storeData(dataArray);
      assert.equal(learner.topic_data, dataArray);
    });
  }); // </describe storeData()>

}); // </describe TopicLearner>

function assertHasElement(learner, element_id) {
  assert.notEqual(learner[element_id], undefined, `Element ${element_id} is undefined`);
  assert.equal(learner[element_id].attr('id'), $(`#learner #${element_id}`).attr('id'));
  assert.equal(learner[element_id].length, 1);
}
