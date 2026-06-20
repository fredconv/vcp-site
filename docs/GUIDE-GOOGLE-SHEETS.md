# Guide Google Sheets — Volley Club Perwez

Ce guide explique comment modifier le contenu du site **sans coder**, via un Google Sheet partagé avec le comité.

> **Version simplifiée pour le comité (non développeur) :** [GUIDE-COMITE-SHEETS.md](GUIDE-COMITE-SHEETS.md)

## Principe (niveau 1)

1. Vous éditez le **Google Sheet**
2. Vous lancez un **redéploiement** sur Vercel (bouton « Redeploy »)
3. Le site est mis à jour en quelques minutes

> **Plus tard (niveau 2)** : un script Google pourra déclencher le redéploiement automatiquement à chaque modification.

---

## Étape 1 — Créer le Google Sheet

1. Allez sur [sheets.google.com](https://sheets.google.com)
2. Créez un nouveau classeur : **« VCP — Contenu du site »**
3. Créez les onglets (feuilles en bas) avec ces noms **exactement** :

```
config
menu
actualites
equipes
activites
sponsors
comite
stats
pages
valeurs
etapes
liens_rapides
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

| cle | valeur | Où ça s'affiche |
|-----|--------|-----------------|
| founded | 1962 | Hero, stats, page Club |
| description | Club de volley à Perwez... | **Accueil** (hero + section « Plus qu'un club ») |
| email | info@volleyclubperwez.be | Contact, footer |
| president_email | volleyclubperwez@gmail.com | Contact |
| tresorier_email | tresorier@volleyclubperwez.be | Contact |
| phone | 0475 35 47 26 | Contact, footer |
| address_name | Centre Sportif de Perwez | Contact |
| address_street | Rue des Marronniers, 17 | Contact |
| address_city | Perwez | Contact |
| address_zip | 1360 | Contact |
| facebook | https://www.facebook.com/VCPerwez | Liens sociaux |
| instagram | https://www.instagram.com/volley_club_perwez/ | Liens sociaux |
| lien_inscription | https://forms.gle/... | Boutons inscription |
| lien_boutique | https://www.volleyclubperwez.be/boutique/fr/ | Menu |
| lien_journee_familles | https://spond.com/... | Activités |
| equipes_intro | Texte d'introduction... | Pages **Équipes** et **Inscriptions** |
| sheet_fiches_activites | ID du Google Sheet « Fiches activités » | Fiches détaillées `/activites/[slug]` — voir `docs/FICHES-ACTIVITES.md` |
| home_hero_image | *(vide ou lien image)* | **Accueil** — bannière photo (sinon hero classique avec logo) |
| club_hero_image | *(vide ou lien image)* | **Club** — bannière photo du hero |
| equipes_hero_image | | **Équipes** |
| activites_hero_image | | **Activités** |
| inscriptions_hero_image | | **Inscriptions** |
| contact_hero_image | | **Contact** |

> **Bannières photo** : laissez la cellule vide pour le bandeau texte habituel. Collez un lien d'image pour afficher une bannière photo à la place. Voir [Images hero](HERO-IMAGES.md).

---

### Onglet `menu` (navigation header + footer)

| ordre | label | url | externe | publie |
|-------|-------|-----|---------|--------|
| 01 | Accueil | / | FALSE | TRUE |
| 02 | Le Club | /club | FALSE | TRUE |
| 07 | Boutique | https://www.volleyclubperwez.be/boutique/fr/ | TRUE | TRUE |

- **ordre** : position dans le menu (01, 02, 03…)
- **label** : texte affiché
- **url** : chemin interne (`/club`) ou lien complet (`https://…`)
- **externe** : `TRUE` pour ouvrir dans un nouvel onglet (auto si l'URL commence par `http`)
- **publie** : `FALSE` pour masquer une entrée sans la supprimer

Import CSV : `docs/sheets-import/menu.csv`

> Si l'onglet `menu` est vide, le site utilise le menu par défaut (libellés `nav_*` dans `config`).

Le bouton rouge **Rejoindre** reste géré par `cta_rejoindre_short` et `lien_inscription` dans `config`.

---

### Onglet `actualites`

| id | titre | date | categorie | extrait | publie |
|----|-------|------|-----------|---------|--------|
| saison-2025 | Bienvenue à la saison 2025-2026 | Septembre 2025 | Club | Les entraînements ont repris... | TRUE |

---

### Onglet `activites`

| id | slug | titre | date_debut | date_fin | texte_date | horaire | lieu | description | lien_inscription | publie |
|----|------|-------|------------|----------|------------|---------|------|-------------|------------------|--------|
| familles-2026 | journee-familles | Journée des familles | 17/05/2026 | | 17 mai 2026 | À partir de 10h00 | Centre Sportif de Perwez | ... | https://spond.com/... | TRUE |
| beach-2026 | Beach-Volley | 25/07/2026 | 26/07/2026 | | | À confirmer | ... | | TRUE |

**Dates**
- `date_debut` / `date_fin` : sélecteur de date Google Sheets (format JJ/MM/AAAA ou AAAA-MM-JJ)
- `texte_date` : texte libre affiché à la place (ex. « dernier week-end de septembre »). Si vide → dates formatées automatiquement
- Page **Activités** : sépare **à venir** et **terminés** (fin &lt; aujourd'hui)
- **Accueil** (section « Prochains événements ») : mêmes lignes, **à venir uniquement**, affichage réduit (**titre + date**)
- Colonne **`slug`** : identifiant pour la page détail `/activites/[slug]` (doit correspondre à la Sheet 2 — voir `docs/FICHES-ACTIVITES.md`)

---

### Onglet `equipes`

| nom | categorie | division | entraineur | horaire | description | publie |
|-----|-----------|----------|------------|---------|-------------|--------|
| U11 | femmes | Jeunes | À confirmer | Samedi 10h | Initiation... | TRUE |
| Loisirs 3 | mixtes | Loisir | À confirmer | Mercredi 20h | Volley loisir... | TRUE |

**categorie** : `dames`, `messieurs` ou `mixte` (valeurs `femmes` / `mixtes` encore acceptées)

---

### Onglet `sponsors`

| nom | logo_url | lien | niveau | publie |
|-----|----------|------|--------|--------|
| Mon Sponsor | https://drive.google.com/... | https://... | gold | TRUE |

**niveau** : `gold`, `silver` ou `bronze`  
**logo_url** : URL **directe** de l’image (`https://…`) ou lien Google Drive partagé en lecteur

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
2. **Ouvrez le lien « Redeploy site »** (fourni par le développeur — à mettre en favori)
3. Attendez 2–5 min, puis rechargez le site

> Le lien déclenche un rebuild Vercel. **Ne le partagez pas publiquement** (pas sur Facebook, pas sur le site web).

### Alternative (accès Vercel)

Vercel → **Deployments** → **⋯** → **Redeploy**

---

## Photos (logos, bannières)

**Option 1 — URL directe :** si l’image est déjà hébergée (site du club, autre serveur), copiez l’adresse complète `https://…` dans `logo_url`, `*_hero_image` ou `hero_image`.

**Option 2 — Google Drive :**

1. Uploadez l'image dans un dossier Drive partagé
2. Clic droit → **Partager** → « Toute personne avec le lien » en **Lecteur**
3. Collez le lien dans le Sheet

Les liens de posts Facebook/Instagram ne fonctionnent en général pas ; prévoir une URL d’image directe ou Drive. Galerie réseaux sociaux : évolution possible ultérieurement.

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

| Rôle | Accès Sheet | Mettre le site à jour |
|------|-------------|------------------------|
| Président / gestionnaire | **Éditeur** | Lien « Redeploy site » (favori) |
| Développeur | Propriétaire | Lien redeploy ou dashboard Vercel |

Le comité édite le Sheet, puis ouvre le lien redeploy. Pas besoin de compte Vercel.

---

## Contact technique

Pour toute question sur la configuration : contacter le développeur du site avec l'ID du Sheet et l'URL Vercel du projet.
