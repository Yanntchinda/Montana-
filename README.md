# GROS ŒUVRE PRO

Calculateur professionnel de gros œuvre et générateur de devis quantitatifs, disponible en version Web locale et en application de bureau Windows.

## Fonctionnalités

- Après l’écran de connexion au fond animé, accueil sans diaporama : nouveau projet, reprise du projet enregistré et ouverture d’un fichier projet JSON. La navigation latérale et les commandes du projet, affichées horizontalement sous l’en-tête, apparaissent après ouverture d’un projet ; l’espace « GROS ŒUVRE PRO » est distinct de l’accueil. Les 10 derniers projets sont conservés sur cet appareil et accessibles depuis la liste des projets récents ; utilisez **Exporter le projet** pour garder une copie indépendante ou le transférer. Les actions de l’accueil affichent un indicateur de chargement et les étapes en cours.

- Murs et parpaings, avec plusieurs portes et fenêtres de dimensions différentes sur un même mur.
- Longrines avec volume de béton, fers longitudinaux, cadres et épingles en barres de 12 m.
- Poteaux et poutres avec fers longitudinaux, cadres et épingles; chapeaux de poutres et armatures HA/RL calculés en barres de 12 m.
- Amorce : module complet calqué sur les poteaux (formes rectangulaire et circulaire, section, coffrage latéral, béton, fers verticaux, cadres et épingles), raccordé au tableau de bord et au devis.
- Chenage : module complet calqué sur les poutres (coffrage, béton, fers, chapeaux, cadres et épingles), raccordé au tableau de bord et au devis.
- Mains d’œuvre : tableau désignation · unité · quantité · prix unitaire · montant, avec les éléments de tous les modules pré-remplis (parpaing, poteaux, poutres, longrines, chenage, semelle, crépissage, amorce, dalles), les **quantités mises à jour automatiquement** depuis les modules (parpaings : quantité du devis validé des murs ; poteaux et amorce : hauteur totale ; poutres, longrines, chenage : longueur totale ; semelles : nombre ; crépissage, dalles : surfaces) et une section MAIN-D’ŒUVRE dans le devis.
- Dalle pleine (plusieurs panneaux par dalle avec dimensions, surface et volume cumulés, chaque panneau avec deux nappes d’armatures et ses propres sous-modules Cavaliers, Chapeau, Lattes et Planche ; Étais et résultats cumulés envoyés au devis) et dalle à corps creux (hourdis, nervures et sous-modules Lattes multi-panneaux, Étais et Nappe de compression envoyés au devis).
- Semelles avec deux nappes d'armatures (Nappe 1 et Nappe 2), chacune composée de deux lits indépendants (Lit 1 sens longueur L et Lit 2 sens largeur l).
- Escalier avec deux sous-modules : **Palier** (volume béton et **Fer** Nappe 1 et Nappe 2 avec Lit 1 sens longueur L et Lit 2 sens largeur l) et **Volet** (**Marches** : ((giron × hauteur) ÷ 2) × emmarchement × nombre de marches total ; **Paillasse** : longueur × emmarchement × épaisseur × nombre de volets ; **Fer** : Nappe 1 et Nappe 2 avec Lit 1 sens longueur L et Lit 2 sens largeur l), raccordé au tableau de bord et au devis.
- Crépissage.
- Navigation latérale classée par blocs dépliants : **Fondation** (Semelles, Amorce, Longrines, Murs & parpaings, Crépissage), **RDC** et **Étages** (Poutres, Poteaux, Murs & parpaings, Dalle pleine, Dalle corps creux, Chenage, Escalier, Crépissage), **Toiture** (grand titre seul) et **Autres modules** (Mains d’œuvre). Les entrées d’un même module dans différents blocs ouvrent les mêmes calculs partagés. Le bouton **« Ajouter un étage »** crée des étages avec les mêmes sous-modules que le RDC ; la liste des étages est sauvegardée. Les blocs sont fermés au démarrage et s’ouvrent uniquement au clic.
- Validation explicite de chaque module avant envoi au devis.
- Devis avec regroupement des lignes de même désignation et unité, quantités additionnées et prix moyen pondéré lorsque les prix diffèrent ; aciers HA et RL regroupés par diamètre. Les épingles disposent d’un champ diamètre ; les anciennes épingles sans diamètre restent distinctes jusqu’à renseignement et revalidation. Les quantités regroupées sont modifiées dans les modules sources. TVA et export PDF.
- Sauvegarde automatique et fonctionnement hors connexion.
- Thèmes clair et sombre.

## Structure du projet

```text
Montana-/
├── index.html                         Application complète HTML/CSS/JS
├── assets/fontawesome/               Icônes locales pour le mode hors connexion
├── electron/main.cjs                 Fenêtre de bureau sécurisée
├── build/icon.ico                    Icône de l'installateur Windows
├── build/icon.png                    Icône de la fenêtre
├── scripts/check-app.cjs             Vérifications avant compilation
├── .github/workflows/build-windows.yml
├── package.json                      Scripts et configuration electron-builder
├── package-lock.json                 Versions exactes des dépendances
└── calculateur_batiment (3).html     Version originale conservée
```

