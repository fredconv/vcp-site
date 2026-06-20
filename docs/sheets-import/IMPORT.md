# Importer les CSV dans Google Sheets

Dossier : `docs/sheets-import/` — **12 fichiers CSV** (9 onglets existants + 3 nouveaux + textes UI optionnels).

## Étape 1 — Créer le classeur

1. Google Drive → dossier `vcp-site`
2. **Nouveau** → **Google Sheets** → Feuille vide
3. Renommer : **VCP — Contenu du site**

## Étape 2 — Importer le premier onglet (`config`)

1. Ouvrez le Sheet
2. Renommez l'onglet du bas en **`config`** (clic droit → Renommer)
3. **Fichier** → **Importer**
4. **Importer un fichier** → choisissez `config.csv`
5. Options :
   - Emplacement : **Remplacer les données à l'emplacement actuel**
   - Type de séparateur : **Point-virgule** (`;`)
   - Convertir le texte en nombres : **Non** (recommandé)

> Les CSV utilisent `;` pour éviter les conflits avec les virgules dans le texte français. Une fois importés dans Google Sheets, vous pouvez éditer librement — les virgules dans les phrases ne posent plus de problème.
6. **Importer les données**

## Étape 3 — Importer les onglets restants

| Fichier CSV   | Nom de l'onglet à créer |
|---------------|-------------------------|
| actualites.csv  | actualites  |
| evenements.csv  | evenements  |
| equipes.csv     | equipes     |
| activites.csv   | activites   |
| sponsors.csv    | sponsors    |
| comite.csv      | comite      |
| stats.csv       | stats       |
| pages.csv       | pages       |
| valeurs.csv     | valeurs     |
| etapes.csv      | etapes      |
| liens_rapides.csv | liens_rapides |

Pour **chaque** fichier :

1. **+** → nouvel onglet → renommer (nom exact, minuscules)
2. **Fichier** → **Importer** → CSV → **Point-virgule** → **Remplacer**

## Étape 4 — Textes d'interface (optionnel)

Le fichier `config-textes.csv` contient tous les libellés du site (boutons, titres de sections, navigation…).

**Copiez-collez** ses lignes (sans l'en-tête) **à la fin** de l'onglet `config` existant.

> Sans ces lignes, le site utilise les textes par défaut intégrés au code — tout fonctionne quand même.

## Étape 5 — Partager

1. **Partager** (bouton bleu)
2. Accès général : **Toute personne disposant du lien** → **Lecteur**

## Étape 6 — Connecter au site

1. Copiez l'ID dans l'URL :
   ```
   https://docs.google.com/spreadsheets/d/XXXXXXXXXXXX/edit
   ```
2. Vercel → **Settings** → **Environment Variables**
   - Nom : `GOOGLE_SHEET_ID`
   - Valeur : `XXXXXXXXXXXX`
3. **Deployments** → **Redeploy**

En local : créez `.env.local` avec la même variable.

## Vérification rapide

- **12 onglets** avec les bons noms
- Ligne 1 = en-têtes (cle, titre, nom…)
- Colonne `publie` = `TRUE` sur les lignes visibles
- Onglet `config` : pas de colonne `publie` (normal)

## Modifier le contenu plus tard

1. Éditez une cellule dans le Sheet
2. Redeploy sur Vercel
3. Le site est à jour en quelques minutes
