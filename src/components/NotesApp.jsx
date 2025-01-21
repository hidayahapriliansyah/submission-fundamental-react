import React, { Component } from 'react';

// import component
import Navbar from './Navbar';
import NoteAppBody from './NoteAppBody';
import NoteAppFooter from './NoteAppFooter';

// import initial data
import { getAllNotes as getInitialData } from '../utils/local-data';

class NotesApp extends Component {
  constructor() {
    super();
    this.state = {
      notes: getInitialData(),
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
    return notes.filter((note) =>
      note.title.toLowerCase().includes(title.toLowerCase())
    );
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
      `Yakin ingin menghapus catatan ${targetedNote.title}?`
    );

    if (decideToDelete) {
      const newNotes = this.state.notes.filter(
        (note) => targetedNote.id !== note.id
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
    return (
      <>
        <Navbar onInputSearch={this.onInputSearch} />
        <NoteAppBody
          notes={this.state.showedNotes}
          onAddNote={this.onAddNote}
          onDeleteNote={this.onDeleteNote}
          onChangeArchiveStatus={this.onChangeArchiveStatus}
        />
        <NoteAppFooter />
      </>
    );
  }
}

export default NotesApp;
