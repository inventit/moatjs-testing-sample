/*
 * JobServiceID:
 * urn:moat:${APP_ID}:${PACKAGE_ID}:${OPERATION}:${VERSION}
 * Description: Note about your app
 */
var moat = require('moat');
var context = moat.init();
var session = context.session;

session.log('myapp', 'Start myapp');
