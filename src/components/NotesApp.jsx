import { Route, Routes } from 'react-router-dom';
import Navbar from './Navbar';
import HomePage from '../pages/Home';

function NotesApp() {
  return (
    <div>
      <header>
        <Navbar onInputSearch={this.onInputSearch} />
      </header>

      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </main>
    </div>
  )
}

export default NotesApp;