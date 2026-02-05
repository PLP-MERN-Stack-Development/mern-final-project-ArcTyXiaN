import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Briefcase, Menu, X, LogOut, User, Sun, Moon } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [theme, setTheme] = useState('dark');
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia?.('(prefers-color-scheme: dark)').matches;
    const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');
    setTheme(initialTheme);
    document.documentElement.classList.toggle('dark', initialTheme === 'dark');
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    localStorage.setItem('theme', nextTheme);
    document.documentElement.classList.toggle('dark', nextTheme === 'dark');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('role');
    localStorage.removeItem('id');
    setUser(null);
    navigate('/');
  };

  return (
    <nav className="bg-neutral-50 dark:bg-neutral-900 shadow-lg sticky top-0 z-50 border-b border-neutral-200 dark:border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="bg-neutral-100 dark:bg-neutral-800 p-2 rounded-lg group-hover:scale-110 transition-transform">
              <Briefcase className="h-6 w-6 text-amber-500" />
            </div>
            <span className="text-neutral-900 dark:text-neutral-100 font-bold text-2xl tracking-tight">
              GOODWORK
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <Link
              to="/"
              className="text-neutral-700 dark:text-neutral-100 hover:text-neutral-500 dark:hover:text-neutral-400 transition-colors font-medium"
            >
              Find Jobs
            </Link>

            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-100 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
              aria-label="Toggle theme"
              title="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>

            {user ? (
              <>
                {user.role === 'employer' && (
                  <Link
                    to="/post-job"
                    className="bg-amber-500 text-neutral-900 px-4 py-2 rounded-lg font-semibold hover:bg-amber-600 transition-colors"
                  >
                    Post Job
                  </Link>
                )}

                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2 bg-neutral-100 dark:bg-neutral-800 px-3 py-2 rounded-lg">
                    <User className="h-4 w-4 text-neutral-700 dark:text-neutral-100" />
                    <span className="text-neutral-700 dark:text-neutral-100 text-sm font-medium">
                      {user.fullname}
                    </span>
                  </div>

                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-2 bg-red-600 text-neutral-100 px-4 py-2 rounded-lg font-semibold hover:bg-red-700 transition-colors"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-neutral-700 dark:text-neutral-100 hover:text-neutral-500 dark:hover:text-neutral-400 transition-colors font-medium"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-amber-500 text-neutral-900 px-4 py-2 rounded-lg font-semibold hover:bg-amber-600 transition-colors"
                >
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-neutral-700 dark:text-neutral-100 hover:text-neutral-500 dark:hover:text-neutral-400"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-neutral-50 dark:bg-neutral-800 border-t border-neutral-200 dark:border-neutral-700">
          <div className="px-4 pt-2 pb-4 space-y-2">
            <Link
              to="/"
              className="block text-neutral-700 dark:text-neutral-100 hover:bg-neutral-200 dark:hover:bg-neutral-700 px-3 py-2 rounded-md transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Find Jobs
            </Link>

            <button
              onClick={() => {
                toggleTheme();
                setIsOpen(false);
              }}
              className="w-full flex items-center space-x-2 text-neutral-700 dark:text-neutral-100 hover:bg-neutral-200 dark:hover:bg-neutral-700 px-3 py-2 rounded-md transition-colors"
            >
              {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
            </button>

            {user ? (
              <>
                {user.role === 'employer' && (
                  <Link
                    to="/post-job"
                    className="block text-neutral-700 dark:text-neutral-100 hover:bg-neutral-200 dark:hover:bg-neutral-700 px-3 py-2 rounded-md transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    Post Job
                  </Link>
                )}

                <div className="border-t border-neutral-200 dark:border-neutral-700 pt-2 mt-2">
                  <p className="text-neutral-700 dark:text-neutral-100 text-sm px-3 py-1">
                    {user.fullname}
                  </p>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsOpen(false);
                    }}
                    className="w-full text-left text-neutral-100 bg-red-600 hover:bg-red-700 px-3 py-2 rounded-md transition-colors"
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="block text-neutral-700 dark:text-neutral-100 hover:bg-neutral-200 dark:hover:bg-neutral-700 px-3 py-2 rounded-md transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="block text-neutral-700 dark:text-neutral-100 hover:bg-neutral-200 dark:hover:bg-neutral-700 px-3 py-2 rounded-md transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
