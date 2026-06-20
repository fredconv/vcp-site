# Bannières photo (hero)

Images de fond optionnelles en haut de certaines pages, modifiables depuis le Google Sheet **sans coder**.

## Comportement

| Image renseignée ? | Résultat |
|--------------------|----------|
| **Non** (cellule vide) | Bandeau hero **texte** habituel (fond sombre VCP) |
| **Oui** (lien image) | Bandeau hero **photo** avec titre par-dessus |

## Où configurer

### Pages du site (onglet `config`)

Ajoutez une ligne `cle` / `valeur` :

| cle | Page |
|-----|------|
| `home_hero_image` | Accueil |
| `club_hero_image` | Le Club |
| `equipes_hero_image` | Équipes |
| `activites_hero_image` | Activités |
| `inscriptions_hero_image` | Inscriptions |
| `contact_hero_image` | Contact |

Les titres et sous-titres du hero restent les clés existantes (`club_hero_titre`, etc.).

### Fiches activités (Sheet 2, onglet `fiches`)

Colonne **`hero_image`** — bannière photo sur `/activites/[slug]` uniquement pour cette fiche.

## Ajouter une image

### URL directe (recommandé si l’image est déjà en ligne)

Collez l’**adresse complète** de l’image (`https://…`) dans `*_hero_image` ou `hero_image`.  
Ex. : photo déjà sur le site du club, un hébergeur, etc.

### Google Drive

1. Uploadez la photo dans le dossier [VCP-site sur Drive](https://drive.google.com/drive/folders/1HGBTbGphfkrarboCuQg25yS5uPM95-ws)
2. Clic droit → **Partager** → « Toute personne disposant du lien » en **Lecteur**
3. Copiez le lien (ex. `https://drive.google.com/file/d/ABC123/view?usp=sharing`)
4. Collez-le dans la cellule concernée

Le site convertit automatiquement les liens Drive.

> Les liens de **publications** Facebook ou Instagram ne conviennent en général pas (ce n’est pas une URL d’image). Utilisez une URL directe, Drive, ou téléchargez la photo. Une galerie Facebook/Instagram pourra être envisagée plus tard.

## Conseils photo

- Format paysage recommandé (16:9 ou similaire)
- Résolution ~1600×900 px ou plus
- Évitez les textes importants sur les bords (recadrage mobile)
- Poids raisonnable (&lt; 2 Mo si possible)

## Après modification

1. Sauvegardez le Sheet
2. **Redeploy** Vercel (lien favori deploy hook)
