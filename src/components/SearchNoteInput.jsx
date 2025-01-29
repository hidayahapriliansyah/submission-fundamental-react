import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Search } from 'lucide-react';
import LocaleContext from '../context/LocaleContext';
import homeId from '../constant/page-content-text/id/home';
import homeEn from '../constant/page-content-text/en/home';

function SearchNoteInput({
  onKeywordChangeHandler,
  keyword,
}) {
  const { locale } = useContext(LocaleContext);

  return (
    <div className="note-search">
      <input
        id="input-search"
        placeholder={locale === 'id' ? homeId.search_placehoder : homeEn.search_placeholder}
        onChange={(e) => onKeywordChangeHandler(e.target.value)}
        value={keyword}
      />

      <div className="note-search-icon">
        <Search />
      </div>

    </div>
  );
}

SearchNoteInput.propTypes = {
  onKeywordChangeHandler: PropTypes.func.isRequired,
  keyword: PropTypes.string.isRequired,
};

export default SearchNoteInput;
