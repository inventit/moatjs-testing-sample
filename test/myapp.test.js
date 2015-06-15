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
    var url = 'http://localhost';
    // Post data
    var objects = [{
      firstname: 'John',
      lastname: 'Doe'
    }];
    var args = {};
    context.setDevice('uid', 'deviceId', 'name', 'status', 'clientVersion', 0);
    context.setDmjob('uid', 'deviceId', 'name', 'status', 'jobServiceId',
                     'sessionId', args, 'createdAt', 'activatedAt', 'startedAt',
                     'expiredAt', 'http', url);
    context.setObjects(objects);
    var session = context.session;

    // Run the script
    require(script);

    assert.equal(true, session.fetchUrlSync.calledOnce);
    assert.equal(true, session.fetchUrlSync.withArgs(url, {
      method: 'POST',
      contentType: 'application/json',
      payload: JSON.stringify(objects)
    }).calledOnce);
    assert.done();
  }

});
