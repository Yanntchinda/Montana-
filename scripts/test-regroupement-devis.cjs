'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const html = fs.readFileSync('index.html', 'utf8');
const acier = html.slice(html.indexOf('const estLigneFer ='), html.indexOf('function syncFersDevis()'));
const projection = html.slice(html.indexOf('function cleDesignationDevis('), html.indexOf('function afficherNombreDevis('));
const context = {
  G: { ferPoteaux: {'RL:6': 2}, ferCadresPoutres: {'RL:6':3}, ferDalles:{'RL:6':4}, ferSemelles:{'RL:6':5}, ferEpinglesLongrines:{'RL:6':6, 'RL':1} },
  num: x => Number(String(x || '0').replace(',', '.')) || 0,
  fmt: x => String(x), devis: [], valL: l => l.qte === null ? (context.actifs[l.auto]?.qte || 0) : Number(l.qte || 0)
};
vm.createContext(context);
vm.runInContext(acier, context);
context.actifs = context.aciersDevisActifs();
assert.equal(context.actifs['fer:RL:6'].des, 'RL Ø6');
assert.equal(context.actifs['cadrepout:RL:6'].des, 'RL Ø6');
assert.equal(context.actifs['semellefer:RL:6'].des, 'RL Ø6');
assert.equal(context.actifs['epinglelong:RL'].des, 'RL Ø non renseigné');
let id=0;
const from = auto => ({id:++id, auto, des:context.actifs[auto].des, unite:'barre', qte:null, pu:'0', total:null});
const lignes = ['fer:RL:6','cadrepout:RL:6','dallefer:RL:6','semellefer:RL:6','epinglelong:RL:6','epinglelong:RL'].map(from);
lignes[0].pu='10'; lignes[1].pu='20';
context.devis = [
  { n:'I', lignes:lignes.slice(0,2).concat([{id:++id,des:'Ciment',unite:'sacs',qte:'4',pu:'100',total:null,auto:null}]) },
  { n:'II', lignes:lignes.slice(2).concat([{id:++id,des:' ciment ',unite:'SACS',qte:'6',pu:'200',total:null,auto:null}, {id:++id,des:'Ciment',unite:'kg',qte:'5',pu:'3',total:null,auto:null}]) }
];
vm.runInContext(projection, context);
const groupes=context.groupesDevis();
const acierG=groupes.find(g=>g.des==='RL Ø6'), acierV=context.valeursGroupe(acierG);
assert.equal(acierG.lignes.length,5); assert.equal(acierV.qte,20);
assert.equal(acierV.total,80); assert.equal(acierV.pu,4);
assert.equal(groupes.filter(g=>g.des==='RL Ø6').length,1);
assert.ok(groupes.find(g=>g.des==='RL Ø non renseigné'));
const ciment=groupes.find(g=>g.des==='Ciment' && g.unite==='sacs'), cimentV=context.valeursGroupe(ciment);
assert.equal(cimentV.qte,10); assert.equal(cimentV.total,1600); assert.equal(cimentV.pu,160);
assert.ok(groupes.find(g=>g.des==='Ciment' && g.unite==='kg'));
for (const module of ['longrine','poteau','amorce','poutre','chenage']) assert.ok(html.includes(`'${module}',${'${o.id}'},'epingleDiam'`));
console.log('✓ désignations regroupées, aciers par diamètre et prix moyen pondéré');
