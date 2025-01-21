import React from 'react';
import PropTypes from 'prop-types';
import ActiveNotes from '../components/ActiveNotes';

function HomePage({ activeNote, onDeleteNote, onChangeArchiveStatus }) {
  return (
    <div>
      <ActiveNotes
        notes={activeNote}
        onDeleteNote={onDeleteNote}
        onChangeArchiveStatus={onChangeArchiveStatus}
      />
    </div>
  );
}

HomePage.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  activeNote: PropTypes.arrayOf(PropTypes.object).isRequired,
  onDeleteNote: PropTypes.func.isRequired,
  onChangeArchiveStatus: PropTypes.func.isRequired,
};

export default HomePage;
