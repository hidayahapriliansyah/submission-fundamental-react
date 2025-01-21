import { Route, Routes } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import ArchivedNotePage from '../pages/ArchivedNotePage';
import DetailNotePage from '../pages/DetailNotePage';

function NotesApp() {
  return (
    <div>
      <header
        className='note-app__header'
      >
        <h1>Catata Catat</h1>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/archives" element={<ArchivedNotePage />} />
          <Route path="/notes/:noteId" element={<DetailNotePage />} />
        </Routes>
      </main>
    </div>
  )
}

export default NotesApp;