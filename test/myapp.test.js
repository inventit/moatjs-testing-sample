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
    // record state
    var context = moat.init(sinon);
  
    // Run the script (replay state)
    require(script);

    assert.done();
  }
});
