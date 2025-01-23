import React from 'react';
import PropTypes from 'prop-types';
import ActiveNotes from '../components/ActiveNotes';

function HomePage({
  activeNote,
  onKeywordChangeHandler,
  keyword,
}) {
  const notes = activeNote.filter((n) => n.title.toLowerCase().includes(keyword.toLowerCase()));

  return (
    <div>
      <h2>Catata Aktif</h2>
      <div className="note-search">
        <input
          id="input-search"
          placeholder="Cari berdasarkan judul"
          onChange={(e) => onKeywordChangeHandler(e.target.value)}
          value={keyword}
        />
      </div>
      <ActiveNotes
        notes={notes}
      />
    </div>
  );
}

HomePage.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  activeNote: PropTypes.arrayOf(PropTypes.object).isRequired,
  onKeywordChangeHandler: PropTypes.func.isRequired,
  keyword: PropTypes.string.isRequired,
};

export default HomePage;
