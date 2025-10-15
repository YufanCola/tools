import React from 'react';
import { useTheme } from '../contexts/ThemeContext';

const Header = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <header className="bg-white dark:bg-gray-800 shadow-lg border-b border-gray-200 dark:border-gray-700">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
              <i className="fas fa-tools text-white text-lg"></i>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                实用小工具
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                开发者必备工具集合
              </p>
            </div>
          </div>
          
          <button
            onClick={toggleTheme}
            className="p-3 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-200 group"
            title={isDark ? '切换到浅色模式' : '切换到深色模式'}
          >
            <i className={`fas ${isDark ? 'fa-sun' : 'fa-moon'} text-lg text-gray-700 dark:text-gray-300 group-hover:scale-110 transition-transform duration-200`}></i>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
