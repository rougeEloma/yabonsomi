import { useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { QUARTIERS } from '../../core/config';
import { CATEGORIES, categoryBySlug } from '../../core/data/categories';
import { searchServices, type SortKey } from '../../core/lib/services';
import { IconSearch } from '../components/Icons';
import { ServiceCard } from '../components/Ui';

export default function Catalogue() {
  const [params, setParams] = useSearchParams();
  const f = {
    q: params.get('q') ?? '',
    categorie: params.get('categorie') ?? '',
    quartier: params.get('quartier') ?? '',
    tri: (params.get('tri') as SortKey) || 'recommandes',
    verifies: params.get('verifies') === '1',
  };
  const results = useMemo(() => searchServices(f), [params]); // eslint-disable-line react-hooks/exhaustive-deps
  const cat = f.categorie ? categoryBySlug(f.categorie) : undefined;

  const set = (key: string, value: string) => {
    const p = new URLSearchParams(params);
    if (value) p.set(key, value); else p.delete(key);
    setParams(p, { replace: true });
  };

  return (
    <>
      <section className={`page-hero ${cat ? 'page-hero--image' : ''}`}>
        {cat && <img src={cat.images[0]} alt="" className="page-hero__bg" />}
        <div className="container page-hero__inner">
          <nav className="crumbs" aria-label="Fil d’Ariane"><Link to="/">Accueil</Link> / <Link to="/services">Services</Link>{cat && <> / <span>{cat.name}</span></>}</nav>
          <h1>{cat ? cat.name : 'Tous les services'}</h1>
          <p>{cat ? cat.short : 'Comparez les prix, les conditions et les avis des prestataires de Kinshasa.'}</p>
        </div>
      </section>

      <div className="cat-strip" role="navigation" aria-label="Catégories">
        <div className="container cat-strip__inner">
          <button className={`chip ${!f.categorie ? 'chip--active' : ''}`} onClick={() => set('categorie', '')}>Toutes</button>
          {CATEGORIES.map((c) => (
            <button key={c.slug} className={`chip ${f.categorie === c.slug ? 'chip--active' : ''}`} onClick={() => set('categorie', c.slug)}>{c.name}</button>
          ))}
        </div>
      </div>

      <section className="section section--tight">
        <div className="container">
          <div className="filters">
            <label className="filters__search">
              <IconSearch size={18} />
              <input value={f.q} onChange={(e) => set('q', e.target.value)} placeholder="Rechercher un service, un métier…" aria-label="Recherche" />
            </label>
            <select value={f.quartier} onChange={(e) => set('quartier', e.target.value)} aria-label="Quartier">
              <option value="">Tous les quartiers</option>
              {QUARTIERS.map((x) => <option key={x}>{x}</option>)}
            </select>
            <select value={f.tri} onChange={(e) => set('tri', e.target.value === 'recommandes' ? '' : e.target.value)} aria-label="Trier">
              <option value="recommandes">Les plus recommandés</option>
              <option value="note">Meilleures notes</option>
              <option value="prix-asc">Prix croissant</option>
              <option value="prix-desc">Prix décroissant</option>
            </select>
            <label className="toggle">
              <input type="checkbox" checked={f.verifies} onChange={(e) => set('verifies', e.target.checked ? '1' : '')} />
              <span>Vérifiés uniquement</span>
            </label>
          </div>

          <p className="results-count">{results.length} service{results.length > 1 ? 's' : ''} trouvé{results.length > 1 ? 's' : ''}{f.quartier && <> à <strong>{f.quartier}</strong></>}</p>

          {results.length ? (
            <div className="service-grid">
              {results.map((s) => <ServiceCard key={s.id} service={s} />)}
            </div>
          ) : (
            <div className="empty">
              <h3>Aucun service ne correspond à votre recherche</h3>
              <p>Essayez un autre mot-clé ou un autre quartier.</p>
              <button className="btn btn--navy" onClick={() => setParams({}, { replace: true })}>Réinitialiser les filtres</button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
