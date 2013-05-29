/************************ require ********************************************/
var Fiber = require('fibers');
/*****************************************************************************/

/************************ main ***********************************************/
function doAsyncWork (i) {
  var fiber = Fiber.current;
  setTimeout(function () {
    fiber.run('result of work');
  }, 3000);

  var results = Fiber.yield();

  return results;
}

function handleRequest (i) {
  Fiber(function () {
    print(i, 'handling request');
    var results = doAsyncWork(i);
    print(i, 'after doAsyncWorkCall with result ' + results);
  }).run();
}

handleRequest(1);
handleRequest(2);
handleRequest(3);
/*****************************************************************************/
