import React, { Component } from 'react';

import { Route, Routes } from 'react-router-dom';
import {
  addNote,
  archiveNote,
  deleteNote,
  editNote,
  getAllNotes,
  unarchiveNote,
} from '../utils/local-data';
import HomePage from '../pages/HomePage';
import ArchivedNotePage from '../pages/ArchivedNotePage';
import Navbar from './Navbar';
import AddNotePage from '../pages/AddNotePage';
import DetailNotePage from '../pages/DetailNotePage';
import NotFoundPage from '../pages/NotFoundPage';
import EditNotePage from '../pages/EditNotePage';

class NotesApp extends Component {
  constructor() {
    super();

    this.state = {
      notes: getAllNotes(),
    };

    this.onAddNote = this.onAddNote.bind(this);
    this.onEditNote = this.onEditNote.bind(this);
    this.onDeleteNote = this.onDeleteNote.bind(this);
    this.onChangeArchiveStatus = this.onChangeArchiveStatus.bind(this);
  }

  onAddNote({ title, body }) {
    addNote({ title, body });

    this.setState(() => {
      return {
        ...this.state,
        notes: getAllNotes(),
      };
    });

    window.alert(`Note ${title} berhasil ditambahkan!`);
  }

  onEditNote({ id, title, body }) {
    editNote({ id, title, body });

    this.setState(() => {
      return {
        ...this.state,
        notes: getAllNotes(),
      };
    });

    window.alert(`Note ${title} berhasil diedit!`);
  }

  onDeleteNote(id) {
    deleteNote(id);

    this.setState(() => {
      return {
        ...this.state,
        notes: getAllNotes(),
      };
    });
  }

  onChangeArchiveStatus(note) {
    if (note.archived) {
      unarchiveNote(note.id);
    } else {
      archiveNote(note.id);
    }
    this.setState(() => {
      return {
        ...this.state,
        notes: getAllNotes(),
      };
    });
  }

  render() {
    const activeNotes = this.state.notes.filter((note) => !note.archived);
    const archivedNotes = this.state.notes.filter((note) => note.archived);

    return (
      <>
        <header
          className="note-app__header"
        >
          <Navbar />
        </header>

        <main className="note-app__body">
          <Routes>
            <Route
              path="/"
              element={(
                <HomePage
                  activeNote={activeNotes}
                />
              )}
            />
            <Route
              path="/archives"
              element={(
                <ArchivedNotePage
                  archivedNote={archivedNotes}
                />
              )}
            />
            <Route
              path="/notes/new"
              element={(
                <AddNotePage
                  onAddNote={this.onAddNote}
                />
              )}
            />
            <Route
              path="/notes/:noteId"
              element={(
                <DetailNotePage
                  onChangeArchiveStatus={this.onChangeArchiveStatus}
                  onDeleteNote={this.onDeleteNote}
                />
              )}
            />
            <Route
              path="/notes/:noteId/edit"
              element={(
                <EditNotePage
                  onEditNote={this.onEditNote}
                />
              )}
            />
            <Route
              path="/*"
              element={(
                <NotFoundPage />
              )}
            />
          </Routes>
          {/* <NoteAppFooter /> */}
        </main>
      </>
    );
  }
}

export default NotesApp;
