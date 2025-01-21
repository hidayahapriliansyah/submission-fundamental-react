import React, { Component } from 'react';

// import component
// import initial data
import { Route, Routes } from 'react-router-dom';
import { archiveNote, getActiveNotes, getAllNotes, getArchivedNotes, unarchiveNote } from '../utils/local-data';
// import Navbar from '../components/Navbar';
// import ArchivedNotePage from '../pages/ArchivedNotePage';
import NoteAppBody from './NoteAppBody';
import HomePage from '../pages/HomePage';

class NotesApp extends Component {
  constructor() {
    super();
    this.state = {
      notes: getAllNotes(),
      archivedNotes: getArchivedNotes(),
      activedNote: getActiveNotes(),
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

  onChangeArchiveStatus(id) {
    const newNotes = this.state.notes.map((note) => {
      if (note.id === id) {
        return { ...note, archived: !note.archived };
      }
      return note;
    });
    const setShowedNotes = this.filterNotes(newNotes, this.state.searchInput);

    this.setState(() => {
      return {
        ...this.state,
        notes: newNotes,
        showedNotes: setShowedNotes,
      };
    });
  }

  render() {
    const activeNotes = getActiveNotes()

    return (
      <div>
        <header
          className="note-app__header"
        >
          <h1>Catata Catat</h1>
        </header>

        <main>
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
                  activeNote={this.state.activedNote}
                  onDeleteNote={this.onDeleteNote}
                  onChangeArchiveStatus={this.onChangeArchiveStatus}
                />
              )}
            />
            {/* <Route path="/archives" element={<ArchivedNotePage />} />
              <Route path="/notes/:noteId" element={<DetailNotePage />} /> */}
          </Routes>
          {/* <NoteAppFooter /> */}
        </main>
      </div>
    );
  }
}

export default NotesApp;
