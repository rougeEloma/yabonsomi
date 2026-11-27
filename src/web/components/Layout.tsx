import { useEffect, useState } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import { SITE, TAGLINES } from '../../core/config';
import { CATEGORIES } from '../../core/data/categories';
import { whatsappLink } from '../../core/lib/services';
import { IconClose, IconMenu, IconWhatsapp } from './Icons';
import { Logo } from './Ui';

function Header() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className="header">
      <div className="container header__inner">
        <Logo />
        <nav className={`nav ${open ? 'nav--open' : ''}`} aria-label="Navigation principale">
          <NavLink to="/services">Services</NavLink>
          <Link to="/#categories">Catégories</Link>
          <Link to="/#comment-ca-marche">Comment ça marche</Link>
          <NavLink to="/tableau-de-bord">Espace prestataire</NavLink>
          <Link to="/devenir-prestataire" className="btn btn--yellow btn--sm">Devenir prestataire</Link>
        </nav>
        <button className="nav-toggle" onClick={() => setOpen((o) => !o)} aria-expanded={open} aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}>
          {open ? <IconClose /> : <IconMenu />}
        </button>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div>
          <Logo light />
          <p className="footer__tag">{TAGLINES.connect}</p>
          <p className="footer__nation">{TAGLINES.nation}</p>
        </div>
        <div>
          <h4>Catégories</h4>
          <ul>
            {CATEGORIES.slice(0, 6).map((c) => (
              <li key={c.slug}><Link to={`/services?categorie=${c.slug}`}>{c.name}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h4>Ya Bonsomi</h4>
          <ul>
            <li><Link to="/services">Trouver un service</Link></li>
            <li><Link to="/devenir-prestataire">Devenir prestataire</Link></li>
            <li><Link to="/tableau-de-bord">Espace prestataire</Link></li>
            <li><Link to="/#comment-ca-marche">Comment ça marche</Link></li>
          </ul>
        </div>
        <div>
          <h4>Contact</h4>
          <ul>
            <li><a href={`mailto:${SITE.email}`}>{SITE.email}</a></li>
            <li><a href={`tel:${SITE.phone.replace(/\s/g, '')}`}>{SITE.phone}</a></li>
            <li><a href={whatsappLink(`Bonjour ${SITE.name} !`)} target="_blank" rel="noopener"><IconWhatsapp size={16} /> WhatsApp</a></li>
            <li>{SITE.city}, RD Congo</li>
          </ul>
        </div>
      </div>
      <div className="container footer__bottom">
        <span>© {new Date().getFullYear()} {SITE.name}. Un projet du Collectif Fayae.</span>
        <span>Fait à Kinshasa 🇨🇩</span>
      </div>
    </footer>
  );
}

function ScrollManager() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1));
      if (el) { el.scrollIntoView({ behavior: 'smooth' }); return; }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}

export default function Layout() {
  return (
    <>
      <ScrollManager />
      <div className="demo-banner" role="note">Version de démonstration : les prestataires, services et avis affichés sont fictifs.</div>
      <Header />
      <main id="contenu">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
