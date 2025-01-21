import React from 'react';

// import component
import NoteList from './NoteList';
import NoteListEmptyMessage from './NoteListEmptyMessage';

// eslint-disable-next-line react/prop-types
function ArchievedNotes({ notes, onDeleteNote, onChangeArchiveStatus }) {
  return (
    <>
      <h2>Arsip</h2>
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

export default ArchievedNotes;
