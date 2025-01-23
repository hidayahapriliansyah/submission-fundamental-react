import React from 'react';
import PropTypes from 'prop-types';
import NoteItem from './NoteItem';

function NoteList({ notes }) {
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
            />
          );
        })
      }
    </div>
  );
}

NoteList.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  notes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default NoteList;
