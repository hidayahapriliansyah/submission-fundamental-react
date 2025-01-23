import React from 'react';
import PropTypes from 'prop-types';
import ArchievedNotes from '../components/ArchievedNote';
import SearchNoteInput from '../components/SearchNoteInput';

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
      <ArchievedNotes
        notes={notes}
      />
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
