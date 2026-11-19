'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const html = fs.readFileSync('index.html', 'utf8');
const source = html.slice(html.indexOf('function calculNappeCompression('), html.indexOf('function calculer() {'));
const context = { num: x => Number(x) || 0 }; vm.createContext(context); vm.runInContext(source, context);
const result = context.calculNappeCompression(10, 5, 20, 25, 30);
assert.ok(Math.abs(result.metres - 471) < 1e-9); // 50×5,3 + 20×10,3
assert.equal(result.exact, 471 / 12); assert.equal(result.barres, 40);
assert.equal(context.calculNappeCompression(10, 5, 0, 25, 30).barres, 0);
assert.equal(context.calculNappeCompression(10, 5, 20, 0, 30).barres, 0);
assert.equal(context.calculNappeCompression(-10, 5, 20, 25, 30).barres, 0);
assert.equal(context.calculNappeCompression(2, 2, 100, 100, 0).barres, 1);
for (const id of ['cc-nappe-L', 'cc-nappe-l', 'cc-nappe-esp-L', 'cc-nappe-esp-l', 'cc-nappe-crochet', 'cc-nappe-nuance', 'cc-nappe-diam']) assert.ok(html.includes(`'${id}'`));
assert.match(html, /corpscompression:/); assert.match(html, /estLigneFerCompressionCorps\(l\)/);
console.log('✓ nappe de compression : formule, unités, arrondi et intégration');
