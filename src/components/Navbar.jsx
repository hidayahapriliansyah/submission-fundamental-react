import { Archive, LogOut, SquarePlus } from 'lucide-react';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import LocaleContext from '../context/LocaleContext';

function Navbar({ logout }) {
  const { locale, toggleLocale } = useContext(LocaleContext);

  return (
    <nav>
      <Link to="/">
        <h1>Catata Catat</h1>
      </Link>

      <div className="note-app__header-menu">
        <button
          type="button"
          style={{
            cursor: 'pointer',
            backgroundColor: 'white',
            border: 'none',
            fontSize: '1rem',
          }}
          onClick={toggleLocale}
        >
          {locale === 'id' ? 'en' : 'id'}
        </button>
        <Link to="/notes/new">
          <button
            style={{ backgroundColor: 'transparent', border: 'none', cursor: 'pointer' }}
            title="Tambah Catata"
            type="button"
          >
            <SquarePlus />
          </button>
        </Link>
        <Link to="/archives">
          <button
            style={{ backgroundColor: 'transparent', border: 'none', cursor: 'pointer' }}
            title="Catata Arsip"
            type="button"
          >
            <Archive />
          </button>
        </Link>
        <button
          style={{ backgroundColor: 'transparent', border: 'none', cursor: 'pointer' }}
          type="button"
          title="Logout"
          onClick={logout}
        >
          <LogOut />
        </button>
      </div>
    </nav>
  );
}

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
};

export default Navbar;
