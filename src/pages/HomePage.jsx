import React from 'react';
import PropTypes from 'prop-types';
import ActiveNotes from '../components/ActiveNotes';
import SearchNoteInput from '../components/SearchNoteInput';

function HomePage({
  activeNote,
  onKeywordChangeHandler,
  keyword,
}) {
  const notes = activeNote.filter((n) => n.title.toLowerCase().includes(keyword.toLowerCase()));

  return (
    <div>
      <h2>Catata Aktif</h2>
      <SearchNoteInput
        keyword={keyword}
        onKeywordChangeHandler={onKeywordChangeHandler}
      />
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
