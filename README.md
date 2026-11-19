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
- Navigation latérale classée par blocs dépliants : **Fondation** (Semelles, Amorce, Longrines, Murs & parpaings, Crépissage), **RDC** et **Étages** (Poutres, Poteaux, Murs & parpaings, Dalle pleine, Dalle corps creux, Chenage, Escalier, Crépissage), **Toiture** (calcul de toiture à deux versants) et **Autres modules** (Mains d’œuvre). Les entrées d’un même module dans différents blocs ouvrent les mêmes calculs partagés. Le bouton **« Ajouter un étage »** crée des étages avec les mêmes sous-modules que le RDC ; la liste des étages est sauvegardée. Les blocs sont fermés au démarrage et s’ouvrent uniquement au clic.
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

Dans chaque panneau, ajoutez autant de chapeaux que nécessaire, chacun avec sa nuance HA ou RL, son diamètre, sa longueur en mètres et son nombre. Le linéaire est longueur × nombre ; il est divisé par 12 m pour afficher les barres exactes. Les longueurs des dalles de même nuance et diamètre sont cumulées puis arrondies au supérieur pour la commande. Après validation du module, les barres sont regroupées dans le devis avec les fers de même nuance et diamètre.

### Panneaux indépendants des dalles pleines

Chaque panneau est replié par défaut et se déplie au clic pour afficher ses propres nappes, cavaliers, chapeaux, panneaux de lattes et dimensions de planches. Les résultats sont cumulés au niveau du module et transférés au devis après validation. À l’ouverture d’un ancien projet, les paramètres communs des nappes et des planches sont repris sur chaque panneau ; les anciens cavaliers, chapeaux et panneaux de lattes communs sont rattachés au premier panneau, sans les dupliquer.

Les chapeaux peuvent être ajoutés ou supprimés indépendamment dans chaque panneau ; les chapeaux des anciens projets sont conservés.

### Toiture à deux versants

Le bloc **Toiture → Calcul toiture** regroupe quatre sous-modules : données de base, tôles, fermes et pannes. Choisir deux versants symétriques ou des versants indépendants (de 1 à 20). Pour ces derniers, saisir pour chacun la longueur finie parallèle à l’égout, la largeur horizontale finie et la pente. Les débords sont compris dans ces dimensions. Les dimensions et recouvrements sont en mètres ; la pente et les pertes sont saisies en pourcentage. Toutes les valeurs nécessaires sont à saisir, y compris zéro si aucun débord, recouvrement ou perte n’est prévu.

Les deux estimations de tôles sont affichées. La méthode sélectionnée (par rangées ou par surface avec pertes) est celle transmise au devis. La méthode par rangées ne rajoute pas automatiquement les pertes. Chaque longueur de contre-fiche et le débord supplémentaire de l’arbalétrier sont saisissables ; le rampant inclut déjà le débord latéral. Les résultats des sous-modules remplis sont transférés au devis après validation.

**Limites :** estimation géométrique et quantitative, non dimensionnement structurel ni plan de coupe. La formule de pannes compte le +1 sur chaque versant ; vérifier faîtière et sablières selon le plan. Les joints de pannes doivent tomber sur une ferme. Faire vérifier les sections, appuis, assemblages, stabilité et plan de coupe par un professionnel qualifié.

En mode versants indépendants, les surfaces, tôles par rangées et pannes sont additionnées par versant rectangulaire. Cette méthode ne convient pas aux versants triangulaires ou trapézoïdaux. Les fermes ne peuvent pas être déduites de ces seules dimensions : saisir leur nombre total et le métrage de bois par ferme d’après un plan de charpente vérifié. Vérifier les éléments partagés entre versants (notamment faîtières) pour éviter les doubles comptes. Les anciens projets conservent leur mode symétrique et leurs validations.

### Toiture à quatre versants à croupes

La configuration **Quatre versants à croupes** accepte la longueur et la largeur du bâtiment, un débord identique sur les quatre côtés et les pentes distinctes (en %) des grands pans et des croupes. Elle affiche les courses, angles, hauteur depuis l’égout, longueur du faîtage, rampants, arêtier et surfaces des deux types de pans. Les pentes doivent être strictement positives et le faîtage strictement positif : sinon la validation est bloquée.

Les tôles sont estimées par surface avec les pertes saisies, et non par rangées rectangulaires ; prévoir les coupes biaisées et vérifier les longueurs à commander selon chaque rampant. Le nombre de fermes complètes est calculé sur le faîtage ; le métrage par ferme est à saisir d’après le plan. L’estimation d’un chevron de croupe de rang k est fournie séparément et n’est pas ajoutée au devis. Les pannes sont additionnées par type de pan à partir de l’égout (j = 0), selon l’entraxe mesuré sur le rampant ; une rangée de croupe de longueur nulle est exclue. Si une rangée tombe au faîtage, elle est comptée sur chacun des deux grands pans : vérifier et retirer le doublon selon le plan. Les quantités de fermes et pannes restent des estimations de métrage, sans optimisation de coupe ni décompte des autres pièces. Faire vérifier la charpente et les longueurs de commande par un professionnel qualifié.

### Nervures de dalle à corps creux

Le sous-module **Nervures : béton et armatures** utilise le linéaire total déjà calculé à partir des panneaux. Le volume est ce linéaire multiplié par la largeur et l’épaisseur de nervure saisies en centimètres, converties en mètres. Pour éviter de compter deux fois la dalle de compression, saisir la hauteur de nervure située sous celle-ci.

Les fers longitudinaux sont estimés par linéaire total × nombre de fers par nervure. Pour les cadres, saisir l’espacement et la longueur développée d’un cadre, crochets compris : le nombre par nervure est ⌈longueur de nervure ÷ espacement⌉ + 1, calculé pour chaque panneau. Nuance et diamètre sont saisissables pour chaque type. Les métrages de même nuance et diamètre des nervures sont regroupés puis divisés par 12 m et arrondis au supérieur pour le devis. Béton et acier ne rejoignent le devis qu’après validation de la dalle à corps creux ; les parties non commencées restent facultatives.

Ces estimations ne comprennent pas les recouvrements, ancrages ou pertes des barres longitudinales, ni l’optimisation du plan de coupe des cadres. La section et les armatures doivent être vérifiées par un professionnel qualifié.
