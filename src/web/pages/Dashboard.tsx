import { Link } from 'react-router-dom';
import { providerById } from '../../core/data/providers';
import { averageRating, formatPrice, recommendationRate, servicesByProvider } from '../../core/lib/services';
import { IconChat, IconEye, IconPlus, IconStar, IconTrend } from '../components/Icons';
import { Avatar, VerifiedBadge } from '../components/Ui';

// Aperçu du tableau de bord avec un prestataire fictif (pas de connexion pour l'instant).
const DEMO_PROVIDER = 'p02';
const WEEK = [38, 52, 47, 61, 58, 74, 69];
const DAYS = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];

export default function Dashboard() {
  const provider = providerById(DEMO_PROVIDER)!;
  const services = servicesByProvider(provider.id);
  const views = services.reduce((a, s) => a + s.stats.views, 0);
  const contacts = services.reduce((a, s) => a + s.stats.contacts, 0);
  const reviews = services.flatMap((s) => s.reviews);
  const rating = reviews.reduce((a, r) => a + r.rating, 0) / reviews.length;
  const reco = Math.round(services.reduce((a, s) => a + recommendationRate(s), 0) / services.length);
  const max = Math.max(...WEEK);

  const kpis = [
    { icon: <IconEye />, label: 'Vues des services', value: views.toLocaleString('fr-FR') },
    { icon: <IconChat />, label: 'Contacts WhatsApp', value: contacts },
    { icon: <IconStar size={20} />, label: 'Note moyenne', value: `${rating.toFixed(1)} / 5` },
    { icon: <IconTrend />, label: 'Taux de recommandation', value: `${reco} %` },
  ];

  return (
    <div className="dash">
      <div className="container">
        <p className="demo-note">Aperçu de démonstration : voici ce que verra un prestataire une fois connecté.</p>
        <div className="dash__head">
          <div className="dash__who">
            <Avatar provider={provider} size={56} />
            <div>
              <p className="muted small">Bonjour 👋</p>
              <h1>{provider.name} {provider.verified && <VerifiedBadge />}</h1>
            </div>
          </div>
          <button className="btn btn--yellow" disabled title="Disponible après connexion"><IconPlus size={18} /> Ajouter un service</button>
        </div>

        <div className="kpis">
          {kpis.map((k) => (
            <div key={k.label} className="kpi">
              <span className="kpi__icon">{k.icon}</span>
              <strong>{k.value}</strong>
              <span className="muted">{k.label}</span>
            </div>
          ))}
        </div>

        <div className="dash__grid">
          <section className="panel">
            <h2>Contacts reçus cette semaine</h2>
            <div className="bars" role="img" aria-label={`Contacts par jour : ${WEEK.join(', ')}`}>
              {WEEK.map((v, i) => (
                <div key={i} className="bars__col">
                  <span className="bars__val">{v}</span>
                  <span className="bars__bar" style={{ height: `${(v / max) * 100}%` }} />
                  <span className="bars__lbl">{DAYS[i]}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="panel">
            <h2>Compléter mon profil</h2>
            <div className="progress"><span style={{ width: '80%' }} /></div>
            <p className="muted small">80 % complété</p>
            <ul className="checklist checklist--todo">
              <li className="done">Photo et présentation</li>
              <li className="done">Numéro WhatsApp</li>
              <li className="done">Premier service publié</li>
              <li className="done">Vérification d’identité</li>
              <li>Ajouter 3 photos de réalisations</li>
            </ul>
          </section>
        </div>

        <section className="panel">
          <h2>Mes services</h2>
          <div className="table-wrap">
            <table className="table">
              <thead><tr><th>Service</th><th>Prix</th><th>Vues</th><th>Contacts</th><th>Note</th><th>Recommandation</th></tr></thead>
              <tbody>
                {services.map((s) => {
                  const p = formatPrice(s);
                  return (
                    <tr key={s.id}>
                      <td><Link to={`/services/${s.id}`} className="table__svc"><img src={s.images[0]} alt="" width={48} height={36} loading="lazy" />{s.title}</Link></td>
                      <td>{p.amount} <span className="muted">{p.unit}</span></td>
                      <td>{s.stats.views}</td>
                      <td>{s.stats.contacts}</td>
                      <td>{averageRating(s).toFixed(1)}</td>
                      <td><span className="reco">{recommendationRate(s)} %</span></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}
