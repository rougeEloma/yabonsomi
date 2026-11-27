export const SITE = {
  name: 'Services ya Bonsomi',
  short: 'yabonsomi',
  email: 'client@yabonsomi.com',
  phone: '+243 829 793 378',
  whatsapp: '243829793378', // format wa.me (sans + ni espaces)
  city: 'Kinshasa',
  currency: 'USD',
} as const;

// Accroches officielles — reprises telles quelles (ne pas corriger sans validation du créateur).
export const TAGLINES = {
  sell: 'Vendez vos Services en quelques cliques seulement !',
  need: "Besoin d'un prestataire de service ?",
  offer: "L'offre de Ya Bonsomi",
  nation: 'Pour le développement de la nation',
  jobs: "Créer de l'emploi et réduire le chômage !",
  how: 'COMMENT CA MARCHE ?',
  connect:
    "Connectez vous directement d'indépendant à employeur, d'employeur à indépendant en quelques cliques seulement.",
} as const;

export const QUARTIERS = [
  'Gombe', 'Limete', 'Ngaliema', 'Bandalungwa', 'Kintambo', 'Lingwala', 'Kalamu',
  'Kasa-Vubu', 'Lemba', 'Matete', 'Masina', 'Ngiri-Ngiri', 'Barumbu', 'Mont-Ngafula', 'Selembao',
] as const;
