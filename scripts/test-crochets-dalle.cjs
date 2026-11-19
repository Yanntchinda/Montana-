'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const html = fs.readFileSync('index.html', 'utf8');
const source = html.slice(html.indexOf('function calculFerLitDalle('), html.indexOf('function calculer() {'));
const context = { num: v => Number(v) || 0 }; vm.createContext(context); vm.runInContext(source, context);
const p = { L: 4, l: 3, n: 2 };
const lit1 = context.calculFerLitDalle(p, 1, 20, 30);
const lit2 = context.calculFerLitDalle(p, 2, 20, 0);
assert.equal(lit1.nb, 40); assert.equal(lit1.ml, 132);
assert.equal(lit2.nb, 30); assert.equal(lit2.ml, 120);
assert.equal(context.calculFerLitDalle(p, 1, 0, 30).ml, 0);
assert.equal(context.calculFerLitDalle(p, 1, 20, -30).ml, 120);
for (const lit of ['n1l1', 'n1l2', 'n2l1', 'n2l2']) {
  assert.ok(html.includes(`${lit}Crochet: '15'`));
  assert.ok(html.includes(`${lit}Crochet: o.${lit}Crochet ?? '15'`));
}
assert.match(html, /maj\('dalle',\$\{o\.id\},'\$\{p\}Crochet',this\.value\)/);
console.log('✓ dalle pleine : crochets indépendants, unités et compatibilité des anciens projets');
