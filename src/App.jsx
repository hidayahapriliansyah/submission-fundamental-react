import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import NotesApp from './components/NotesApp';

function App() {
  return (
    <BrowserRouter>
      <NotesApp />
    </BrowserRouter>
  );
}

export default App;
