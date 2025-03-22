
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';
import { Button } from '@/components/ui/button';
import { Moon, Sun, LogOut, Github } from 'lucide-react';

const Navbar: React.FC = () => {
  const { signOut, user } = useAuth();
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="glass-card sticky top-4 z-10 mx-auto w-full max-w-7xl px-4 py-3 mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/" className="flex items-center gap-2">
            <div className="relative w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center text-white">
              <span className="text-sm font-bold">AA</span>
            </div>
            <span className="text-xl font-semibold text-gradient">Architecture Analyzer</span>
          </Link>
        </div>
        
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="icon" 
            onClick={toggleTheme}
            className="rounded-full"
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </Button>
          
          <Button 
            variant="outline" 
            size="icon"
            className="rounded-full"
            aria-label="GitHub"
          >
            <Github size={18} />
          </Button>
          
          {user && (
            <Button 
              variant="outline" 
              size="icon"
              onClick={() => signOut()}
              className="rounded-full"
              aria-label="Sign out"
            >
              <LogOut size={18} />
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
