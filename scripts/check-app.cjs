'use strict';

const fs = require('node:fs');
const path = require('node:path');
const { execFileSync } = require('node:child_process');

const root = path.resolve(__dirname, '..');
const requiredFiles = [
  'index.html',
  'electron/main.cjs',
  'build/icon.ico',
  'build/icon.png',
  'assets/fontawesome/css/fontawesome.min.css',
  'assets/fontawesome/css/solid.min.css',
  'assets/fontawesome/webfonts/fa-solid-900.woff2',
  'assets/fontawesome/LICENSE.txt',
  '.github/workflows/build-windows.yml'
];

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

for (const relativePath of requiredFiles) {
  assert(fs.existsSync(path.join(root, relativePath)), `Fichier requis absent : ${relativePath}`);
}

const pkg = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8'));
assert(pkg.main === 'electron/main.cjs', 'Le point d’entrée Electron est incorrect.');
assert(pkg.build?.win?.target?.some(target => target.target === 'nsis'), 'La cible Windows NSIS est absente.');
assert(pkg.scripts?.['dist:win'], 'Le script dist:win est absent.');

const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const inlineScript = html.match(/<script>([\s\S]*)<\/script>\s*<\/body>/i)?.[1];
assert(inlineScript, 'Le script principal de index.html est introuvable.');
new Function(inlineScript);

assert(html.includes('./assets/fontawesome/css/fontawesome.min.css'), 'Font Awesome local n’est pas chargé.');
assert(html.includes('./assets/fontawesome/css/solid.min.css'), 'Le jeu d’icônes local solid n’est pas chargé.');
assert(!/<(?:script|link)[^>]+https?:\/\//i.test(html), 'Une ressource réseau externe est encore chargée par index.html.');
assert(html.includes('Content-Security-Policy'), 'La politique de sécurité CSP est absente.');

execFileSync(process.execPath, ['--check', path.join(root, 'electron/main.cjs')], { stdio: 'inherit' });

console.log('✓ HTML et JavaScript valides');
console.log('✓ ressources graphiques disponibles hors connexion');
console.log('✓ configuration Electron et installateur Windows valides');
