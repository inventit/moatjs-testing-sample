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

  'Your first unit test' : function(assert) {
    var context = moat.init(sinon);
    var session = context.session;

    // Setup the dummy data
    var objs = [{firstname: 'John', lastname: 'Doe'}];
    context.setObjects(objs);

    session.fetchUrlSync.returns({responseCode: 200});

    var url = 'http://localhost',
        req = {
          method: 'POST',
          contentType: 'application/json',
          payload: JSON.stringify(objs)
        };

    // Run the test target script
    assert.doesNotThrow(function() {
      require(script);
    });

    // Check assertions
    assert.ok(session.fetchUrlSync.calledOnce);

    assert.ok(session.fetchUrlSync.withArgs(url, req).calledOnce);

    var result = session.fetchUrlSync(url, req);
    assert.deepEqual({responseCode: 200}, result);

    assert.done();
  }

});
