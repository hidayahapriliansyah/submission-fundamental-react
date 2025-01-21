import React from 'react';

// import function
import { showFormattedDate } from '../utils';

function NoteItem({ id, title, body, createdAt, archived, onDeleteNote, onChangeArchiveStatus }) {
  return (
    <>
      <div className='note-item'>
        <div className='note-item__content'>
          <h3 className='note-item__title'>{title}</h3>
          <p className='note-item__date'>{showFormattedDate(createdAt)}</p>
          <p className='note-item__body'>{body}</p>
        </div>
        <div className='note-item__action'>
          <button
            className='note-item__delete-button'
            onClick={() => onDeleteNote(id)}
          >
            <span className='material-symbols-outlined'>delete</span>
            Delete
          </button>
          <button className='note-item__archive-button' onClick={() => onChangeArchiveStatus(id)}>
            {archived ? (
              <>
                <span className='material-symbols-outlined unarchived'>
                  unarchive
                </span>
                Pindahkan
              </>
            ) : (
              <>
                <span className='material-symbols-outlined'>archive</span>
                Arsipkan
              </>
            )}
          </button>
        </div>
      </div>
    </>
  );
}

export default NoteItem;
