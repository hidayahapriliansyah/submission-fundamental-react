import PropTypes from 'prop-types';
import React, { useContext, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getNote } from '../utils/local-data';
import { addNote } from '../utils/api';
import LocaleContext from '../context/LocaleContext';
import createNoteTextId from '../constant/page-content-text/id/create_note';
import createNoteTextEn from '../constant/page-content-text/en/create_note';

function InputNote({ isEdit }) {
  const { noteId } = useParams();
  const note = getNote(noteId);
  const navigate = useNavigate();

  const { locale } = useContext(LocaleContext);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEdit) {
      /**
       * TODO: Pada API Notes yang disediakan Dicoding tidak memiliki endopoint untuk edit
       *       block edit bisa dipakai seandainya nanti ada fitur edit
       */
    } else {
      await addNote({ title, body });
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
      <h2>
        {isEdit && 'Edit catata'}
        {!isEdit && locale === 'id'
          ? createNoteTextId.title
          : createNoteTextEn.title}
        {' '}📝️
      </h2>
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
          {locale === 'id' ? createNoteTextId.label : createNoteTextEn.label} : {char}/50
        </p>
        <input
          className="note-input__title"
          type="text"
          placeholder={locale === 'id' ? createNoteTextId.form.title : createNoteTextEn.form.title}
          required=""
          value={title}
          name="title"
          onChange={handleChange}
        />
        <textarea
          className="note-input__body"
          type="text"
          placeholder={locale === 'id' ? createNoteTextId.form.body : createNoteTextEn.form.body}
          value={body}
          required=""
          name="body"
          onChange={handleChange}
        />
        <button type="submit">
          {isEdit && 'Simpan Perubahan'}
          {isEdit && locale === 'id' ? createNoteTextId.submit_btn : createNoteTextEn.submit_btn}
        </button>
      </form>
    </div>
  );
}

InputNote.propTypes = {
  isEdit: PropTypes.bool,
};

InputNote.defaultProps = {
  isEdit: false,
};

export default InputNote;
