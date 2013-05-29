/************************ Utils **********************************************/
var colors = {
  reset: '\033[0m',
  index: [
    '\033[31m', /* red */
    '\033[32m', /* green */
    '\033[33m', /* yellow */
    '\033[34m', /* blue */
    '\033[35m'  /* magenta */
  ]
};

global.print = function (i, msg) {
  console.log(colors.index[i-1] + i + '. ' + msg + colors.reset);
}
/*****************************************************************************/
