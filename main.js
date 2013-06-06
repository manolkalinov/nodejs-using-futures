/************************ require ********************************************/
require('./utils.js');
var Fiber = require('fibers');
var Future = require('fibers/future');
/*****************************************************************************/

/************************ main ***********************************************/
function doAsyncWork (callback) {
  setTimeout(function () {
    callback && callback(null /* no error */, 'hello world');
  }, 3000);
}

// Doing async work with Fibers
function doAsyncWorkWithFiber () {
  var fiber = Fiber.current;

  setTimeout(function () {
    fiber.run('result of work');
  }, 3000);

  var results = Fiber.yield();

  return results;
}

var wrapAsyncWorkWithFuture = Future.wrap(doAsyncWork);

function doAsyncWorkWithFuture () {
  var future = new Future;

  setTimeout(function () {
    future.return('result of work');
  }, 3000);

  return future.wait();
}

var handleRequest = function (i) {
    print(i, 'handling request');
    var results = wrapAsyncWorkWithFuture().wait();
    print(i, 'after doAsyncWorkCall with result ' + results);
}.future();

handleRequest(1);
handleRequest(2);
handleRequest(3);
/*****************************************************************************/
