/* eslint-disable require-jsdoc */

function* range(start, stop, step = 1) {
  if (stop === undefined) {
    stop = start;
    start = 0;
  }
  if (step === 0) {
    throw new Error('argument 3 must not be zero');
  }
  if (step > 0) {
    for (let count = start; count < stop; count += step) {
      yield count;
    }
  } else {
    for (let count = start; count > stop; count += step) {
      yield count;
    }
  }
}

export {range};
