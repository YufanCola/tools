import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import ToolGrid from './components/ToolGrid';
import { ThemeProvider } from './contexts/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <ToolGrid />
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;
