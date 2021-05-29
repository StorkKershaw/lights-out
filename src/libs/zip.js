/* eslint-disable require-jsdoc */

import {range} from './range';

function* zip(...arrays) {
  const length = Math.min(...arrays.map(({length}) => length));

  for (const index of range(length)) {
    yield arrays.map((array) => array[index]);
  }
}

export {zip};
