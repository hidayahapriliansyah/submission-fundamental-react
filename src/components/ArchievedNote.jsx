import React from 'react';

// import component
import NoteList from './NoteList';
import NoteListEmptyMessage from './NoteListEmptyMessage';

function ArchievedNotes({ notes, onDeleteNote, onChangeArchiveStatus }) {
  return (
    <>
      <h2>Arsip</h2>
      {notes.length !== 0 ? (
        <NoteList
          notes={notes}
          onDeleteNote={onDeleteNote}
          onChangeArchiveStatus={onChangeArchiveStatus}
        />
      ) : (
        <NoteListEmptyMessage />
      )}
    </>
  );
}

export default ArchievedNotes;
