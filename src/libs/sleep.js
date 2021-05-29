/* eslint-disable require-jsdoc */

async function sleep(msec) {
  return new Promise((resolve) => setTimeout(resolve, Math.max(0, msec)));
}

export {sleep};
