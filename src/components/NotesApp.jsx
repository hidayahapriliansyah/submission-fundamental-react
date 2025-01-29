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
import RegisterPage from '../pages/RegisterPage';
import LoginPage from '../pages/LoginPage';
import { getUserLogged, putAccessToken } from '../utils/api';
import { LocalProvider } from '../context/LocaleContext';

class NotesApp extends Component {
  constructor() {
    super();

    this.state = {
      authedUser: null,
      initializing: true,
      localeContext: {
        locale: 'id',
        toggleLocale: () => {
          this.setState((prevState) => {
            return {
              localeContext: {
                ...prevState.localeContext,
                locale: prevState.localeContext.locale === 'id' ? 'en' : 'id',
              },
            };
          });
        },
      },
    };

    this.onAddNote = this.onAddNote.bind(this);
    this.onEditNote = this.onEditNote.bind(this);
    this.onDeleteNote = this.onDeleteNote.bind(this);
    this.onChangeArchiveStatus = this.onChangeArchiveStatus.bind(this);
    this.onLoginSuccess = this.onLoginSuccess.bind(this);
    this.onLogout = this.onLogout.bind(this);
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

  onLogout() {
    const text = this.state.localeContext.locale === 'id'
      ? 'Yakin akan logout?'
      : 'Are you sure to logout?';
    const decideToLogout = window.confirm(text);

    if (decideToLogout) {
      this.setState(() => {
        return {
          authedUser: null,
        };
      });
      putAccessToken('');
    }
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
        <LocalProvider value={this.state.localeContext}>
          <header
            className="note-app__header"
          >
            <Navbar logout={this.onLogout} authedUser={this.state.authedUser} />
          </header>
          <main className="note-app__body">
            <Routes>
              <Route path="/*" element={<LoginPage loginSuccess={this.onLoginSuccess} />} />
              <Route path="/register" element={<RegisterPage />} />
            </Routes>
          </main>
        </LocalProvider>
      );
    }

    return (
      <LocalProvider value={this.state.localeContext}>
        <header
          className="note-app__header"
        >
          <Navbar logout={this.onLogout} authedUser={this.state.authedUser} />
        </header>

        <main className="note-app__body">
          <Routes>
            <Route
              path="/"
              element={(
                <HomePage />
              )}
            />
            <Route
              path="/archives"
              element={(
                <ArchivedNotePage />
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
      </LocalProvider>
    );
  }
}

export default NotesApp;
