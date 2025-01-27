import { Archive, SquarePlus } from 'lucide-react';
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
      </div>
    </nav>
  );
}

export default Navbar;
