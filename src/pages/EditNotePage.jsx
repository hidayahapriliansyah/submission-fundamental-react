import React from 'react';
import PropTypes from 'prop-types';
import InputNote from '../components/InputNote';

function EditNotePage({ onEditNote }) {
  return (
    <div>
      <InputNote onEditNote={onEditNote} isEdit />
    </div>
  );
}

EditNotePage.propTypes = {
  onEditNote: PropTypes.func.isRequired,
};

export default EditNotePage;
