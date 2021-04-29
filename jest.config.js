const { resolve } = require('path');

const root = resolve(__dirname);

module.exports = {
  rootDir: root,
  displayName: 'root-tests',
  testMatch: ['<rootDir>/src/**/*.test.ts'], // for unit tests. End-to-end tests will be at /test folder
  testEnvironment: 'node',
  clearMocks: true,
  preset: 'ts-jest',
};
