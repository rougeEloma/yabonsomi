import type { Category } from '../types';

const img = (slug: string, n: number) =>
  Array.from({ length: n }, (_, i) => `/img/cat/${slug}-${i + 1}.webp`);

export const CATEGORIES: Category[] = [
  { slug: 'menage', name: 'Ménage & nettoyage', short: 'Maisons, bureaux, fin de chantier', images: img('menage', 4) },
  { slug: 'electricite', name: 'Électricité & froid', short: 'Installation, climatisation, dépannage', images: img('electricite', 2) },
  { slug: 'mecanique', name: 'Mécanique automobile', short: 'Entretien, diagnostic, réparation', images: img('mecanique', 3) },
  { slug: 'jardinage', name: 'Jardinage', short: 'Entretien, taille, aménagement', images: img('jardinage', 2) },
  { slug: 'design-web', name: 'Design & développement web', short: 'Sites, logos, applications', images: img('design-web', 2) },
  { slug: 'informatique', name: 'Réparation informatique', short: 'Ordinateurs, cartes, réseaux', images: img('informatique', 2) },
  { slug: 'beaute', name: 'Beauté & maquillage', short: 'Soins, maquillage, mariages', images: img('beaute', 1) },
  { slug: 'cuisine', name: 'Cuisine & traiteur', short: 'Chefs à domicile, événements', images: img('cuisine', 1) },
  { slug: 'photographie', name: 'Photographie', short: 'Portraits, mariages, produits', images: img('photographie', 3) },
  { slug: 'formation', name: 'Cours & formation', short: 'Soutien scolaire, coaching, ateliers', images: img('formation', 2) },
  { slug: 'coach-sportif', name: 'Coach sportif', short: 'Basket, remise en forme, cours privés', images: img('coach-sportif', 3) },
  { slug: 'musique', name: 'Musique', short: 'Cours de guitare, animation', images: img('musique', 1) },
  { slug: 'garde-enfants', name: "Garde d'enfants", short: 'Nounous, baby-sitting', images: img('garde-enfants', 1) },
  { slug: 'livraison', name: 'Livraison & courses', short: 'Colis, déménagements légers', images: img('livraison', 1) },
  { slug: 'architecture', name: 'Architecture & plans', short: 'Plans, maquettes, suivi de chantier', images: img('architecture', 1) },
  { slug: 'immobilier', name: 'Immobilier', short: 'Location, vente, gestion', images: img('immobilier', 1) },
];

export const categoryBySlug = (slug: string) => CATEGORIES.find((c) => c.slug === slug);
