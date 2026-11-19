# Vidéo de présentation

`presentation-gros-oeuvre-pro.mp4` : montage de 38,5 secondes, 1280 × 720, avec voix off française. Les vues du logiciel sont des captures de l'application ; le chantier d'ouverture est un visuel généré.

`index.html` est la composition HyperFrames modifiable ; les images, la voix et GSAP sont dans `assets/`. Les compétences HyperFrames et motion design sont installées dans `.agents/skills/`. Pour rendre la composition, installer le CLI `hyperframes`, FFmpeg, FFprobe et un navigateur Chromium compatible, puis exécuter depuis la racine :

```sh
npx hyperframes render video -o presentation-gros-oeuvre-pro.mp4 --fps 24
```
