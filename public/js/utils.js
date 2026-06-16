'use strict';

/**
 * Throttle a function call
 * @param {Function} fn
 * @param {number} delay
 * @returns {Function}
 */
function throttle(fn, delay) {
  let last = 0;
  return function (...args) {
    const now = Date.now();
    if (now - last >= delay) {
      last = now;
      fn.apply(this, args);
    }
  };
}
