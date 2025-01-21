import React from 'react';
import NotesApp from './components/NotesApp';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <NotesApp />
    </BrowserRouter>
  );
}

export default App;
