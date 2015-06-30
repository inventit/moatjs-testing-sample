var moat = require('moat'),
    context = moat.init(),
    session = context.session,
    clientRequest = context.clientRequest;

var TAG = 'upload-sensing-data';

function isValidSensingData(sensingData) {
  if (Array.isArray(sensingData)) {
    session.log(TAG, 'Model object must not be an array.');
    return false;
  }

  // Check if the mandatory fields exist.
  var fields = ['temperature', 'humidity', 'timestamp'];
  for (var i = 0; i < fields.length; i++) {
    if (!sensingData.hasOwnProperty(fields[i])) {
      session.log(TAG, fields[i] + ' must exist in model object.');
      return false;
    }
  }

  return true;
}

function main() {
  var sensingData = clientRequest.objects;
  if (!isValidSensingData(sensingData)) {
    throw 'Invalid model object.';
  }

  var resp = session.fetchUrlSync('http://localhost/sensingdata', {
    method: 'POST',
    contentType: 'application/json',
    payload: JSON.stringify(sensingData)
  });

  if (parseInt(resp.responseCode / 100) === 2) {
    session.log(TAG, 'Success!');
  } else {
    throw 'Failed to post data: ' + resp.responseCode;
  }
}

main();
