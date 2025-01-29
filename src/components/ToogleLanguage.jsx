import React, { useContext } from 'react';
import { Languages } from 'lucide-react';
import LocaleContext from '../context/LocaleContext';

function ToogleLanguage() {
  const { locale, toggleLocale } = useContext(LocaleContext);

  return (
    <button
      type="button"
      style={{
        display: 'flex',
        alignItems: 'center',
        fontSize: '1rem',
        cursor: 'pointer',
        color: 'inherit',
        backgroundColor: 'inherit',
        border: 'inherit',
      }}
      onClick={toggleLocale}
      title={locale === 'id' ? 'Ubah ke dalam bahasa Inggris' : 'Change to Bahasa'}
    >
      {locale === 'id' ? 'en' : 'id'}
      <Languages style={{ marginLeft: '10px' }} />
    </button>
  );
}

export default ToogleLanguage;
