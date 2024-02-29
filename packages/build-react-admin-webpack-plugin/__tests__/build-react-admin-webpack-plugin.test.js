'use strict';

const buildReactAdminWebpackPlugin = require('..');
const assert = require('assert').strict;

assert.strictEqual(buildReactAdminWebpackPlugin(), 'Hello from buildReactAdminWebpackPlugin');
console.info('buildReactAdminWebpackPlugin tests passed');
