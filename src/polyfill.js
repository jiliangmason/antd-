import 'core-js/es6/map';
import 'core-js/es7/set';

global.requestAnimationFrame = global.requestAnimationFrame || function requestAnimationFrame(cb) {
  setTimeout(cb, 0);
};
