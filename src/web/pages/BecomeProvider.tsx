import { useState } from 'react';
import { Link } from 'react-router-dom';
import { QUARTIERS, TAGLINES } from '../../core/config';
import { CATEGORIES } from '../../core/data/categories';
import { IconArrow, IconChat, IconShield, IconTrend } from '../components/Icons';
import { SectionTitle } from '../components/Ui';

export default function BecomeProvider() {
  const [sent, setSent] = useState(false);
  return (
    <>
      <section className="hero hero--short">
        <div className="hero__rings" aria-hidden="true"><span /><span /><span /></div>
        <div className="container hero__grid">
          <div className="hero__copy">
            <p className="kicker kicker--yellow">Espace prestataire</p>
            <h1>{TAGLINES.sell}</h1>
            <p className="hero__lead">
              Créez votre vitrine numérique gratuitement, fixez vos prix et vos conditions, et recevez des clients
              de votre quartier directement sur WhatsApp.
            </p>
            <ul className="hero__perks">
              <li><IconTrend /> Plus de visibilité que le bouche-à-oreille</li>
              <li><IconShield /> Badge « vérifié » pour inspirer confiance</li>
              <li><IconChat /> Les clients vous écrivent directement</li>
            </ul>
          </div>

          <form className="signup-card" onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
            {sent ? (
              <div className="signup-card__done">
                <h2>Merci !</h2>
                <p>Ceci est une démonstration : l’inscription sera bientôt ouverte. Vous pouvez déjà découvrir l’espace prestataire.</p>
                <Link to="/tableau-de-bord" className="btn btn--navy btn--block">Voir le tableau de bord <IconArrow /></Link>
              </div>
            ) : (
              <>
                <h2>Créer mon compte</h2>
                <p className="muted small">Moins d’une minute. Aucun frais.</p>
                <label>Nom complet<input required placeholder="Ex. Patrick Ilunga" /></label>
                <label>Numéro WhatsApp<input required type="tel" inputMode="tel" placeholder="+243 …" /></label>
                <label>Votre métier
                  <select required defaultValue="">
                    <option value="" disabled>Choisir une catégorie</option>
                    {CATEGORIES.map((c) => <option key={c.slug} value={c.slug}>{c.name}</option>)}
                  </select>
                </label>
                <label>Quartier
                  <select required defaultValue="">
                    <option value="" disabled>Choisir un quartier</option>
                    {QUARTIERS.map((q) => <option key={q}>{q}</option>)}
                  </select>
                </label>
                <button className="btn btn--yellow btn--block btn--lg" type="submit">Commencer <IconArrow /></button>
                <p className="muted small center">Démo : aucune donnée n’est enregistrée.</p>
              </>
            )}
          </form>
        </div>
      </section>

      <section className="section section--cream">
        <div className="container">
          <SectionTitle title={TAGLINES.how} center />
          <ol className="steps steps--row">
            {[
              ['Créer un compte', 'Vous êtes redirigé vers un tableau de bord pour finir de configurer votre profil.'],
              ['Ajouter un service', 'Titre, description, catégorie, photos. Vous fixez librement vos prix et vos conditions.'],
              ['Obtenir de l’exposition', 'Vos performances, notes et statistiques influencent votre taux de recommandation.'],
            ].map(([t, d], i) => (
              <li key={t}><span className="steps__num">{String(i + 1).padStart(2, '0')}</span><div><h4>{t}</h4><p>{d}</p></div></li>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}
