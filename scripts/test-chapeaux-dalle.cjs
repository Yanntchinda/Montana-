'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const html = fs.readFileSync('index.html', 'utf8');
const source = html.slice(html.indexOf('function calculChapeauDalle('), html.indexOf('function calculer() {'));
const context = { num: v => Number(v) || 0 }; vm.createContext(context); vm.runInContext(source, context);
const r = context.calculChapeauDalle(1.5, 10);
assert.equal(r.metres, 15); assert.equal(r.exact, 1.25); assert.equal(r.barres, 2);
assert.equal(context.calculChapeauDalle(3, 4).barres, 1);
assert.equal(context.calculChapeauDalle(-3, 4).barres, 0);
assert.equal(context.calculChapeauDalle(3, '').barres, 0);
for (const champ of ['chapeauNuance', 'chapeauDiam', 'chapeauL', 'chapeauNb']) {
  assert.ok(html.includes(`'${champ}'`)); assert.ok(html.includes(`${champ}: o.${champ} ??`));
}
assert.match(html, /estLigneChapeauDalle\(l\)/); assert.match(html, /chapdalle:/);
console.log('✓ chapeaux de dalle : formule, arrondi, champs et devis');
