import React from 'react';

// components
import ActiveNotes from './ActiveNotes';
import InputNote from './InputNote';
import ArchievedNotes from './ArchievedNote';

function NoteAppBody({
  notes,
  onAddNote,
  onDeleteNote,
  onChangeArchiveStatus,
}) {
  const activeNote = notes.filter((note) => note.archived === false);
  const archivedNote = notes.filter((note) => note.archived === true);

  return (
    <div className='note-app__body'>
      <InputNote onAddNote={onAddNote} />
      <ActiveNotes
        notes={activeNote}
        onDeleteNote={onDeleteNote}
        onChangeArchiveStatus={onChangeArchiveStatus}
      />
      <ArchievedNotes
        notes={archivedNote}
        onDeleteNote={onDeleteNote}
        onChangeArchiveStatus={onChangeArchiveStatus}
      />
    </div>
  );
}

export default NoteAppBody;
