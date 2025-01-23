import React from 'react';

import PropTypes from 'prop-types';
import NoteList from './NoteList';
import NoteListEmptyMessage from './NoteListEmptyMessage';

function ArchievedNotes({ notes }) {
  return (
    <>
      <h2>Arsip</h2>
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

ArchievedNotes.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  notes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ArchievedNotes;
