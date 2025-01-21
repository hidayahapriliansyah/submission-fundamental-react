import React from 'react';
import NoteItem from './NoteItem';

// eslint-disable-next-line react/prop-types
function NoteList({ notes, onDeleteNote, onChangeArchiveStatus }) {
  return (
    <div className="notes-list">
      {
        // eslint-disable-next-line react/prop-types
        notes.map((note, index) => {
          const {
            id, title, body, createdAt, archived,
          } = note;
          return (
            <NoteItem
              key={index}
              id={id}
              title={title}
              body={body}
              createdAt={createdAt}
              archived={archived}
              onDeleteNote={onDeleteNote}
              onChangeArchiveStatus={onChangeArchiveStatus}
            />
          );
        })
      }
    </div>
  );
}

export default NoteList;
