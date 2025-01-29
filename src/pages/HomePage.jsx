import React, {
  useContext, useEffect, useState,
} from 'react';
import SearchNoteInput from '../components/SearchNoteInput';
import NoteList from '../components/NoteList';
import NoteListEmptyMessage from '../components/NoteListEmptyMessage';
import { getActiveNotes } from '../utils/api';
import LocaleContext from '../context/LocaleContext';
import homeId from '../constant/page-content-text/id/home';
import homeEn from '../constant/page-content-text/en/home';
import useApi from '../hooks/useApi';

function HomePage() {
  const [displayNotes, setDisplayNotes] = useState([]);
  const { locale } = useContext(LocaleContext);
  const { data, isLoading } = useApi(getActiveNotes);

  const queryParams = new URLSearchParams(window.location.search);
  const keywordSearchQuery = queryParams.get('search') || '';
  const [keywordSearch, setKeywordSearch] = useState(keywordSearchQuery);

  const onKeywordChangeHandler = (kSearch) => {
    queryParams.set('search', kSearch);
    window.history.pushState(null, '', `?${queryParams.toString()}`);

    setKeywordSearch(kSearch);
  };

  useEffect(() => {
    const notes = data.filter(
      (n) => n.title.toLowerCase().includes(keywordSearch.toLowerCase()),
    );
    setDisplayNotes(notes);
  }, [keywordSearch, data]);

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

      {isLoading && <p style={{ textAlign: 'center' }}>Loading ....</p>}
      {!isLoading
        // eslint-disable-next-line react/prop-types
        && (displayNotes.length !== 0 ? (
          <NoteList
            notes={displayNotes}
          />
        ) : (
          <NoteListEmptyMessage />
        ))}
    </div>
  );
}

export default HomePage;
