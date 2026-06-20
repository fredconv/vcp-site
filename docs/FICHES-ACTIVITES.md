# Sheet 2 — Fiches activités (VCP)

Fichier Google Sheets **séparé** du CMS principal, pour les textes détaillés des événements.

## Créer le fichier

1. Google Drive → même dossier que le Sheet principal
2. **Nouveau** → **Google Sheets**
3. Nom : **VCP — Fiches activités**
4. Renommer l'onglet en **`fiches`** (nom exact)
5. Importer `fiches-activites.csv` (séparateur **point-virgule**)
6. **Partager** en **Lecteur** (lien public)

## Structure de l'onglet `fiches`

| slug | titre | contenu | publie |
|------|-------|---------|--------|
| journee-familles | Journée des familles | Texte long… | TRUE |

- **slug** : identique à la colonne `slug` de l'onglet `activites` du Sheet principal
- **contenu** : texte libre, paragraphes séparés par une **ligne vide**
- **publie** : `TRUE` pour afficher la page et le lien sur le site

## Lier au site

Dans le Sheet principal, onglet **`config`**, ajoutez :

| cle | valeur |
|-----|--------|
| sheet_fiches_activites | ID du Sheet « Fiches activités » |

L'ID se trouve dans l'URL :
```
https://docs.google.com/spreadsheets/d/XXXXXXXXXXXX/edit
```

## Comportement sur le site

- Page liste : `/activites` — lien **« Voir l'événement »** seulement si une fiche existe (`slug` + `publie=TRUE`)
- Page détail : `/activites/journee-familles` — texte complet de la fiche
- Pas de fiche → pas de lien (la carte reste visible avec le résumé court)

## Workflow comité

1. Ajouter une ligne dans `activites` (Sheet 1) avec un **slug** unique
2. Ajouter la fiche dans `fiches` (Sheet 2) avec le **même slug**
3. Redeploy (lien favori Vercel)

## Exemple de slugs

| Événement | slug suggéré |
|-----------|----------------|
| Journée des familles | `journee-familles` |
| Beach-volley | `beach-volley` |
| Week-end ADEPS | `week-end-adeps` |

Les noms de fichiers dans Drive (`EVENT_...`) sont optionnels — seul le **slug** dans les Sheets compte.
