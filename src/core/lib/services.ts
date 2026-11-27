import { SITE } from '../config';
import { PROVIDERS } from '../data/providers';
import { SERVICES } from '../data/services';
import type { Service } from '../types';

export const averageRating = (s: Service) =>
  s.reviews.length ? s.reviews.reduce((a, r) => a + r.rating, 0) / s.reviews.length : 0;

/**
 * Taux de recommandation (0–100) — proposition à valider :
 * 45 % note moyenne, 20 % volume d'avis, 20 % taux de contact (contacts / vues), 15 % badge vérifié.
 */
export function recommendationRate(s: Service): number {
  const provider = PROVIDERS.find((p) => p.id === s.providerId);
  const rating = averageRating(s) / 5;
  const volume = Math.min(s.reviews.length / 5, 1);
  const contactRate = s.stats.views ? Math.min(s.stats.contacts / s.stats.views / 0.12, 1) : 0;
  const verified = provider?.verified ? 1 : 0;
  return Math.round((rating * 0.45 + volume * 0.2 + contactRate * 0.2 + verified * 0.15) * 100);
}

const UNIT_LABEL: Record<Service['price']['unit'], string> = {
  forfait: '', heure: '/ heure', jour: '/ jour', 'séance': '/ séance', mois: '/ mois', course: '/ course', page: '/ page',
};

export function formatPrice(s: Service) {
  const amount = `${s.price.amount.toLocaleString('fr-FR')} $`;
  return { prefix: s.price.from ? 'À partir de' : '', amount, unit: UNIT_LABEL[s.price.unit] };
}

export function whatsappLink(message: string, phone: string = SITE.whatsapp) {
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

export function serviceWhatsappMessage(s: Service, providerName: string) {
  return `Bonjour ${providerName}, j'ai vu votre service « ${s.title} » sur ${SITE.name}. Est-il disponible ?`;
}

export type SortKey = 'recommandes' | 'prix-asc' | 'prix-desc' | 'note';

export interface Filters {
  q?: string;
  categorie?: string;
  quartier?: string;
  tri?: SortKey;
  verifies?: boolean;
}

const norm = (t: string) => t.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();

export function searchServices(f: Filters): Service[] {
  const q = f.q ? norm(f.q.trim()) : '';
  let list = SERVICES.filter((s) => {
    const provider = PROVIDERS.find((p) => p.id === s.providerId);
    if (f.categorie && s.category !== f.categorie) return false;
    if (f.quartier && !s.zones.includes(f.quartier) && !s.zones.includes('Tout Kinshasa')) return false;
    if (f.verifies && !provider?.verified) return false;
    if (q && !norm(`${s.title} ${s.description} ${provider?.name} ${provider?.title} ${s.category}`).includes(q)) return false;
    return true;
  });
  const tri = f.tri ?? 'recommandes';
  list = [...list].sort((a, b) => {
    if (tri === 'prix-asc') return a.price.amount - b.price.amount;
    if (tri === 'prix-desc') return b.price.amount - a.price.amount;
    if (tri === 'note') return averageRating(b) - averageRating(a);
    return recommendationRate(b) - recommendationRate(a);
  });
  return list;
}

export const servicesByProvider = (providerId: string) => SERVICES.filter((s) => s.providerId === providerId);
export const servicesByCategory = (slug: string) => SERVICES.filter((s) => s.category === slug);
