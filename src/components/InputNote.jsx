import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getNote } from '../utils/local-data';

function InputNote({ onAddNote, onEditNote, isEdit }) {
  const { noteId } = useParams();
  const note = getNote(noteId);
  const navigate = useNavigate();

  const [char, setChar] = useState(isEdit ? note.title.length : 0);
  const [title, setTitle] = useState(isEdit ? note.title : '');
  const [body, setBody] = useState(isEdit ? note.body : '');

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'body') {
      setBody(value);
    }
    if (name === 'title') {
      if (value.length > 50) {
        return;
      }
      setChar(0 + value.length);
      setTitle(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEdit) {
      onEditNote({ id: noteId, title, body });
    } else {
      onAddNote({ title, body });
    }
    setBody('');
    setTitle('');
    setChar(0);
    if (isEdit) {
      navigate(`/notes/${noteId}`);
    } else {
      navigate('/');
    }
  };

  return (
    <div className="note-input">
      <h2>{isEdit ? 'Edit catata' : 'Buat catata'}</h2>
      <form onSubmit={handleSubmit}>
        <p
          className={`note-input__title__char-limit ${
            char >= 40 && char < 50 ? 'warning' : ''
          } ${char >= 40 && char < 50 ? 'warning' : ''}
          ${
            char === 50 ? 'danger' : ''
          }
          `}
        >
          {/* // eslint-disable-next-line react/jsx-one-expression-per-line */}
          Judul: {char}/50
        </p>
        <input
          className="note-input__title"
          type="text"
          placeholder="Ini adalah judul ..."
          required=""
          value={title}
          name="title"
          onChange={handleChange}
        />
        <textarea
          className="note-input__body"
          type="text"
          placeholder="Tuliskan catata-mu di sini ..."
          value={body}
          required=""
          name="body"
          onChange={handleChange}
        />
        <button type="submit">{isEdit ? 'Simpan Perubahan' : 'Buat'}</button>
      </form>
    </div>
  );
}

InputNote.propTypes = {
  onAddNote: PropTypes.func,
  onEditNote: PropTypes.func,
  isEdit: PropTypes.bool,
};

InputNote.defaultProps = {
  onAddNote: () => {},
  onEditNote: () => {},
  isEdit: false,
};

export default InputNote;
