import {
  Archive, DoorOpen, LogIn, LogOut, SquarePlus,
} from 'lucide-react';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import LocaleContext from '../context/LocaleContext';
import navbarTextId from '../constant/page-content-text/id/navbar';
import navbarTextEn from '../constant/page-content-text/en/navbar';
import ToggleTheme from './ToggleTheme';
import ToogleLanguage from './ToogleLanguage';

function Navbar({ logout, authedUser }) {
  const { locale } = useContext(LocaleContext);

  if (!authedUser) {
    return (
      <nav>
        <Link to="/">
          <h1>Catata Catat</h1>
        </Link>
        <div className="note-app__header-menu">
          <ToggleTheme />
          <ToogleLanguage />
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
        <ToggleTheme />
        <ToogleLanguage />
        <Link to="/notes/new">
          <SquarePlus />
        </Link>
        <Link to="/archives">
          <Archive />
        </Link>
        <LogOut onClick={logout} style={{ cursor: 'pointer' }} />
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
