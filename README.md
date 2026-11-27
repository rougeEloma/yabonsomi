# Services ya Bonsomi

Marketplace de services pour Kinshasa (RD Congo) : les clients trouvent, comparent et contactent sur WhatsApp
des prestataires indépendants vérifiés, du jardinage au design web.

> **Version de démonstration** : plateforme visuelle sans connexion ni base de données.
> Les prestataires, services et avis sont fictifs.

En ligne : https://yabonsomi.netlify.app

## Stack

- React 18 + Vite + TypeScript, React Router
- Déploiement : Netlify (`netlify.toml`, redirection SPA dans `public/_redirects`)
- À venir : Supabase (base de données, authentification), puis application React Native

## Démarrer

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # génère dist/
```

## Organisation

```
src/
  core/            # réutilisable tel quel en React Native (aucun import web)
    config.ts      # nom du site, contacts, accroches officielles, quartiers
    types.ts       # Category, Provider, Service, Review
    data/          # données fictives (à remplacer par Supabase)
    lib/services.ts# recherche, tri, taux de recommandation, prix, liens WhatsApp
  web/
    components/    # Layout (en-tête, pied de page), cartes, icônes
    pages/         # Accueil, Catalogue, Fiche service, Vitrine, Devenir prestataire, Tableau de bord
  index.css        # charte graphique (couleurs du pitch deck)
public/
  logo.webp, favicon.png
  img/cat/         # photos des catégories (WebP optimisé)
```

## Charte graphique (ne pas modifier)

| Rôle | Couleur |
| --- | --- |
| Bleu marine | `#013879` |
| Bleu roi | `#2B4E93` |
| Jaune moutarde | `#EDB221` |
| Crème | `#FFF4DA` |
| Jaune pâle | `#FFDE8F` |
| Marine profond | `#041944` |

Polices : Inter (titres), Open Sans (texte). Sur fond jaune, texte toujours en marine.

Les accroches officielles sont dans `src/core/config.ts` et sont reprises telles quelles.

## Contact

client@yabonsomi.com · +243 829 793 378

Un projet du Collectif Fayae.
