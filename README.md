# Montana- — Calculateur de Gros Œuvre

Application web **mono-fichier** (HTML + CSS + JS vanilla) pour le quantitatif de gros œuvre :
murs & parpaings, poteaux, poutres, dalles, dalle à corps creux, puis génération d'un **devis quantitatif** imprimable en PDF.

## Contenu du dépôt

```
Montana-/
├── calculateur_batiment (3).html   ← application complète (517 lignes, ~35 Ko)
├── index.html                      ← copie identique, pour servir l'app en local
└── README.md
```

Aucun build, aucune dépendance à installer : ouvrir le fichier HTML dans un navigateur suffit.

## Structure du fichier unique

| Zone | Lignes | Rôle |
|---|---|---|
| `<head>` | 1–38 | Meta, titre, CDN Tailwind + Font Awesome, CSS interne (thème sombre `#0f172a`, accents ambre) et règles `@media print` |
| En-tête / sélection | 41–76 | Titre, bouton « Imprimer / PDF », 5 cases à cocher pour activer/désactiver chaque module |
| `#bloc-mur` | 79–111 | Dimensions du parpaing (L, H, joint, marge de casse) + tableau de murs → surface totale, nb de parpaings exact et arrondi |
| `#bloc-poteau` | 113–134 | Poteaux rectangulaires ou circulaires → section, surface latérale (coffrage), volume |
| `#bloc-poutre` | 136–157 | Poutres → coffrage (3 faces), surface (4 faces), volume |
| `#bloc-dalle` | 159–179 | Dalle pleine → surface, volume |
| `#bloc-corps` | 181–207 | Dalle à corps creux → hourdis/m², entraxe des nervures, surface, nb hourdis, nervures, longueur totale |
| `#bloc-devis` | 209–268 | Dosages béton (ciment, sable, gravier), devise, TVA, infos entreprise/client, tableau du devis en 3 sections, totaux HT/TVA/TTC, blocs signatures |
| `<script>` | 271–514 | Toute la logique (voir ci-dessous) |

## Logique JavaScript

- **État** : tableaux `murs`, `poteaux`, `poutres`, `dalles`, `corps` + objet global `G` (`beton`, `parpaings`, `hourdis`, `nervures`) et `devis` (sections I/II/III).
- **`rendre()`** : régénère les lignes des tableaux (champs + cellules de résultat par id).
- **`calculer()`** : recalcule tout à chaque frappe (`oninput`) et alimente `G` puis le devis.
  - surface mur = `(L × H − ouvertures) × nb`
  - nb parpaings = surface mur ÷ surface d'un parpaing (joint inclus) × (1 + marge %)
  - poteau circulaire : section `π·a²/4`, périmètre `π·a` ; rectangulaire : `a×b`, `2(a+b)`
  - poutre : coffrage `(b + 2h)·L`, surface `2(b+h)·L`, volume `b·h·L`
  - corps creux : hourdis `⌈surface × hourdis/m²⌉`, nervures `⌈L / entraxe⌉`
- **`updateDevis()`** : quantités auto (béton = poteaux + poutres + dalles + « autre béton », ciment/sable/gravier selon dosage), P.U., totaux HT, TVA (19,25 % par défaut), TTC.
- **`majVisibilite()`** : affiche/masque les modules selon les cases cochées.
- **`imprimerDevis()`** : ajoute la classe `print-devis` pour n'imprimer que le devis.

## Lancer en local

```bash
python3 -m http.server 8000 --bind 0.0.0.0
# puis ouvrir http://localhost:8000/
```

> Les ressources externes (Tailwind CDN, Font Awesome, police Inter via Google Fonts) nécessitent un accès Internet.
