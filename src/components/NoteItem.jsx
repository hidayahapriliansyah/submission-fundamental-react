import React from 'react';

import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import showFormattedDate from '../utils';

function NoteItem({
  id, title, body, createdAt, archived,
}) {
  return (
    <div className={`note-item ${archived && 'archived'}`}>
      <Link to={`/notes/${id}`} className="link">
        <div className="note-item__content">
          <h3 className="note-item__title">{title}</h3>
          <p className="note-item__date">{showFormattedDate(createdAt)}</p>
          <p className="note-item__body">{body}</p>
        </div>
      </Link>
    </div>
  );
}

NoteItem.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  archived: PropTypes.bool.isRequired,
};

export default NoteItem;