## Utiliser la version Web locale

Aucune compilation n'est nécessaire :

```bash
python3 -m http.server 8000 --bind 0.0.0.0
```

Ouvrir ensuite `http://localhost:8000/`.

## Lancer la version bureau en développement

Prérequis : Node.js 20 ou plus récent.

```bash
npm ci
npm run check
npm start
```

## Générer l'installateur Windows `.exe`

Sur une machine Windows x64 :

```bash
npm ci
npm run check
npm run dist:win
```

L'installateur est créé dans :

```text
release/Gros-Oeuvre-Pro-Setup-1.0.0-x64.exe
```

L'installateur NSIS permet de choisir le dossier d'installation et crée les raccourcis du Bureau et du menu Démarrer.

## Compiler sur GitHub Actions

Le workflow **Construire l'application Windows** se déclenche automatiquement lors d'une modification de l'application sur `main` ou une branche `arena/**`.

Compilation manuelle :

1. Ouvrir le dépôt sur GitHub.
2. Aller dans **Actions**.
3. Sélectionner **Construire l'application Windows**.
4. Cliquer sur **Run workflow**.
5. À la fin du travail, télécharger l'artefact `GROS-OEUVRE-PRO-Windows-...`.
6. Décompresser l'artefact pour obtenir l'installateur `.exe` et `SHA256SUMS.txt`.

Le fichier `SHA256SUMS.txt` permet de vérifier l'intégrité de l'installateur téléchargé.

## Données et fonctionnement hors connexion

- Les données du chantier restent sur l'ordinateur dans le stockage local Electron.
- Aucune donnée métier n'est envoyée vers un serveur.
- Les icônes sont embarquées dans l'application : Internet n'est pas requis après installation.
- La désinstallation conserve volontairement les données utilisateur pour éviter une perte accidentelle.

## Sécurité

La fenêtre Electron utilise :

- `contextIsolation: true` ;
- `nodeIntegration: false` ;
- le bac à sable Chromium ;
- une politique CSP ;
- le blocage des permissions et navigations non autorisées ;
- une instance unique de l'application.

## Signature Windows

L'installateur produit par GitHub est fonctionnel mais non signé. Windows SmartScreen peut donc afficher un avertissement lors des premiers téléchargements. Pour une diffusion publique sans cet avertissement, il faudra ajouter ultérieurement un certificat de signature de code au workflow GitHub.

## Version

La version de l'application se règle dans `package.json`. Avant chaque publication officielle, augmenter la propriété `version`, par exemple de `1.0.0` à `1.1.0`.

### Nappe de compression — dalle à corps creux

Renseignez les dimensions globales de la dalle en mètres, les espacements dans les deux sens et la longueur du crochet en centimètres, puis la nuance et le diamètre. Le calcul est `[(L / espacement L) × (l + crochet) + (l / espacement l) × (L + crochet)] / 12`, après conversion des centimètres en mètres. Les barres à commander sont arrondies au supérieur et rejoignent le devis après validation du module ; elles sont regroupées avec les autres fers de même nuance et diamètre. Les dimensions globales sont indépendantes des panneaux, dont la disposition ne permet pas de déduire automatiquement la longueur et la largeur totales.

Dans ce même sous-module, indiquez l’épaisseur de la dalle de compression en centimètres : le volume de béton est la surface totale de tous les panneaux de corps creux (multiplicités comprises) multipliée par l’épaisseur convertie en mètres. Ce volume est ajouté au béton du devis après validation du module.

### Crochets des nappes de dalle pleine

Chaque lit des deux nappes possède sa propre longueur totale de crochets, saisie en centimètres et ajoutée à la longueur de chaque barre. Chaque panneau dispose de ses propres paramètres ; les calculs sont cumulés sur tous les panneaux de la dalle. Les dalles existantes conservent la valeur précédente de 15 cm pour chaque lit, modifiable indépendamment. Les quantités mises à jour alimentent le devis après validation du module.

### Chapeau — dalle pleine

Pour chaque panneau, renseignez la nuance HA ou RL, le diamètre, la longueur d’un chapeau en mètres et le nombre. Le linéaire est longueur × nombre ; il est divisé par 12 m pour afficher les barres exactes. Les longueurs des dalles de même nuance et diamètre sont cumulées puis arrondies au supérieur pour la commande. Après validation du module, les barres sont regroupées dans le devis avec les fers de même nuance et diamètre.

### Panneaux indépendants des dalles pleines

Chaque panneau est replié par défaut et se déplie au clic pour afficher ses propres nappes, cavaliers, chapeaux, panneaux de lattes et dimensions de planches. Les résultats sont cumulés au niveau du module et transférés au devis après validation. À l’ouverture d’un ancien projet, les paramètres communs des nappes et des planches sont repris sur chaque panneau ; les anciens cavaliers, chapeaux et panneaux de lattes communs sont rattachés au premier panneau, sans les dupliquer.
