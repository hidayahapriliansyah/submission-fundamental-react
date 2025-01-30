import React, { useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Archive, ArchiveRestore, Trash,
} from 'lucide-react';
import {
  archiveNote, deleteNote, getNote, unarchiveNote,
} from '../utils/api';
import showFormattedDate from '../utils';
import LocaleContext from '../context/LocaleContext';
import detailNoteTextId from '../constant/page-content-text/id/detail_note';
import detailNoteTextEn from '../constant/page-content-text/en/detail_note';
import useMutateApi from '../hooks/useMutateApi';
import useQueryApi from '../hooks/useQueryApi';

function DetailNotePage() {
  const { locale } = useContext(LocaleContext);
  const { noteId } = useParams();
  const navigate = useNavigate();

  const { mutate: unarchiveMutate, isLoading: isLoadingUnarchive } = useMutateApi(unarchiveNote);
  const { mutate: archiveMutate, isLoading: isLoadingArchive } = useMutateApi(archiveNote);
  const {
    data: note, isLoading: isLoadingDetail, query: queryGetNote, error,
  } = useQueryApi(getNote, noteId);

  const onClickArchivedHandler = async (selectedNote) => {
    if (selectedNote.archived) {
      await unarchiveMutate(selectedNote.id);
    } else {
      await archiveMutate(selectedNote.id);
    }
    await queryGetNote(noteId);
  };

  const onClickDeleteHandler = async (selectedNote) => {
    const decideToDelete = window.confirm('Yakin ingin menghapus catatan?');

    if (decideToDelete) {
      await deleteNote(selectedNote.id);
      if (selectedNote.archived) {
        navigate('/archives');
      } else {
        navigate('/');
      }
    }
  };

  if (isLoadingDetail) {
    return (
      <h1 style={{ marginTop: '16px', textAlign: 'center' }}>Loading data ....</h1>
    );
  }

  if (error) {
    return (
      <div>
        <h1 style={{ textAlign: 'center' }}>404 | Note tidak ditemukan</h1>
      </div>
    );
  }

  return (
    <div>
      <article className="note-app__detail">
        <div className="note-app__detail-header">
          <h1>{note.title}</h1>
          <div className={`note-app__detail-status ${note.archived && 'archived'}`}>
            {(() => {
              if (locale === 'id') {
                return note.archived
                  ? detailNoteTextId.status.archived
                  : detailNoteTextId.status.active;
              }
              return note.archived
                ? detailNoteTextEn.status.archived
                : detailNoteTextEn.status.active;
            })()}
          </div>
          <span>
            {
              locale === 'en'
                ? showFormattedDate(note.createdAt, 'en-US')
                : showFormattedDate(note.createdAt)
            }
          </span>
          <div style={{ marginTop: '12px' }}>
            <button
              type="button"
              title={locale === 'id' ? detailNoteTextId.action.delete : detailNoteTextEn.action.delete}
              className="note-app__detail-delete"
              onClick={() => onClickDeleteHandler(note)}
            >
              <Trash />
            </button>
            {/* TODO: Nanti kalau di API ada fitur edit */}
            {/* <button
              type="button"
              title="Edit"
              className="note-app__detail-edit"
              onClick={() => navigate(`/notes/${noteId}/edit`)}
            >
              Edit
            </button> */}
            <button
              type="button"
              title={
                (() => {
                  if (locale === 'id') {
                    return note.archived
                      ? detailNoteTextId.action.change_to_active
                      : detailNoteTextId.action.change_to_archive;
                  }
                  return note.archived
                    ? detailNoteTextEn.action.change_to_active
                    : detailNoteTextEn.action.change_to_archive;
                })()
              }
              className={`note-app__detail-archived-status ${!note.archived && 'archived'}`}
              style={{ pointerEvents: isLoadingArchive || isLoadingUnarchive ? 'none' : 'auto' }}
              disabled={isLoadingArchive || isLoadingUnarchive}
              onClick={() => onClickArchivedHandler(note)}
            >
              {(isLoadingArchive || isLoadingUnarchive) && '...'}
              {(!isLoadingArchive && !isLoadingUnarchive)
              && (note.archived
                ? <ArchiveRestore />
                : <Archive />)}
            </button>
          </div>
        </div>
        <div className="note-app__detail-body">
          <p>{note.body}</p>
        </div>
      </article>
    </div>
  );
}

export default DetailNotePage;
