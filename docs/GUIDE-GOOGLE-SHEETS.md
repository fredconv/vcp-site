# Guide Google Sheets — Volley Club Perwez

Ce guide explique comment modifier le contenu du site **sans coder**, via un Google Sheet partagé avec le comité.

## Principe (niveau 1)

1. Vous éditez le **Google Sheet**
2. Vous lancez un **redéploiement** sur Vercel (bouton « Redeploy »)
3. Le site est mis à jour en quelques minutes

> **Plus tard (niveau 2)** : un script Google pourra déclencher le redéploiement automatiquement à chaque modification.

---

## Étape 1 — Créer le Google Sheet

1. Allez sur [sheets.google.com](https://sheets.google.com)
2. Créez un nouveau classeur : **« VCP — Contenu du site »**
3. Créez **9 onglets** (feuilles en bas) avec ces noms **exactement** :

```
config
actualites
evenements
equipes
activites
sponsors
comite
stats
pages
```

4. **Partage** : Fichier → Partager → « Toute personne disposant du lien » en **Lecteur** minimum  
   (le site doit pouvoir lire les données au moment du build)

5. Copiez l'ID du Sheet dans l'URL :
   ```
   https://docs.google.com/spreadsheets/d/XXXXXXXXXXXX/edit
                                          ^^^^^^^^^^^^
                                          = GOOGLE_SHEET_ID
   ```

---

## Étape 2 — Configurer Vercel

1. Projet Vercel → **Settings** → **Environment Variables**
2. Ajoutez :
   - **Nom** : `GOOGLE_SHEET_ID`
   - **Valeur** : l'ID copié ci-dessus
3. **Redeploy** le site

En local, créez `.env.local` :
```
GOOGLE_SHEET_ID=votre_id_ici
```

Sans cette variable, le site utilise le contenu par défaut (celui déjà dans le code).

---

## Étape 3 — Structure de chaque onglet

### Colonne `publie` (partout)

Mettez `TRUE` pour afficher une ligne, `FALSE` pour la masquer sans la supprimer.

---

### Onglet `config` (2 colonnes : `cle` | `valeur`)

| cle | valeur |
|-----|--------|
| founded | 1962 |
| description | Club de volley à Perwez... |
| email | info@volleyclubperwez.be |
| president_email | volleyclubperwez@gmail.com |
| tresorier_email | tresorier@volleyclubperwez.be |
| phone | 0475 35 47 26 |
| address_name | Centre Sportif de Perwez |
| address_street | Rue des Marronniers, 17 |
| address_city | Perwez |
| address_zip | 1360 |
| facebook | https://www.facebook.com/VCPerwez |
| instagram | https://www.instagram.com/volley_club_perwez/ |
| lien_inscription | https://forms.gle/wqnAdXCRZSxbozqM8 |
| lien_boutique | https://www.volleyclubperwez.be/boutique/fr/ |
| lien_journee_familles | https://spond.com/client/sponds/... |
| equipes_intro | Texte d'introduction page équipes... |

---

### Onglet `actualites`

| id | titre | date | categorie | extrait | publie |
|----|-------|------|-----------|---------|--------|
| saison-2025 | Bienvenue à la saison 2025-2026 | Septembre 2025 | Club | Les entraînements ont repris... | TRUE |

---

### Onglet `evenements`

| id | titre | date | description | publie |
|----|-------|------|-------------|--------|
| familles-2026 | Journée des familles | 17 mai 2026 | Une journée conviviale... | TRUE |

---

### Onglet `equipes`

| nom | categorie | division | entraineur | horaire | description | publie |
|-----|-----------|----------|------------|---------|-------------|--------|
| U11 | femmes | Jeunes | À confirmer | Samedi 10h | Initiation... | TRUE |
| Loisirs 3 | mixtes | Loisir | À confirmer | Mercredi 20h | Volley loisir... | TRUE |

**categorie** : `femmes` ou `mixtes`

---

### Onglet `activites`

| id | titre | date | horaire | lieu | description | lien_inscription | publie |
|----|-------|------|---------|------|-------------|------------------|--------|
| familles-2026 | Journée des familles | 17 mai 2026 | À partir de 10h00 | Centre Sportif de Perwez | ... | https://spond.com/... | TRUE |

---

### Onglet `sponsors`

| nom | logo_url | lien | niveau | publie |
|-----|----------|------|--------|--------|
| Mon Sponsor | https://drive.google.com/... | https://... | gold | TRUE |

**niveau** : `gold`, `silver` ou `bronze`  
**logo_url** : lien public Google Drive vers l'image (clic droit → obtenir le lien)

---

### Onglet `comite`

| role | nom | email | telephone | publie |
|------|-----|-------|-----------|--------|
| Président | Christophe Becquevort | volleyclubperwez@gmail.com | 0475 35 47 26 | TRUE |
| Secrétaire | Frédéric Convert | info@volleyclubperwez.be | | TRUE |

---

### Onglet `stats` (barre sous le hero)

| valeur | label | publie |
|--------|-------|--------|
| 1962 | Fondé en | TRUE |
| 11 | Équipes | TRUE |
| 7–77 | Ans | TRUE |
| 60+ | Ans d'histoire | TRUE |

---

### Onglet `pages` (textes longs)

| slug | titre | contenu | publie |
|------|-------|---------|--------|
| club | Qui sommes-nous | Le Volley Club Perwez a été créé en 1962...\n\nDeuxième paragraphe... | TRUE |

- **slug** : identifiant de la page (`club` = page Le Club)
- **contenu** : texte libre, paragraphes séparés par une **ligne vide**

---

## Étape 4 — Mettre à jour le site

Après chaque modification du Sheet :

1. Vérifiez que les lignes ont `publie = TRUE`
2. Allez sur **Vercel** → votre projet → **Deployments**
3. Cliquez sur **⋯** du dernier déploiement → **Redeploy**

Le site sera reconstruit avec les nouvelles données (2–5 min).

---

## Photos (Google Drive)

1. Uploadez l'image dans un dossier Drive partagé
2. Clic droit → **Partager** → accès public ou « Toute personne avec le lien »
3. Copiez le lien dans la colonne `logo_url` du Sheet

---

## Dépannage

| Problème | Solution |
|----------|----------|
| Le site affiche l'ancien contenu | Redéployer sur Vercel |
| Une ligne n'apparaît pas | Vérifier `publie = TRUE` |
| Erreur au build | Vérifier le partage du Sheet (lecture publique) |
| Onglet ignoré | Vérifier le **nom exact** de l'onglet (minuscules) |

---

## Qui peut éditer ?

| Rôle | Accès Sheet | Accès Vercel |
|------|-------------|--------------|
| Président / gestionnaire | **Éditeur** | Non requis |
| Développeur | Propriétaire | Admin (pour redeploy) |

Le comité n'a besoin que du Google Sheet. Le redeploy peut être fait par le dev ou automatisé plus tard (niveau 2).

---

## Contact technique

Pour toute question sur la configuration : contacter le développeur du site avec l'ID du Sheet et l'URL Vercel du projet.
