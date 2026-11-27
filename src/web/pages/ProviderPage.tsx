import { useParams } from 'react-router-dom';
import { providerById } from '../../core/data/providers';
import { averageRating, servicesByProvider, whatsappLink } from '../../core/lib/services';
import { IconClock, IconPin, IconWhatsapp } from '../components/Icons';
import { Avatar, ServiceCard, Stars, VerifiedBadge } from '../components/Ui';
import NotFound from './NotFound';

export default function ProviderPage() {
  const { id = '' } = useParams();
  const provider = providerById(id);
  if (!provider) return <NotFound />;
  const services = servicesByProvider(provider.id);
  const reviews = services.flatMap((s) => s.reviews);
  const rating = reviews.length ? reviews.reduce((a, r) => a + r.rating, 0) / reviews.length : 0;
  const contacts = services.reduce((a, s) => a + s.stats.contacts, 0);

  return (
    <>
      <section className="profile-hero">
        <div className="container profile-hero__inner">
          <Avatar provider={provider} size={104} />
          <div className="profile-hero__info">
            <h1>{provider.name} {provider.verified && <VerifiedBadge />}</h1>
            <p className="profile-hero__title">{provider.title}</p>
            <div className="profile-hero__meta">
              <span><IconPin size={15} /> {provider.quartier}, Kinshasa</span>
              <span><IconClock size={15} /> Répond en {provider.responseTime}</span>
              <span>{provider.languages.join(' · ')}</span>
            </div>
          </div>
          <a className="btn btn--whatsapp btn--lg" target="_blank" rel="noopener" href={whatsappLink(`Bonjour ${provider.name}, je vous ai trouvé sur Services ya Bonsomi.`)}>
            <IconWhatsapp /> Contacter
          </a>
        </div>
      </section>

      <div className="container profile">
        <div className="profile__stats">
          <div><strong>{services.length}</strong><span>service{services.length > 1 ? 's' : ''}</span></div>
          <div><strong>{rating.toFixed(1)}</strong><span>note moyenne</span></div>
          <div><strong>{reviews.length}</strong><span>avis</span></div>
          <div><strong>{contacts}</strong><span>clients contactés</span></div>
        </div>

        <section className="detail__block">
          <h2>À propos</h2>
          <p>{provider.bio}</p>
          {provider.verified ? (
            <p className="note note--ok"><VerifiedBadge withLabel /> Identité et compétences vérifiées par l’équipe Ya Bonsomi.</p>
          ) : (
            <p className="note">Vérification en cours.</p>
          )}
        </section>

        <section className="detail__block">
          <h2>Services proposés</h2>
          <div className="service-grid">{services.map((s) => <ServiceCard key={s.id} service={s} />)}</div>
        </section>

        <section className="detail__block">
          <h2>Derniers avis <Stars value={rating} count={reviews.length} /></h2>
          <ul className="reviews">
            {services.flatMap((s) => s.reviews.slice(0, 2).map((r, i) => (
              <li key={s.id + i} className="review">
                <div className="review__head">
                  <span className="avatar avatar--sm">{r.author[0]}</span>
                  <div><strong>{r.author}</strong><span className="muted">{s.title}</span></div>
                  <span className="review__stars">{averageRating({ ...s, reviews: [r] }).toFixed(0)} ★</span>
                </div>
                <p>{r.text}</p>
              </li>
            )))}
          </ul>
        </section>
      </div>
    </>
  );
}
