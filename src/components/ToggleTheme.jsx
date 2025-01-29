import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { ThemeConsumer } from '../context/ThemeContext';

function ToggleTheme() {
  return (
    <ThemeConsumer>
      {({ theme, toggleTheme }) => {
        return (
          <button type="button" style={{ cursor: 'pointer' }} onClick={toggleTheme}>
            {theme === 'light' ? <Moon /> : <Sun />}
            {theme}
          </button>
        );
      }}
    </ThemeConsumer>
  );
}

export default ToggleTheme;
