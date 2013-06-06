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

// Using Fibers
function doAsyncWorkWithFiber () {
  var fiber = Fiber.current;
  setTimeout(function () {
    fiber.run('result of work');
  }, 3000);

  var results = Fiber.yield();

  return results;
}

// Using Futures
//  - call wait() on return value to yield to another fiber
function doAsyncWorkWithFuture () {
  var future = new Future;
  setTimeout(function () {
    future.return('result of work');
  }, 3000);
  return future;
}


// Wrapping with Futures when we don't control the underlying api
//  - call wait() on return value to yield to another fiber
function wrapDoAsyncWork () {
  var future = new Future;
  doAsyncWork(future.resolver());
  return future;
}

var handleRequest = function (i) {
  var results;

  print(i, 'handling request');
  results = wrapDoAsyncWork().wait();
  print(i, 'after doAsyncWorkCall with result ' + results);

}.future();

handleRequest(1);
handleRequest(2);
handleRequest(3);
/*****************************************************************************/
