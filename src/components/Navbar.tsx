
import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '@/context/ThemeContext';
import { Button } from '@/components/ui/button';
import { Moon, Sun, Github, Code, ExternalLink } from 'lucide-react';

const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="glass-card sticky top-4 z-10 mx-auto w-full max-w-7xl px-4 py-3 mb-6 shadow-lg bg-white/10 dark:bg-black/20 backdrop-blur-xl border border-white/20 dark:border-white/10">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/" className="flex items-center gap-2">
            <div className="relative w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center text-white shadow-md">
              <span className="text-sm font-bold">AA</span>
            </div>
            <span className="text-xl font-semibold text-gradient animate-pulse duration-3000">Architecture Analyzer</span>
          </Link>
        </div>
        
        <div className="flex items-center gap-3">
          <Button 
            variant="outline" 
            size="icon" 
            onClick={toggleTheme}
            className="rounded-full transition-transform hover:scale-105 hover:shadow-md"
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </Button>
          
          <Button 
            variant="outline" 
            size="icon"
            className="rounded-full transition-transform hover:scale-105 hover:shadow-md"
            aria-label="GitHub"
          >
            <Github size={18} />
          </Button>

          <Button 
            variant="outline" 
            size="icon"
            className="rounded-full transition-transform hover:scale-105 hover:shadow-md"
            aria-label="Analyze Code"
          >
            <Code size={18} />
          </Button>

          <Button 
            variant="outline" 
            size="icon"
            className="rounded-full transition-transform hover:scale-105 hover:shadow-md hidden sm:flex"
            aria-label="External Link"
          >
            <ExternalLink size={18} />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
