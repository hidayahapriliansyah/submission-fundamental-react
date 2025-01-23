import React from 'react';
import PropTypes from 'prop-types';
import ArchievedNotes from '../components/ArchievedNote';

function ArchivedNotePage({
  archivedNote,
  onDeleteNote,
  onChangeArchiveStatus,
}) {
  return (
    <div className="note-app__body">
      <ArchievedNotes
        notes={archivedNote}
        onDeleteNote={onDeleteNote}
        onChangeArchiveStatus={onChangeArchiveStatus}
      />
    </div>
  );
}

ArchivedNotePage.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  archivedNote: PropTypes.arrayOf(PropTypes.object).isRequired,
  onDeleteNote: PropTypes.func.isRequired,
  onChangeArchiveStatus: PropTypes.func.isRequired,
};

export default ArchivedNotePage;
