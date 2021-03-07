const { InternalError } = require('../errorTypes');

/**
  * Check that all elements from arr1 includes to arr2
  *
  * @param {Array} arr1 - array to check
  * @param {Array} arr2 - reference array
  * @return {Boolean} - true if element from arr1 includes to arr2, in other case return false
*/
const contains = (arr1, arr2) => {
  if (!Array.isArray(arr1)) throw new InternalError('arr1 must be array!');
  if (!Array.isArray(arr2)) throw new InternalError('arr2 must be array!');

  let flag = true;
  arr1.forEach((item) => {
    if (!arr2.includes(item)) {
      flag = false;
    }
  });

  return flag;
};

module.exports = contains;
