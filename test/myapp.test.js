var nodeUnit = require('nodeunit');
var sinon = require('sinon');
var script = require('path').resolve('./src/myapp.js');
var moat = require('moat');

module.exports = nodeUnit.testCase({

  setUp: function(callback) {
    require.cache[script] = null;
    callback();
  },
  
  tearDown: function(callback) {
    callback();
  },

  'Write your unit test' : function(assert) {
    var context = moat.init(sinon);
    var session = context.session;

    // Setup the dummy data
    var objs = [{ firstname: 'John', lastname: 'Doe' }];
    context.setObjects(objs);

    // Run the test target script
    require(script);

    // Check assertions
    assert.equal(true, session.fetchUrlSync.calledOnce);
    assert.equal(true, session.fetchUrlSync.withArgs('http://localhost', {
      method: 'POST',
      contentType: 'application/json',
      payload: JSON.stringify(objs)
    }).calledOnce);

    assert.done();
  }

});
