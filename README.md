# GROS ŒUVRE PRO

Calculateur professionnel de gros œuvre et générateur de devis quantitatifs, disponible en version Web locale et en application de bureau Windows.

## Fonctionnalités

- Murs et parpaings, avec plusieurs portes et fenêtres de dimensions différentes sur un même mur.
- Poteaux avec fers verticaux et cadres, poutres, chapeaux et armatures HA/RL.
- Dalle pleine et dalle à corps creux.
- Semelles avec deux nappes d'armatures.
- Crépissage.
- Validation explicite de chaque module avant envoi au devis.
- Devis avec quantités, prix unitaires, prix totaux, TVA et export PDF.
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
