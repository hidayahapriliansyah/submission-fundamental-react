import React, { useEffect, useState } from 'react';
import SearchNoteInput from '../components/SearchNoteInput';
import NoteList from '../components/NoteList';
import NoteListEmptyMessage from '../components/NoteListEmptyMessage';
import { getActiveNotes } from '../utils/api';

function HomePage() {
  const [activeNotes, setActiveNotes] = useState([]);

  const queryParams = new URLSearchParams(window.location.search);
  const keywordSearchQuery = queryParams.get('search') || '';
  const [keywordSearch, setKeywordSearch] = useState(keywordSearchQuery);

  const onKeywordChangeHandler = (kSearch) => {
    queryParams.set('search', keywordSearch);
    window.history.pushState(null, '', `?${queryParams.toString()}`);

    setKeywordSearch(kSearch);
  };

  const notes = activeNotes.filter(
    (n) => n.title.toLowerCase().includes(keywordSearch.toLowerCase()),
  );

  useEffect(() => {
    const fetchNotes = async () => {
      const { data } = await getActiveNotes();

      console.log('data active notes =>', data);

      setActiveNotes(data);
    };

    fetchNotes();
  }, []);

  return (
    <div>
      <h2>Catata Aktif</h2>
      <SearchNoteInput
        keyword={keywordSearch}
        onKeywordChangeHandler={onKeywordChangeHandler}
      />

      {
        // eslint-disable-next-line react/prop-types
        notes.length !== 0 ? (
          <NoteList
            notes={activeNotes}
          />
        ) : (
          <NoteListEmptyMessage />
        )
      }
    </div>
  );
}

export default HomePage;
