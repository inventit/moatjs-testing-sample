var nodeUnit = require('nodeunit'),
    sinon = require('sinon'),
    script = require('path').resolve('./src/scenario01.js'),
    moat = require('moat');

module.exports = nodeUnit.testCase({

  setUp: function(callback) {
    require.cache[script] = null;
    callback();
  },
  
  tearDown: function(callback) {
    callback();
  },

  'An exception should be thrown if "temperature" does not exist' : function(assert) {
    var context = moat.init(sinon),
        session = context.session;

    // Setup the mock data
    context.setObjects({
      humidity: 80.5,
      timestamp: 1435552370271
    });

    // Run the test target script
    assert.throws(function() {
      require(script);
    });

    assert.equal(false, session.fetchUrlSync.called);

    assert.done();
  },

  'An exception should be thrown if "humidity" does not exist' : function(assert) {
    var context = moat.init(sinon),
        session = context.session;

    // Setup the mock data
    context.setObjects({
      temperature: 25.8,
      timestamp: 1435552370271
    });

    // Run the test target script
    assert.throws(function() {
      require(script);
    });

    assert.equal(false, session.fetchUrlSync.called);

    assert.done();
  },

  'An exception should be thrown if "timestamp" does not exist' : function(assert) {
    var context = moat.init(sinon),
        session = context.session;

    // Setup the mock data
    context.setObjects({
      temperature: 25.8,
      humidity: 80.5
    });

    // Run the test target script
    assert.throws(function() {
      require(script);
    });

    assert.equal(false, session.fetchUrlSync.called);

    assert.done();
  },

  'An exception should be thrown if the model object is not an array' : function(assert) {
    var context = moat.init(sinon),
        session = context.session;

    // Setup the mock data
    context.setObjects([{
      temperature: 25.8,
      humidity: 80.5,
      timestamp: 1435552370271
    }]);

    // Run the test target script
    assert.throws(function() {
      require(script);
    });

    assert.equal(false, session.fetchUrlSync.called);

    assert.done();
  },

  'Should be successfully terminated with 200 OK.': function(assert) {
    var context = moat.init(sinon),
        session = context.session;

    var obj = {
      temperature: 25.8,
      humidity: 80.5,
      timestamp: 1435552370271
    };
    context.setObjects(obj);

    session.fetchUrlSync.returns({
      responseCode: 200
    });

    assert.doesNotThrow(function() {
      require(script);
    });

    assert.equal(true, session.fetchUrlSync.calledOnce);
    assert.equal(true, session.fetchUrlSync.calledWith('http://localhost/sensingdata', {
      method: 'POST',
      contentType: 'application/json',
      payload: JSON.stringify(obj)
    }));

    assert.done();
  },

  'An exception should be thrown on receiving NOT 200 OK.': function(assert) {
    var context = moat.init(sinon),
        session = context.session;

    var obj = {
      temperature: 25.8,
      humidity: 80.5,
      timestamp: 1435552370271
    };
    context.setObjects(obj);

    session.fetchUrlSync.returns({
      responseCode: 400
    });

    assert.throws(function() {
      require(script);
    });

    assert.equal(true, session.fetchUrlSync.calledOnce);
    assert.equal(true, session.fetchUrlSync.calledWith('http://localhost/sensingdata', {
      method: 'POST',
      contentType: 'application/json',
      payload: JSON.stringify(obj)
    }));

    assert.done();
  }

});
