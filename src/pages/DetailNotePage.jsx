import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  archiveNote, deleteNote, getNote, unarchiveNote,
} from '../utils/api';
import showFormattedDate from '../utils';

function DetailNotePage() {
  const [note, setNote] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

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
          <span>{showFormattedDate(note.createdAt)}</span>
          <div>
            <button
              type="button"
              title="Hapus"
              className="note-app__detail-delete"
              onClick={() => onClickDeleteHandler(note)}
            >
              Hapus
            </button>
            <button
              type="button"
              title="Edit"
              className="note-app__detail-edit"
              onClick={() => navigate(`/notes/${noteId}/edit`)}
            >
              Edit
            </button>
            <button
              type="button"
              title={`${note.archived ? 'Klik untuk aktifkan' : 'Klik untuk arsipkan'}`}
              className={`note-app__detail-archived-status ${note.archived ? 'archived' : ''}`}
              onClick={() => onClickArchivedHandler(note)}
            >
              {note.archived ? 'Diarsipkan' : 'Aktif'}
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
