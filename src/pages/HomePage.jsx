import React, {
  useContext, useEffect, useMemo, useState,
} from 'react';
import SearchNoteInput from '../components/SearchNoteInput';
import NoteList from '../components/NoteList';
import NoteListEmptyMessage from '../components/NoteListEmptyMessage';
import { getActiveNotes } from '../utils/api';
import LocaleContext from '../context/LocaleContext';
import homeId from '../constant/page-content-text/id/home';
import homeEn from '../constant/page-content-text/en/home';

function HomePage() {
  const [activeNotes, setActiveNotes] = useState([]);
  const { locale } = useContext(LocaleContext);

  const queryParams = new URLSearchParams(window.location.search);
  const keywordSearchQuery = queryParams.get('search') || '';
  const [keywordSearch, setKeywordSearch] = useState(keywordSearchQuery);

  const onKeywordChangeHandler = (kSearch) => {
    queryParams.set('search', keywordSearch);
    window.history.pushState(null, '', `?${queryParams.toString()}`);

    setKeywordSearch(kSearch);
  };

  const notes = useMemo(
    () => activeNotes.filter(
      (n) => n.title.toLowerCase().includes(keywordSearch.toLowerCase()),
    ),
    [activeNotes, keywordSearch],
  );

  useEffect(() => {
    const fetchNotes = async () => {
      const { data } = await getActiveNotes();

      setActiveNotes(data);
    };

    fetchNotes();
  }, []);

  return (
    <div>
      <h2>
        {locale === 'id' ? homeId.title : homeEn.title }
        {' '}✅️
      </h2>
      <SearchNoteInput
        keyword={keywordSearch}
        onKeywordChangeHandler={onKeywordChangeHandler}
      />

      {
        // eslint-disable-next-line react/prop-types
        notes.length !== 0 ? (
          <NoteList
            notes={notes}
          />
        ) : (
          <NoteListEmptyMessage />
        )
      }
    </div>
  );
}

export default HomePage;
