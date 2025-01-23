import React, { Component } from 'react';

// import component
// import initial data
import { Route, Routes } from 'react-router-dom';
import {
  addNote,
  archiveNote,
  getAllNotes,
  unarchiveNote,
} from '../utils/local-data';
// import Navbar from '../components/Navbar';
// import ArchivedNotePage from '../pages/ArchivedNotePage';
// import NoteAppBody from './NoteAppBody';
import HomePage from '../pages/HomePage';
import ArchivedNotePage from '../pages/ArchivedNotePage';
import Navbar from './Navbar';
import AddNotePage from '../pages/AddNotePage';
import DetailNotePage from '../pages/DetailNotePage';
import NotFoundPage from '../pages/NotFoundPage';

class NotesApp extends Component {
  constructor() {
    super();
    this.state = {
      notes: getAllNotes(),
      keyword: '',
    };

    this.onAddNote = this.onAddNote.bind(this);
    this.onDeleteNote = this.onDeleteNote.bind(this);
    this.onChangeArchiveStatus = this.onChangeArchiveStatus.bind(this);
    this.onKeywordChangeHandler = this.onKeywordChangeHandler.bind(this);
  }

  onKeywordChangeHandler(keyword) {
    this.setState(() => {
      return {
        ...this.state,
        keyword,
      };
    });
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

  onDeleteNote(id) {
    const targetedNote = this.state.notes.find((note) => note.id === id);

    if (!targetedNote) {
      alert(`Tidak ada catatan dengan id : ${id}`);
      return;
    }

    const decideToDelete = window.confirm(
      `Yakin ingin menghapus catatan ${targetedNote.title}?`,
    );

    if (decideToDelete) {
      const newNotes = this.state.notes.filter(
        (note) => targetedNote.id !== note.id,
      );

      this.setState(() => {
        return {
          ...this.state,
          notes: newNotes,
        };
      });
    }
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
          {/* <NoteAppBody
            notes={this.state.showedNotes}
            onAddNote={this.onAddNote}
            onDeleteNote={this.onDeleteNote}
            onChangeArchiveStatus={this.onChangeArchiveStatus}
          /> */}
          <Routes>
            <Route
              path="/"
              element={(
                <HomePage
                  activeNote={activeNotes}
                  keyword={this.state.keyword}
                  onKeywordChangeHandler={this.onKeywordChangeHandler}
                />
              )}
            />
            <Route
              path="/archives"
              element={(
                <ArchivedNotePage
                  archivedNote={archivedNotes}
                  onKeywordChangeHandler={this.onKeywordChangeHandler}
                  keyword={this.state.keyword}
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
