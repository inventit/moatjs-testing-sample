/*
 * JobServiceID:
 * urn:moat:${APP_ID}:${PACKAGE_ID}:${OPERATION}:${VERSION}
 * Description: Note about your app
 */
var moat = require('moat');
var context = moat.init();
var session = context.session;
var clientRequest = context.clientRequest;

var resp = session.fetchUrlSync(
  'http://localhost',
  {
    method: 'POST',
    contentType: 'application/json',
    payload: JSON.stringify(clientRequest.objects)
  },
  function(resp) {
    session.log(resp);
    return resp;
  });

if (parseInt(resp.responseCode / 100) === 2) {
  session.log('Succeess!');
} else {
  session.log('Failed!');
  throw 'Failed to post data: ' + resp.responseCode;
}
