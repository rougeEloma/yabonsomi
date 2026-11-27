import { Link } from 'react-router-dom';
import { SITE } from '../../core/config';
import { categoryBySlug } from '../../core/data/categories';
import { providerById } from '../../core/data/providers';
import { averageRating, formatPrice, recommendationRate } from '../../core/lib/services';
import type { Provider, Service } from '../../core/types';
import { IconPin, IconStar, IconVerified } from './Icons';

export function Logo({ light = false, compact = false }: { light?: boolean; compact?: boolean }) {
  return (
    <Link to="/" className={`logo ${light ? 'logo--light' : ''}`} aria-label={`${SITE.name}, accueil`}>
      <img src="/logo.webp" alt="" width={251} height={322} className="logo__img" />
      {!compact && (
        <span className="logo__text">
          <small>Services</small> ya Bonsomi
        </span>
      )}
    </Link>
  );
}

export function Stars({ value, count }: { value: number; count?: number }) {
  return (
    <span className="stars" aria-label={`Note ${value.toFixed(1)} sur 5`}>
      <IconStar size={15} />
      <strong>{value.toFixed(1)}</strong>
      {count !== undefined && <span className="muted">({count})</span>}
    </span>
  );
}

export function VerifiedBadge({ withLabel = false }: { withLabel?: boolean }) {
  return (
    <span className="verified" title="Prestataire vérifié">
      <IconVerified size={withLabel ? 18 : 16} />
      {withLabel && <span>Vérifié</span>}
    </span>
  );
}

const AVATAR_COLORS = ['#013879', '#2B4E93', '#EDB221', '#041944'];
export function Avatar({ provider, size = 44 }: { provider: Provider; size?: number }) {
  const initials = provider.name.replace(/^(Prof\.|Arch\.|Coach|Chef|Maman)\s+/, '').split(/\s+/).slice(0, 2).map((w) => w[0]).join('').toUpperCase();
  const bg = AVATAR_COLORS[parseInt(provider.id.slice(1), 10) % AVATAR_COLORS.length];
  const fg = bg === '#EDB221' ? '#013879' : '#FFFFFF';
  return (
    <span className="avatar" style={{ width: size, height: size, background: bg, color: fg, fontSize: size * 0.38 }} aria-hidden="true">
      {initials}
    </span>
  );
}

export function ServiceCard({ service }: { service: Service }) {
  const provider = providerById(service.providerId)!;
  const cat = categoryBySlug(service.category);
  const price = formatPrice(service);
  return (
    <article className="card service-card">
      <Link to={`/services/${service.id}`} className="service-card__link">
        <div className="service-card__media">
          <img src={service.images[0]} alt={service.title} loading="lazy" width={480} height={360} />
          <span className="chip chip--cream">{cat?.name}</span>
        </div>
        <div className="service-card__body">
          <div className="service-card__provider">
            <Avatar provider={provider} size={30} />
            <span className="service-card__pname">{provider.name}</span>
            {provider.verified && <VerifiedBadge />}
          </div>
          <h3 className="service-card__title">{service.title}</h3>
          <p className="service-card__meta">
            <Stars value={averageRating(service)} count={service.reviews.length} />
            <span className="dot" />
            <span className="muted"><IconPin size={14} /> {provider.quartier}</span>
          </p>
          <div className="service-card__foot">
            <div className="price">
              {price.prefix && <small>{price.prefix}</small>}
              <strong>{price.amount}</strong> <span className="muted">{price.unit}</span>
            </div>
            <span className="reco" title="Taux de recommandation">{recommendationRate(service)} %</span>
          </div>
        </div>
      </Link>
    </article>
  );
}

export function SectionTitle({ kicker, title, center = false, light = false }: { kicker?: string; title: string; center?: boolean; light?: boolean }) {
  return (
    <div className={`section-title ${center ? 'center' : ''} ${light ? 'light' : ''}`}>
      {kicker && <p className="kicker">{kicker}</p>}
      <h2>{title}</h2>
      <span className="underline" />
    </div>
  );
}
