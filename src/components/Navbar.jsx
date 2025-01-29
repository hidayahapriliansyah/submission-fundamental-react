import {
  Archive, DoorOpen, Languages, LogIn, LogOut, SquarePlus,
} from 'lucide-react';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import LocaleContext from '../context/LocaleContext';
import navbarTextId from '../constant/page-content-text/id/navbar';
import navbarTextEn from '../constant/page-content-text/en/navbar';

function Navbar({ logout, authedUser }) {
  const { locale, toggleLocale } = useContext(LocaleContext);

  if (!authedUser) {
    return (
      <nav>
        <Link to="/">
          <h1>Catata Catat</h1>
        </Link>
        <div className="note-app__header-menu">
          <button
            type="button"
            style={{
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer',
              backgroundColor: 'white',
              border: 'none',
              fontSize: '1rem',
            }}
            onClick={toggleLocale}
            title={locale === 'id' ? 'Ubah ke dalam bahasa Inggris' : 'Change to Bahasa'}
          >
            {locale === 'id' ? 'en' : 'id'}
            <Languages style={{ marginLeft: '10px' }} />
          </button>
          <Link to="/login" title={locale === 'id' ? navbarTextId.login : navbarTextEn.login}>
            <LogIn />
          </Link>
          <Link to="/register" title={locale === 'id' ? navbarTextId.register : navbarTextEn.register}>
            <DoorOpen />
          </Link>
        </div>
      </nav>
    );
  }

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
          title={locale === 'id' ? navbarTextId.lang : navbarTextEn.lang}
        >
          {locale === 'id' ? 'en' : 'id'}
          <Languages style={{ marginLeft: '10px' }} />
        </button>
        <Link to="/notes/new">
          <button
            style={{ backgroundColor: 'transparent', border: 'none', cursor: 'pointer' }}
            title={locale === 'id' ? navbarTextId.add_note : navbarTextEn.add_note}
            type="button"
          >
            <SquarePlus />
          </button>
        </Link>
        <Link to="/archives">
          <button
            style={{ backgroundColor: 'transparent', border: 'none', cursor: 'pointer' }}
            title={locale === 'id' ? navbarTextId.archived_note : navbarTextEn.archived_note}
            type="button"
          >
            <Archive />
          </button>
        </Link>
        <button
          style={{ backgroundColor: 'transparent', border: 'none', cursor: 'pointer' }}
          type="button"
          title={locale === 'id' ? navbarTextId.logout : navbarTextEn.logout}
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
  // eslint-disable-next-line react/forbid-prop-types, react/require-default-props
  authedUser: PropTypes.object,
};

export default Navbar;
