import React, { useContext, useEffect, useState } from 'react';
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

function DetailNotePage() {
  const [note, setNote] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { locale } = useContext(LocaleContext);

  const { noteId } = useParams();
  const navigate = useNavigate();

  const onClickArchivedHandler = async (selectedNote) => {
    setIsLoading(true); // Mulai proses loading
    try {
      if (selectedNote.archived) {
        await unarchiveNote(selectedNote.id);
      } else {
        await archiveNote(selectedNote.id);
      }
      const { data } = await getNote(noteId); // Ambil data note terbaru
      setNote(data); // Update state note
    } catch (error) {
      alert('Error saat mengubah status arsip:', error);
    } finally {
      setIsLoading(false); // Akhiri proses loading
    }
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

  useEffect(() => {
    const fetchNoteDetail = async () => {
      const { data } = await getNote(noteId);
      setNote(data);
    };

    fetchNoteDetail()
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return (
      <h1>Loading data ....</h1>
    );
  }

  if (!note) {
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
              title="Hapus"
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
              title={`${note.archived ? 'Klik untuk aktifkan' : 'Klik untuk arsipkan'}`}
              className={`note-app__detail-archived-status ${!note.archived && 'archived'}`}
              onClick={() => onClickArchivedHandler(note)}
            >
              {note.archived
                ? <ArchiveRestore />
                : <Archive />}
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
