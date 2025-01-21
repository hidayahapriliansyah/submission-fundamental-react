import React from 'react';
import NoteList from './NoteList';
import NoteListEmptyMessage from './NoteListEmptyMessage';

function ActiveNotes({ notes, onDeleteNote, onChangeArchiveStatus }) {
  return (
    <>
      <h2>Catata Aktif</h2>
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

export default ActiveNotes;
