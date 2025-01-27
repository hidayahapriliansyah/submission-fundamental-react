import React, { Component } from 'react';

import { Link, Route, Routes } from 'react-router-dom';
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
import RegisterPage from '../pages/RegisterPage';
import LoginPage from '../pages/LoginPage';
import { getUserLogged, putAccessToken } from '../utils/api';

class NotesApp extends Component {
  constructor() {
    super();

    this.state = {
      authedUser: null,
      initializing: true,
    };

    this.onAddNote = this.onAddNote.bind(this);
    this.onEditNote = this.onEditNote.bind(this);
    this.onDeleteNote = this.onDeleteNote.bind(this);
    this.onChangeArchiveStatus = this.onChangeArchiveStatus.bind(this);
    this.onLoginSuccess = this.onLoginSuccess.bind(this);
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

  async onLoginSuccess({ accessToken }) {
    putAccessToken(accessToken);
    const { data } = await getUserLogged();
    this.setState(() => {
      return {
        authedUser: data,
      };
    });
  }

  async componentDidMount() {
    const { data: user } = await getUserLogged();

    this.setState(() => {
      return {
        authedUser: user,
        initializing: false,
      };
    });
  }

  render() {
    if (this.state.initializing) {
      return null;
    }

    if (this.state.authedUser === null) {
      return (
        <>
          <header
            className="note-app__header"
          >
            <nav>
              <Link to="/">
                <h1>Catata Catat</h1>
              </Link>
              <div className="note-app__header-menu">
                <Link to="/login">
                  Login
                </Link>
                <Link to="/register">
                  Register
                </Link>
              </div>
            </nav>
          </header>
          <main className="note-app__body">
            <Routes>
              <Route path="/*" element={<LoginPage loginSuccess={this.onLoginSuccess} />} />
              <Route path="/register" element={<RegisterPage />} />
            </Routes>
          </main>
        </>
      );
    }

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
                  activeNote={[]}
                />
              )}
            />
            <Route
              path="/archives"
              element={(
                <ArchivedNotePage
                  archivedNote={[]}
                />
              )}
            />
            <Route
              path="/notes/new"
              element={(
                <AddNotePage />
              )}
            />
            <Route
              path="/notes/:noteId"
              element={(
                <DetailNotePage />
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
