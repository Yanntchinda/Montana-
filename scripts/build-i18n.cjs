'use strict';

/**
 * Injecte le dictionnaire anglais (scripts/i18n-en.json) dans index.html.
 *
 * Le bloc `const TEXTES_EN = {...};` est remplacé par le contenu du fichier
 * JSON, ce qui permet de corriger ou compléter les traductions sans toucher
 * au reste de l'application.
 *
 * Usage : node scripts/build-i18n.cjs
 */
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const htmlPath = path.join(root, 'index.html');
const dictPath = path.join(__dirname, 'i18n-en.json');

const dictionary = JSON.parse(fs.readFileSync(dictPath, 'utf8'));
const html = fs.readFileSync(htmlPath, 'utf8');

const start = html.indexOf('const TEXTES_EN = {');
if (start === -1) throw new Error('Bloc TEXTES_EN introuvable dans index.html.');
const end = html.indexOf('\n};', start);
if (end === -1) throw new Error('Fin du bloc TEXTES_EN introuvable.');

const lignes = Object.keys(dictionary).sort((a, b) => a.localeCompare(b, 'fr'))
  .map(cle => `  ${JSON.stringify(cle)}: ${JSON.stringify(dictionary[cle])}`);

const bloc = `const TEXTES_EN = {\n${lignes.join(',\n')}\n};`;
const suite = html.slice(end + 2).replace(/^;+/, '');
fs.writeFileSync(htmlPath, html.slice(0, start) + bloc + suite);

console.log(`${lignes.length} traductions injectées dans index.html`);
