import React, {
  useContext, useEffect, useMemo, useState,
} from 'react';
import SearchNoteInput from '../components/SearchNoteInput';
import NoteList from '../components/NoteList';
import NoteListEmptyMessage from '../components/NoteListEmptyMessage';
import { getArchivedNotes } from '../utils/api';
import LocaleContext from '../context/LocaleContext';
import archiveNoteTextId from '../constant/page-content-text/id/archive_note';
import archiveNoteTextEn from '../constant/page-content-text/en/archive_note';

function ArchivedNotePage() {
  const [archivedNotes, setArchivedNotes] = useState([]);
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
    () => archivedNotes.filter(
      (n) => n.title.toLowerCase().includes(keywordSearch.toLowerCase()),
    ),
    [archivedNotes, keywordSearch],
  );

  useEffect(() => {
    const fetchNotes = async () => {
      const { data } = await getArchivedNotes();

      setArchivedNotes(data);
    };

    fetchNotes();
  }, []);

  return (
    <div>
      <h2>
        {locale === 'id' ? archiveNoteTextId.title : archiveNoteTextEn.title }
        {' '}📥️
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

export default ArchivedNotePage;
