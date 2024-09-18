'use strict';

const buildComponentSetterPlugin = require('..');
const assert = require('assert').strict;

assert.strictEqual(buildComponentSetterPlugin(), 'Hello from buildComponentSetterPlugin');
console.info('buildComponentSetterPlugin tests passed');
