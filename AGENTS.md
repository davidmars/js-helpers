# Instructions pour les agents

`js-helpers` est la source canonique des utilitaires JavaScript partagés par les applications Tilty.

- Lire le README avant toute modification.
- Modifier uniquement les sources sous `src/`; `dist/` est généré et publié dans le package.
- Exposer les modules par le point d'entrée principal ou les sous-chemins publics déclarés dans `package.json`.
- Ne jamais demander aux consommateurs d'importer depuis `dist/`, de copier `src/` ou de recréer un lien dans Ty-Vortex.
- Après une modification, incrémenter la version, lancer `npm run build`, puis `npm run check:consumers`.
- Publier le package avant de mettre à jour les versions et lockfiles de Project, Auth et Dashboard.
