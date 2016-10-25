module.exports = function (wallaby) {
  return {
    "files": [
      // The Mocha helper must be here so that `buildMochaOpts` can find it
      "test/test_helper.js",

      'package.json',
      { pattern: "src/**/*.js", load: false },
      "test/mocks/*.js",
      "test/core/network.fbp",
      "test/components/*.txt"
    ],
    "tests": [
      "test/core/*.js",
      "test/components/*.js"
    ],
    "compilers": {
      "**/*.js": wallaby.compilers.babel()
    },
    "testFramework": "mocha",
    "env": {
      "type": "node",
      "runner": "node"
    },

    bootstrap: function () {
      require('./test/test_helper');
    }
  }
};