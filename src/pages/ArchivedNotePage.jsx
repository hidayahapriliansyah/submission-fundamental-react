import React, { useState } from 'react';
import PropTypes from 'prop-types';
import SearchNoteInput from '../components/SearchNoteInput';
import NoteList from '../components/NoteList';
import NoteListEmptyMessage from '../components/NoteListEmptyMessage';

function ArchivedNotePage({
  archivedNote,
}) {
  const queryParams = new URLSearchParams(window.location.search);
  const keywordSearchQuery = queryParams.get('search') || '';
  const [keywordSearch, setKeywordSearch] = useState(keywordSearchQuery);

  const onKeywordChangeHandler = (kSearch) => {
    queryParams.set('search', keywordSearch);
    window.history.pushState(null, '', `?${queryParams.toString()}`);

    setKeywordSearch(kSearch);
  };

  const notes = archivedNote.filter(
    (n) => n.title.toLowerCase().includes(keywordSearch.toLowerCase()),
  );

  return (
    <div>
      <h2>Catata Arsip</h2>
      <SearchNoteInput
        keyword={keywordSearch}
        onKeywordChangeHandler={onKeywordChangeHandler}
      />
      {
        // eslint-disable-next-line react/prop-types
        notes.length !== 0 ? (
          <NoteList
            notes={notes}
          />
        ) : (
          <NoteListEmptyMessage />
        )
      }
    </div>
  );
}

ArchivedNotePage.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  archivedNote: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ArchivedNotePage;
