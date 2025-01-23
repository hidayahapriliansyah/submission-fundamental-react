import React from 'react';
import PropTypes from 'prop-types';
import InputNote from '../components/InputNote';

function AddNotePage({ onAddNote }) {
  return (
    <div>
      <InputNote onAddNote={onAddNote} />
    </div>
  );
}

AddNotePage.propTypes = {
  onAddNote: PropTypes.func.isRequired,
};

export default AddNotePage;
