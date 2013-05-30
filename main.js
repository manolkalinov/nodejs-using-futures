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

// Doing async work with 
function doAsyncWorkWithFiber () {
  var fiber = Fiber.current;

  setTimeout(function () {
    fiber.run('result of work');
  }, 3000);

  var results = Fiber.yield();

  return results;
}

var handleRequest = function (i) {
  Fiber(function () {

    print(i, 'handling request');

    var results = doAsyncWorkWithFiber();

    print(i, 'after doAsyncWorkCall with result ' + results);

  }).run();
}

handleRequest(1);
handleRequest(2);
handleRequest(3);
/*****************************************************************************/
