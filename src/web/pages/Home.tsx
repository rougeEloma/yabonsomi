import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { QUARTIERS, TAGLINES } from '../../core/config';
import { CATEGORIES } from '../../core/data/categories';
import { SERVICES } from '../../core/data/services';
import { searchServices, servicesByCategory } from '../../core/lib/services';
import { IconArrow, IconChat, IconLock, IconPin, IconSearch, IconShield, IconTag, IconTrend, IconVerified } from '../components/Icons';
import { SectionTitle, ServiceCard } from '../components/Ui';

const POPULAR = ['Électricien', 'Ménage', 'Mécanicien', 'Maquillage', 'Site web', 'Livraison'];

function Hero() {
  const nav = useNavigate();
  const [q, setQ] = useState('');
  const [quartier, setQuartier] = useState('');
  const go = (term = q) => {
    const p = new URLSearchParams();
    if (term) p.set('q', term);
    if (quartier) p.set('quartier', quartier);
    nav(`/services?${p}`);
  };
  return (
    <section className="hero">
      <div className="hero__rings" aria-hidden="true"><span /><span /><span /></div>
      <div className="container hero__grid">
        <div className="hero__copy">
          <p className="kicker kicker--yellow">Kinshasa · RD Congo</p>
          <h1>{TAGLINES.need}</h1>
          <p className="hero__lead">
            Trouvez, comparez et contactez directement des professionnels vérifiés, du jardinage au design web.
            Les prix et les conditions sont fixés par les prestataires eux-mêmes.
          </p>
          <form className="search" role="search" onSubmit={(e) => { e.preventDefault(); go(); }}>
            <label className="search__field">
              <IconSearch />
              <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Quel service cherchez-vous ?" aria-label="Service recherché" />
            </label>
            <label className="search__field search__field--select">
              <IconPin size={18} />
              <select value={quartier} onChange={(e) => setQuartier(e.target.value)} aria-label="Quartier">
                <option value="">Tout Kinshasa</option>
                {QUARTIERS.map((x) => <option key={x}>{x}</option>)}
              </select>
            </label>
            <button className="btn btn--yellow" type="submit">Rechercher</button>
          </form>
          <div className="hero__popular">
            <span>Populaire :</span>
            {POPULAR.map((p) => <button key={p} type="button" className="chip chip--ghost" onClick={() => go(p)}>{p}</button>)}
          </div>
        </div>
        <div className="hero__visual" aria-hidden="true">
          <img className="hero__img hero__img--a" src="/img/cat/electricite-1.webp" alt="" width={360} height={270} />
          <img className="hero__img hero__img--b" src="/img/cat/beaute-1.webp" alt="" width={360} height={240} />
          <img className="hero__img hero__img--c" src="/img/cat/mecanique-1.webp" alt="" width={360} height={240} />
          <div className="hero__badge">
            <IconVerified size={28} className="text-yellow" />
            <div><strong>Prestataires vérifiés</strong><span>Identité et compétences contrôlées</span></div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Categories() {
  return (
    <section className="section" id="categories">
      <div className="container">
        <SectionTitle kicker="Du jardinage au design web" title="Les catégories de services" />
        <div className="cat-grid">
          {CATEGORIES.map((c) => (
            <Link key={c.slug} to={`/services?categorie=${c.slug}`} className="cat-card">
              <img src={c.images[0]} alt="" loading="lazy" width={320} height={400} />
              <div className="cat-card__overlay">
                <h3>{c.name}</h3>
                <p>{c.short}</p>
                <span className="cat-card__count">{servicesByCategory(c.slug).length} service{servicesByCategory(c.slug).length > 1 ? 's' : ''}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const client = [
    ['Cherchez', 'Tapez le service dont vous avez besoin et choisissez votre quartier.'],
    ['Comparez', 'Prix, conditions, notes et avis : tout est affiché clairement.'],
    ['Contactez', 'Écrivez directement au prestataire sur WhatsApp, sans intermédiaire.'],
  ];
  const pro = [
    ['Créez un compte', 'Vous êtes redirigé vers votre tableau de bord pour finir votre profil.'],
    ['Ajoutez un service', 'Titre, description, catégorie : vous fixez librement vos prix et conditions.'],
    ['Obtenez de l’exposition', 'Vos notes et statistiques augmentent votre taux de recommandation.'],
  ];
  const Steps = ({ items }: { items: string[][] }) => (
    <ol className="steps">
      {items.map(([t, d], i) => (
        <li key={t}><span className="steps__num">{String(i + 1).padStart(2, '0')}</span><div><h4>{t}</h4><p>{d}</p></div></li>
      ))}
    </ol>
  );
  return (
    <section className="section section--cream" id="comment-ca-marche">
      <div className="container">
        <SectionTitle title={TAGLINES.how} center />
        <div className="how-grid">
          <div className="how-col">
            <p className="how-col__label">Vous êtes client</p>
            <h3>{TAGLINES.need}</h3>
            <Steps items={client} />
            <Link to="/services" className="btn btn--navy">Trouver un service <IconArrow /></Link>
          </div>
          <div className="how-col how-col--dark">
            <p className="how-col__label">Vous êtes prestataire</p>
            <h3>{TAGLINES.sell}</h3>
            <Steps items={pro} />
            <Link to="/devenir-prestataire" className="btn btn--yellow">Devenir prestataire <IconArrow /></Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function Featured() {
  const top = searchServices({}).slice(0, 8);
  return (
    <section className="section">
      <div className="container">
        <div className="section-head">
          <SectionTitle kicker="Les mieux recommandés" title="Services populaires à Kinshasa" />
          <Link to="/services" className="link-arrow">Voir les {SERVICES.length} services <IconArrow /></Link>
        </div>
        <div className="service-grid">
          {top.map((s) => <ServiceCard key={s.id} service={s} />)}
        </div>
      </div>
    </section>
  );
}

function Offer() {
  const items = [
    { icon: <IconShield />, t: 'Vérification rigoureuse', d: 'Chaque prestataire « vérifié » a été contrôlé : identité, compétences, références.' },
    { icon: <IconTag />, t: 'Transparence des prix', d: 'Les prix et conditions sont fixés par le prestataire et affichés avant tout contact.' },
    { icon: <IconChat />, t: 'Contact direct', d: 'Un clic suffit pour discuter sur WhatsApp avec le professionnel de votre choix.' },
    { icon: <IconLock />, t: 'Transactions sécurisées', d: 'Paiement en ligne sécurisé, avec mobile money, bientôt disponible.' },
    { icon: <IconTrend />, t: 'Visibilité pour les indépendants', d: 'Une vitrine numérique complète : profil, services, avis et statistiques.' },
    { icon: <IconPin size={22} />, t: 'Local avant tout', d: 'Des prestataires de votre quartier, partout dans Kinshasa.' },
  ];
  return (
    <section className="section section--navy">
      <div className="container">
        <SectionTitle title={TAGLINES.offer} light center />
        <div className="offer-grid">
          {items.map((x) => (
            <div key={x.t} className="offer-card">
              <span className="offer-card__icon">{x.icon}</span>
              <h3>{x.t}</h3>
              <p>{x.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SellBand() {
  return (
    <section className="sell-band">
      <div className="container sell-band__inner">
        <div>
          <p className="kicker kicker--navy">Indépendants, artisans, freelances</p>
          <h2>{TAGLINES.sell}</h2>
        </div>
        <Link to="/devenir-prestataire" className="btn btn--navy btn--lg">Publier mon service <IconArrow /></Link>
      </div>
    </section>
  );
}

function Vision() {
  return (
    <section className="section vision">
      <div className="container vision__grid">
        <div>
          <p className="kicker">{TAGLINES.nation}</p>
          <h2 className="vision__title">{TAGLINES.jobs}</h2>
          <p>
            Ya Bonsomi aide les indépendants à formaliser leurs compétences, à gagner en visibilité et à faire circuler
            l’argent dans l’économie locale.
          </p>
        </div>
        <div className="vision__stat">
          <strong>77,1 %</strong>
          <span>de l’emploi urbain à Kinshasa relève du secteur informel.</span>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <Hero />
      <Categories />
      <HowItWorks />
      <Featured />
      <Offer />
      <SellBand />
      <Vision />
    </>
  );
}
