import React from 'react';
import PropTypes from 'prop-types';
import { Search } from 'lucide-react';

function SearchNoteInput({
  onKeywordChangeHandler,
  keyword,
}) {
  return (
    <div className="note-search">
      <input
        id="input-search"
        placeholder="Cari berdasarkan judul"
        onChange={(e) => onKeywordChangeHandler(e.target.value)}
        value={keyword}
      />

      <div className="note-search-icon">
        <Search />
      </div>

    </div>
  );
}

SearchNoteInput.propTypes = {
  onKeywordChangeHandler: PropTypes.func.isRequired,
  keyword: PropTypes.string.isRequired,
};

export default SearchNoteInput;
