import React, { Component } from 'react';

import { Route, Routes } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import ArchivedNotePage from '../pages/ArchivedNotePage';
import Navbar from './Navbar';
import AddNotePage from '../pages/AddNotePage';
import DetailNotePage from '../pages/DetailNotePage';
import NotFoundPage from '../pages/NotFoundPage';
import RegisterPage from '../pages/RegisterPage';
import LoginPage from '../pages/LoginPage';
import { getUserLogged, putAccessToken } from '../utils/api';
import { LocalProvider } from '../context/LocaleContext';
import { ThemeProvider } from '../context/ThemeContext';

class NotesApp extends Component {
  constructor() {
    super();

    this.state = {
      authedUser: null,
      initializing: true,
      localeContext: {
        locale: 'id',
        toggleLocale: () => {
          this.setState((prevState) => {
            return {
              localeContext: {
                ...prevState.localeContext,
                locale: prevState.localeContext.locale === 'id' ? 'en' : 'id',
              },
            };
          });
        },
      },
      themeContext: {
        theme: 'light',
        toggleTheme: () => {
          this.setState((prevState) => {
            const newTheme = prevState.themeContext.theme === 'light' ? 'dark' : 'light';
            localStorage.setItem('theme', newTheme);
            return {
              themeContext: {
                ...prevState.themeContext,
                theme: newTheme,
              },
            };
          });
        },
      },
    };

    this.onLoginSuccess = this.onLoginSuccess.bind(this);
    this.onLogout = this.onLogout.bind(this);
  }

  async onLoginSuccess({ accessToken }) {
    putAccessToken(accessToken);
    const { data } = await getUserLogged();
    this.setState(() => {
      return {
        authedUser: data,
      };
    });
  }

  onLogout() {
    const text = this.state.localeContext.locale === 'id'
      ? 'Yakin akan logout?'
      : 'Are you sure to logout?';
    const decideToLogout = window.confirm(text);

    if (decideToLogout) {
      this.setState(() => {
        return {
          authedUser: null,
        };
      });
      putAccessToken('');
    }
  }

  async componentDidMount() {
    let localTheme = localStorage.getItem('theme');
    if (localTheme !== 'light' && localTheme !== 'dark') {
      localTheme = 'light';
    }
    document.documentElement.setAttribute('data-theme', localTheme);
    const { data: user } = await getUserLogged();

    this.setState((prevState) => {
      return {
        authedUser: user,
        initializing: false,
        themeContext: {
          ...prevState.themeContext,
          theme: localTheme,
        },
      };
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.theme !== this.state.themeContext.theme) {
      document.documentElement.setAttribute('data-theme', this.state.themeContext.theme);
    }
  }

  render() {
    if (this.state.initializing) {
      return null;
    }

    if (this.state.authedUser === null) {
      return (
        <LocalProvider value={this.state.localeContext}>
          <ThemeProvider value={this.state.themeContext}>
            <header
              className="note-app__header"
            >
              <Navbar logout={this.onLogout} authedUser={this.state.authedUser} />
            </header>
            <main className="note-app__body">
              <Routes>
                <Route path="/*" element={<LoginPage loginSuccess={this.onLoginSuccess} />} />
                <Route path="/register" element={<RegisterPage />} />
              </Routes>
            </main>
          </ThemeProvider>
        </LocalProvider>
      );
    }

    return (
      <LocalProvider value={this.state.localeContext}>
        <ThemeProvider value={this.state.themeContext}>
          <header
            className="note-app__header"
          >
            <Navbar logout={this.onLogout} authedUser={this.state.authedUser} />
          </header>

          <main className="note-app__body">
            <Routes>
              <Route
                path="/"
                element={(
                  <HomePage />
              )}
              />
              <Route
                path="/archives"
                element={(
                  <ArchivedNotePage />
              )}
              />
              <Route
                path="/notes/new"
                element={(
                  <AddNotePage />
              )}
              />
              <Route
                path="/notes/:noteId"
                element={(
                  <DetailNotePage />
              )}
              />
              <Route
                path="/*"
                element={(
                  <NotFoundPage />
              )}
              />
            </Routes>
            {/* <NoteAppFooter /> */}
          </main>
        </ThemeProvider>
      </LocalProvider>
    );
  }
}

export default NotesApp;
