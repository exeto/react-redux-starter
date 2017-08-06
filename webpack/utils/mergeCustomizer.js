'use strict';

module.exports = function (objValue, srcValue) {
  if (Array.isArray(objValue) && Array.isArray(srcValue)) {
    return objValue.concat(srcValue);
  }

  return undefined;
};
