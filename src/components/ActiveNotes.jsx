import React from 'react';
import NoteList from './NoteList';
import NoteListEmptyMessage from './NoteListEmptyMessage';

// eslint-disable-next-line react/prop-types
function ActiveNotes({ notes, onDeleteNote, onChangeArchiveStatus }) {
  return (
    <>
      <h2>Catata Aktif</h2>
      {
        // eslint-disable-next-line react/prop-types
        notes.length !== 0 ? (
          <NoteList
            notes={notes}
            onDeleteNote={onDeleteNote}
            onChangeArchiveStatus={onChangeArchiveStatus}
          />
        ) : (
          <NoteListEmptyMessage />
        )
      }
    </>
  );
}

export default ActiveNotes;
