/*
 * JobServiceID:
 * urn:moat:${APP_ID}:${PACKAGE_ID}:${OPERATION}:${VERSION}
 * Description: Note about your app
 */
var moat = require('moat');
var context = moat.init();
var session = context.session;
var clientRequest = context.clientRequest;

session.fetchUrlSync(
  'http://localhost',
  {
    method: 'POST',
    contentType: 'application/json',
    payload: JSON.stringify(clientRequest.objects)
  },
  function(resp) {
    return resp;
  });
