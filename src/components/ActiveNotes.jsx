import React from 'react';
import PropTypes from 'prop-types';
import NoteList from './NoteList';
import NoteListEmptyMessage from './NoteListEmptyMessage';

function ActiveNotes({ notes }) {
  return (
    <>
      <h2>Catata Aktif</h2>
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
    </>
  );
}

ActiveNotes.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  notes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ActiveNotes;
