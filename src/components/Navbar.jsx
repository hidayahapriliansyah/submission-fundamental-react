import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav>
      <Link to="/">
        <h1>Catata Catat</h1>
      </Link>

      <div className="note-app__header-menu">
        <Link to="/notes/new">
          Tambah Catata
        </Link>
        <Link to="/archives">
          Archives
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
