# Guide comité — modifier le site via Google Sheets

**Version web (lien à partager en privé) :** [vcp-site.vercel.app/guide](https://vcp-site.vercel.app/guide)

Ce document s’adresse au **président, au secrétariat et aux personnes qui mettent à jour le site** sans connaissance technique.  
Pas besoin de savoir programmer : on modifie des tableaux, comme un Excel en ligne.

Pour la configuration technique (Vercel, développeur), voir [GUIDE-GOOGLE-SHEETS.md](GUIDE-GOOGLE-SHEETS.md).

---

## En deux mots : comment ça marche ?

Le site **ne lit pas le Sheet en direct** à chaque visite. À chaque **mise en ligne**, il « photocopie » le contenu des Google Sheets et construit les pages.

```
Vous modifiez le Sheet  →  vous lancez la mise en ligne  →  le site public est à jour
```

**Important :** après avoir changé un texte ou une date dans le Sheet, il faut **toujours** lancer la mise en ligne (lien redeploy en favori). Sinon le site affiche encore l’ancienne version.

Délai habituel : **2 à 5 minutes**, puis rechargez la page du site (idéalement avec un rafraîchissement forcé sur PC : `Ctrl + F5`).

---

## Vos fichiers (liens utiles)

Tout est dans le dossier Drive **VCP-site** :

| Fichier | Lien | À quoi ça sert |
|---------|------|----------------|
| Dossier Drive | [Ouvrir le dossier](https://drive.google.com/drive/folders/1HGBTbGphfkrarboCuQg25yS5uPM95-ws) | Photos, Sheets, documents du club |
| **VCP — Contenu du site** | [Ouvrir le Sheet principal](https://docs.google.com/spreadsheets/d/1Ew6-hF2zl-Hr1GADbGEdyemJv28B50AMJtDkewiZER8/edit) | Presque tout le contenu du site |
| **VCP — Fiches activités** | [Ouvrir les fiches](https://docs.google.com/spreadsheets/d/1dxN0QBz_97CK5JidHnqOgldf9OvJ9xsHienb-kMvF2Q/edit) | Textes longs pour certains événements |

**Site public :** [https://vcp-site.vercel.app](https://vcp-site.vercel.app)

**Mise en ligne :** utilisez le **lien redeploy** mis en favori (communiqué en message privé — ne pas publier sur Facebook).

---

## Le Sheet principal : les onglets en bas

Un Google Sheet peut contenir plusieurs **onglets** (feuilles en bas de l’écran). Chaque onglet correspond à une zone du site.

| Onglet | En langage simple | Où ça apparaît sur le site |
|--------|-------------------|----------------------------|
| **config** | Réglages + textes généraux | Téléphone, emails, adresse, Facebook, liens inscription/boutique, nombreux libellés (boutons, titres de pages…) |
| **menu** | Menu du haut et du pied de page | Accueil, Le Club, Équipes, Boutique… |
| **actualites** | Petites news | Accueil — section « Dernières actualités » |
| **activites** | Événements du club | Page Activités + accueil (« Prochains événements », titre et date seulement) |
| **equipes** | Liste des équipes | Page Équipes |
| **sponsors** | Partenaires | Bandeau sponsors sur l’accueil |
| **comite** | Membres du bureau | Page Club + Contact |
| **stats** | Chiffres clés | Barre sous le bandeau d’accueil (ex. « 1962 », « 11 équipes ») |
| **pages** | Texte long | Page Le Club — histoire du club |
| **valeurs** | Encadrés « nos valeurs » | Page Le Club |
| **etapes** | Étapes numérotées | Page Inscriptions (« comment s’inscrire ») |
| **liens_rapides** | Cartes de raccourci | Accueil — « Besoin d’informations ? » |

---

## Règle d’or : la colonne `publie`

Sur la plupart des onglets, la dernière colonne s’appelle **`publie`**.

| Valeur | Effet |
|--------|--------|
| **TRUE** | La ligne est **visible** sur le site |
| **FALSE** | La ligne est **masquée** (mais pas supprimée — pratique pour une saison prochaine) |

Écrivez bien `TRUE` ou `FALSE` en **majuscules**, sans accents.

---

## Onglet `config` — coordonnées et réglages

Deux colonnes : **`cle`** | **`valeur`**

Chaque ligne est un paramètre. Exemples utiles au quotidien :

| cle | Exemple de valeur | Effet |
|-----|-------------------|--------|
| `email` | info@volleyclubperwez.be | Email affiché au contact |
| `phone` | 0475 35 47 26 | Téléphone |
| `facebook` | https://www.facebook.com/VCPerwez | Lien Facebook |
| `instagram` | https://www.instagram.com/… | Lien Instagram |
| `lien_inscription` | https://forms.gle/… | Bouton « S'inscrire » |
| `lien_boutique` | https://www.volleyclubperwez.be/boutique/… | Lien boutique |
| `equipes_intro` | Un paragraphe… | Texte d’intro sur Équipes et Inscriptions |
| `founded` | 1962 | Année de fondation (affichée à plusieurs endroits) |

Il existe aussi beaucoup de lignes **`nav_…`**, **`cta_…`**, **`club_…`**, etc. : ce sont les **textes des boutons et titres** du site. Vous pouvez les modifier comme une traduction (ex. changer le libellé d’un bouton).

### Photos en bannière (optionnel)

Lignes du type **`club_hero_image`**, **`activites_hero_image`**, etc. :

- **Cellule vide** → bandeau texte habituel (fond sombre)
- **Lien vers une photo** (URL complète `https://…` ou lien Google Drive partagé) → grande photo en haut de la page

Voir la section [Photos plus bas](#ajouter-une-photo-logo-sponsor-ou-bannière).

---

## Onglet `menu` — le menu du site

| Colonne | Signification |
|---------|---------------|
| **ordre** | Position (01, 02, 03…) — le menu suit cet ordre |
| **label** | Texte affiché (ex. « Le Club ») |
| **url** | Adresse : page interne (`/club`) ou lien complet (`https://…`) |
| **externe** | `TRUE` si le lien doit s’ouvrir dans un **nouvel onglet** (ex. boutique) |
| **publie** | `TRUE` / `FALSE` |

**Pages internes courantes :**

| url | Page |
|-----|------|
| `/` | Accueil |
| `/club` | Le Club |
| `/equipes` | Équipes |
| `/activites` | Activités |
| `/inscriptions` | Inscriptions |
| `/contact` | Contact |

Le bouton rouge **« Rejoindre »** en haut à droite **ne se gère pas ici** : il vient de `lien_inscription` dans **config**.

---

## Onglet `activites` — événements

C’est la source pour la **page Activités** et pour les **événements à venir** sur l’accueil (titre + date uniquement sur l’accueil).

| Colonne | Signification |
|---------|---------------|
| **id** | Identifiant interne (ex. `familles-2026`) — unique, sans espaces |
| **slug** | Identifiant pour l’URL détaillée (ex. `journee-familles`) — voir fiches ci-dessous |
| **titre** | Nom de l’événement |
| **date_debut** | Date de début (JJ/MM/AAAA ou via le calendrier Sheets) |
| **date_fin** | Date de fin (vide si un seul jour) |
| **texte_date** | Texte libre à la place des dates (ex. « Premier week-end de septembre ») — optionnel |
| **horaire** | Ex. « À partir de 10h00 » |
| **lieu** | Adresse ou nom du lieu |
| **description** | Résumé (visible sur la page Activités, pas sur l’accueil) |
| **lien_inscription** | Lien Spond / formulaire — bouton « S'inscrire » si rempli |
| **publie** | `TRUE` / `FALSE` |

**Dates passées :** le site les classe automatiquement en **« Terminés »** sur la page Activités. Sur l’**accueil**, seuls les événements **à venir** sont affichés.

---

## Sheet 2 — Fiches activités (texte long)

Fichier séparé : [VCP — Fiches activités](https://docs.google.com/spreadsheets/d/1dxN0QBz_97CK5JidHnqOgldf9OvJ9xsHienb-kMvF2Q/edit)

Onglet **`fiches`** :

| Colonne | Signification |
|---------|---------------|
| **slug** | **Exactement le même** que dans `activites` (ex. `journee-familles`) |
| **titre** | Titre sur la page détail |
| **contenu** | Texte long — **sauter une ligne** entre chaque paragraphe |
| **hero_image** | Photo bannière (optionnel, lien Drive) |
| **publie** | `TRUE` pour activer la page et le lien « Voir l'événement » |

**Exemple :** si `activites` a `slug = journee-familles` et une fiche publiée avec le même slug, le site affiche un lien vers  
`https://vcp-site.vercel.app/activites/journee-familles`

Sans fiche (ou `publie = FALSE`), l’événement reste visible sur la liste mais **sans** page détail.

---

## Autres onglets (résumé)

### `actualites`

| id | titre | date | categorie | extrait | publie |

- **extrait** : court résumé sous le titre sur l’accueil
- **categorie** : petit badge (ex. « Club », « Inscriptions »)

### `equipes`

| nom | categorie | division | entraineur | horaire | description | publie |

- **categorie** : écrire `femmes` ou `mixtes`

### `sponsors`

| nom | logo_url | lien | niveau | publie |

- **niveau** : `gold`, `silver` ou `bronze` (taille d’affichage)
- **logo_url** : adresse **directe** de l’image (`https://…`) ou lien Google Drive partagé

### `comite`

| role | nom | email | telephone | publie |

### `stats`

| valeur | label | publie |

Ex. `1962` | `Fondé en` → affiche « 1962 » avec le texte « Fondé en » en dessous.

### `pages`

| slug | titre | contenu | publie |

- Pour l’instant surtout `slug = club` (texte « Qui sommes-nous »)
- Paragraphes séparés par une **ligne vide** dans la cellule

### `valeurs` (page Club)

| titre | description | publie |

### `etapes` (page Inscriptions)

| titre | description | publie |

### `liens_rapides` (accueil)

| ordre | titre | description | url | publie |

Cartes cliquables vers une page du site (ex. `/equipes`).

---

## Recettes pas à pas

### Changer le numéro de téléphone ou l’email

1. Onglet **config**
2. Trouver la ligne `cle` = `phone` ou `email`
3. Modifier la colonne **valeur**
4. Mise en ligne (lien redeploy) → attendre → recharger le site

### Ajouter une actualité

1. Onglet **actualites**
2. Nouvelle ligne en bas
3. Remplir titre, date, catégorie, extrait
4. **publie** = `TRUE`
5. Mise en ligne

### Masquer un événement sans le supprimer

1. Onglet **activites**
2. Mettre **publie** = `FALSE` sur la ligne
3. Mise en ligne

### Ajouter un événement avec page détail

1. Onglet **activites** : nouvelle ligne avec un **slug** unique (ex. `beach2026`)
2. Sheet **Fiches activités** : nouvelle ligne avec le **même slug**
3. Rédiger le **contenu** long dans la fiche
4. Les deux lignes en **publie** = `TRUE`
5. Mise en ligne

### Modifier le menu (ordre ou libellé)

1. Onglet **menu**
2. Changer **ordre**, **label** ou **url**
3. Pour retirer temporairement : **publie** = `FALSE`
4. Mise en ligne

### Ajouter une équipe

1. Onglet **equipes**
2. Nouvelle ligne : nom, categorie (`femmes` ou `mixtes`), division, entraîneur, horaire, description
3. **publie** = `TRUE`
4. Pensez à mettre à jour **stats** si le nombre d’équipes change (ex. « 11 » → « 12 »)
5. Mise en ligne

---

## Ajouter une photo (logo sponsor ou bannière)

Deux méthodes possibles — le site accepte toute **URL complète** qui pointe vers une image (`https://…`).

### Option A — Image déjà hébergée ailleurs (le plus simple)

Si la photo est déjà en ligne (site du club, hébergeur, CDN, etc.) :

1. Ouvrez l’image dans le navigateur (ou faites clic droit → **Copier l’adresse de l’image**)
2. Collez l’**URL complète** dans le Sheet :
   - Sponsor → colonne **logo_url**
   - Bannière de page → ligne `club_hero_image`, etc. dans **config**
   - Fiche événement → colonne **hero_image**
3. Mise en ligne (lien redeploy)

L’adresse doit se terminer souvent par `.jpg`, `.png`, `.webp`… ou être un lien direct affichant uniquement l’image.

> **Facebook / Instagram :** le lien d’une **publication** ne fonctionne en général **pas** (ce n’est pas une adresse d’image). Il faut l’URL directe du fichier image, ou utiliser Google Drive (option B).  
> *À l’avenir, une galerie liée aux albums Facebook ou Instagram pourra simplifier ce choix — pas encore disponible.*

### Option B — Google Drive (dossier VCP-site)

1. Déposez l’image dans le dossier [VCP-site sur Drive](https://drive.google.com/drive/folders/1HGBTbGphfkrarboCuQg25yS5uPM95-ws)
2. Clic droit sur le fichier → **Partager**
3. Accès : **Toute personne disposant du lien** → rôle **Lecteur**
4. Copiez le lien (format `https://drive.google.com/file/d/…/view`)
5. Collez-le dans le Sheet (mêmes colonnes que ci-dessus)
6. Mise en ligne

Le site convertit automatiquement les liens Drive.

### Si l’image ne s’affiche pas

| Cause | Solution |
|-------|----------|
| Lien Drive non public | Partager en **Lecteur** pour tout le monde avec le lien |
| Lien vers une page web (pas l’image) | Utiliser l’**URL directe** de l’image |
| Lien Facebook / Instagram (post) | Télécharger la photo ou la mettre sur Drive / hébergeur |

---

## Erreurs fréquentes

| Problème | Cause probable | Solution |
|----------|----------------|----------|
| Rien ne change sur le site | Pas de mise en ligne après édition | Ouvrir le lien redeploy, attendre 5 min |
| Encore l’ancien texte dans le navigateur | Cache du navigateur | `Ctrl + F5` ou navigation privée |
| Une ligne n’apparaît pas | `publie` = `FALSE` ou cellule vide | Mettre `TRUE`, vérifier titre rempli |
| Lien « Voir l'événement » absent | Pas de fiche ou slug différent | Même **slug** dans `activites` et `fiches`, `publie` = `TRUE` |
| Photo invisible | Mauvais type de lien ou Drive non public | URL **directe** de l’image, ou Drive en « Lecteur » |
| Onglet ignoré | Mauvais nom d’onglet | Noms en **minuscules**, sans faute : `activites`, pas `Activités` |

---

## Ce que vous n’avez pas besoin de faire

- Pas de compte Vercel pour le comité (le lien redeploy suffit)
- Pas de modification du code du site pour changer un texte ou une date
- Pas d’abonnement payant pour Google Sheets ou l’hébergement actuel (offre gratuite)

---

## Besoin d’aide ?

Contactez **Frédéric** (développement du site) en précisant :

- Ce que vous vouliez modifier
- Quel onglet du Sheet
- Ce que vous voyez sur le site vs ce que vous attendiez

---

*Dernière mise à jour : guide pour le site [vcp-site.vercel.app](https://vcp-site.vercel.app) — CMS Google Sheets VCP.*
