import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { ThemeConsumer } from '../context/ThemeContext';

function ToggleTheme() {
  return (
    <ThemeConsumer>
      {({ theme, toggleTheme }) => {
        return (
          <button
            type="button"
            style={{
              cursor: 'pointer', color: 'inherit', backgroundColor: 'inherit', border: 'inherit',
            }}
            onClick={toggleTheme}
          >
            {theme === 'light' ? <Moon /> : <Sun />}
          </button>
        );
      }}
    </ThemeConsumer>
  );
}

export default ToggleTheme;
