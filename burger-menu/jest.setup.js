import '@testing-library/jest-dom';
import 'jest-matchmedia-mock';

global.matchMedia =
  global.matchMedia ||
  function () {
    return {
      matches: false,
      addListener: function () {},
      removeListener: function () {},
    };
  };