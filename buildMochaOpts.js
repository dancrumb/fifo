import wallaby from './wallaby';
import glob from 'glob';
import _ from 'lodash';

const fakeWallaby = {
  compilers: {
    babel() {
      return "js:babel-register";
    }
  }
};

const config = wallaby(fakeWallaby);

const mochaRequire = config.files[0];
const compilers = config.compilers['**/*.js'];

const testFiles = _(config.tests).map(wildcard => glob.sync(wildcard)).flatten();

console.log(`--compilers ${compilers}`);
console.log(`--require ${mochaRequire}`);
console.log(testFiles.join("\n"));