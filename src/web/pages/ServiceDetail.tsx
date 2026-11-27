import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { categoryBySlug } from '../../core/data/categories';
import { providerById } from '../../core/data/providers';
import { serviceById } from '../../core/data/services';
import {
  averageRating, formatPrice, recommendationRate, serviceWhatsappMessage, servicesByCategory, whatsappLink,
} from '../../core/lib/services';
import { IconClock, IconPin, IconStar, IconWhatsapp } from '../components/Icons';
import { Avatar, ServiceCard, Stars, VerifiedBadge } from '../components/Ui';
import NotFound from './NotFound';

const fmtDate = (d: string) => new Date(d).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });

export default function ServiceDetail() {
  const { id = '' } = useParams();
  const service = serviceById(id);
  const [active, setActive] = useState(0);
  if (!service) return <NotFound />;

  const provider = providerById(service.providerId)!;
  const cat = categoryBySlug(service.category);
  const price = formatPrice(service);
  const rating = averageRating(service);
  const wa = whatsappLink(serviceWhatsappMessage(service, provider.name));
  const similar = servicesByCategory(service.category).filter((s) => s.id !== service.id).slice(0, 4);

  return (
    <>
      <div className="container detail">
        <nav className="crumbs crumbs--dark" aria-label="Fil d’Ariane">
          <Link to="/">Accueil</Link> / <Link to={`/services?categorie=${service.category}`}>{cat?.name}</Link> / <span>{service.title}</span>
        </nav>

        <div className="detail__grid">
          <div className="detail__main">
            <h1 className="detail__title">{service.title}</h1>
            <div className="detail__meta">
              <Stars value={rating} count={service.reviews.length} />
              <span className="dot" />
              <span className="muted"><IconPin size={15} /> {provider.quartier}, Kinshasa</span>
              <span className="dot" />
              <span className="reco">{recommendationRate(service)} % recommandé</span>
            </div>

            <div className="gallery">
              <img src={service.images[active]} alt={service.title} className="gallery__main" width={720} height={480} />
              {service.images.length > 1 && (
                <div className="gallery__thumbs">
                  {service.images.map((src, i) => (
                    <button key={src} onClick={() => setActive(i)} className={i === active ? 'is-active' : ''} aria-label={`Photo ${i + 1}`}>
                      <img src={src} alt="" width={96} height={72} loading="lazy" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            <section className="detail__block">
              <h2>Description</h2>
              <p>{service.description}</p>
            </section>

            <section className="detail__block">
              <h2>Conditions du prestataire</h2>
              <ul className="checklist">{service.conditions.map((c) => <li key={c}>{c}</li>)}</ul>
            </section>

            <section className="detail__block">
              <h2>Zones d’intervention</h2>
              <div className="chips">{service.zones.map((z) => <span key={z} className="chip chip--cream"><IconPin size={13} /> {z}</span>)}</div>
            </section>

            <section className="detail__block" id="avis">
              <h2>Avis des clients <span className="muted">({service.reviews.length})</span></h2>
              <div className="rating-summary">
                <strong>{rating.toFixed(1)}</strong>
                <div>
                  <div className="stars-row">{[1, 2, 3, 4, 5].map((n) => <IconStar key={n} size={18} className={n <= Math.round(rating) ? 'text-yellow' : 'text-ring'} />)}</div>
                  <span className="muted">{service.reviews.length} avis vérifiés</span>
                </div>
              </div>
              <ul className="reviews">
                {service.reviews.map((r, i) => (
                  <li key={i} className="review">
                    <div className="review__head">
                      <span className="avatar avatar--sm">{r.author[0]}</span>
                      <div><strong>{r.author}</strong><span className="muted">{fmtDate(r.date)}</span></div>
                      <span className="review__stars">{Array.from({ length: r.rating }, (_, k) => <IconStar key={k} size={14} />)}</span>
                    </div>
                    <p>{r.text}</p>
                  </li>
                ))}
              </ul>
              <button className="btn btn--outline" disabled title="Disponible après connexion">Laisser un avis</button>
            </section>
          </div>

          <aside className="detail__side">
            <div className="buy-card">
              <div className="buy-card__price">
                {price.prefix && <small>{price.prefix}</small>}
                <strong>{price.amount}</strong> <span>{price.unit}</span>
              </div>
              <p className="muted small">Prix fixé par le prestataire. Aucun frais caché.</p>
              <a href={wa} className="btn btn--whatsapp btn--block btn--lg" target="_blank" rel="noopener"><IconWhatsapp /> Contacter sur WhatsApp</a>
              <button className="btn btn--outline btn--block" disabled title="Bientôt disponible">Réserver et payer en ligne (bientôt)</button>
            </div>

            <div className="provider-card">
              <div className="provider-card__head">
                <Avatar provider={provider} size={56} />
                <div>
                  <Link to={`/prestataires/${provider.id}`} className="provider-card__name">{provider.name}</Link>
                  <span className="muted">{provider.title}</span>
                </div>
              </div>
              {provider.verified && <VerifiedBadge withLabel />}
              <ul className="provider-card__facts">
                <li><IconPin size={15} /> {provider.quartier}</li>
                <li><IconClock size={15} /> Répond en {provider.responseTime}</li>
                <li>Membre depuis {new Date(provider.memberSince + '-01').toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}</li>
              </ul>
              <Link to={`/prestataires/${provider.id}`} className="btn btn--navy btn--block">Voir la vitrine</Link>
            </div>
          </aside>
        </div>
      </div>

      {similar.length > 0 && (
        <section className="section section--cream">
          <div className="container">
            <h2 className="h-sub">Services similaires</h2>
            <div className="service-grid">{similar.map((s) => <ServiceCard key={s.id} service={s} />)}</div>
          </div>
        </section>
      )}

      <div className="sticky-cta">
        <div>
          {price.prefix && <small>{price.prefix}</small>}
          <strong>{price.amount}</strong> <span className="muted">{price.unit}</span>
        </div>
        <a href={wa} className="btn btn--whatsapp" target="_blank" rel="noopener"><IconWhatsapp /> WhatsApp</a>
      </div>
    </>
  );
}
