import React from 'react';
import PropTypes from 'prop-types';
import SearchNoteInput from '../components/SearchNoteInput';
import NoteList from '../components/NoteList';
import NoteListEmptyMessage from '../components/NoteListEmptyMessage';

function ArchivedNotePage({
  archivedNote,
  onKeywordChangeHandler,
  keyword,
}) {
  const notes = archivedNote.filter((n) => n.title.toLowerCase().includes(keyword.toLowerCase()));

  return (
    <div>
      <h2>Catata Arsip</h2>
      <SearchNoteInput
        keyword={keyword}
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
  onKeywordChangeHandler: PropTypes.func.isRequired,
  keyword: PropTypes.string.isRequired,
};

export default ArchivedNotePage;
