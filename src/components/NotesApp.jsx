import React, { Component } from 'react';

// import component
// import initial data
import { Route, Routes } from 'react-router-dom';
import { archiveNote, getAllNotes, unarchiveNote } from '../utils/local-data';
// import Navbar from '../components/Navbar';
// import ArchivedNotePage from '../pages/ArchivedNotePage';
// import NoteAppBody from './NoteAppBody';
import HomePage from '../pages/HomePage';
import ArchivedNotePage from '../pages/ArchivedNotePage';
import Navbar from './Navbar';
import AddNotePage from '../pages/AddNotePage';
import DetailNotePage from '../pages/DetailNotePage';

class NotesApp extends Component {
  constructor() {
    super();
    this.state = {
      notes: getAllNotes(),
      showedNotes: [],
      searchInput: '',
    };

    this.state.showedNotes = this.state.notes;

    this.onInputSearch = this.onInputSearch.bind(this);
    this.onAddNote = this.onAddNote.bind(this);
    this.onDeleteNote = this.onDeleteNote.bind(this);
    this.onChangeArchiveStatus = this.onChangeArchiveStatus.bind(this);
  }

  filterNotes(notes, title) {
    return notes.filter((note) => note.title.toLowerCase().includes(title.toLowerCase()));
  }

  onInputSearch(title) {
    const setShowedNotes = this.filterNotes(this.state.notes, title);

    this.setState(() => {
      return {
        ...this.state,
        searchInput: title,
        showedNotes: setShowedNotes,
      };
    });
  }

  onAddNote({ title, body }) {
    const newNote = {
      id: +new Date(),
      title,
      body,
      createdAt: new Date().toISOString(),
      archived: false,
    };

    const newNotes = [...this.state.notes, newNote];
    const setShowedNotes = this.filterNotes(newNotes, this.state.searchInput);

    this.setState(() => {
      return {
        ...this.state,
        notes: newNotes,
        showedNotes: setShowedNotes,
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
      const setShowedNotes = this.filterNotes(newNotes, this.state.searchInput);

      this.setState(() => {
        return {
          ...this.state,
          notes: newNotes,
          showedNotes: setShowedNotes,
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
                  onDeleteNote={this.onDeleteNote}
                  onChangeArchiveStatus={this.onChangeArchiveStatus}
                />
              )}
            />
            <Route
              path="/archives"
              element={(
                <ArchivedNotePage
                  archivedNote={archivedNotes}
                  onDeleteNote={this.onDeleteNote}
                  onChangeArchiveStatus={this.onChangeArchiveStatus}
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
          </Routes>
          {/* <NoteAppFooter /> */}
        </main>
      </>
    );
  }
}

export default NotesApp;
