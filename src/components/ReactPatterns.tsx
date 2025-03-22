
import React, { useState } from 'react';
import { ChevronUp, ChevronDown, Check, AlertCircle, Info } from 'lucide-react';

interface ReactPatternsProps {
  isExpanded?: boolean;
}

const ReactPatterns: React.FC<ReactPatternsProps> = ({ isExpanded = false }) => {
  const [expanded, setExpanded] = useState<boolean>(isExpanded);

  const patterns = [
    {
      id: 'pattern1',
      title: 'Default Export Pattern',
      description: 'Component is exported as default, which is a common pattern for page components in Next.js.',
      status: 'good',
    },
    {
      id: 'pattern2',
      title: 'Component Composition',
      description: 'Uses the Layout component to maintain consistent structure across pages.',
      status: 'good',
    },
    {
      id: 'pattern3',
      title: 'Prop Drilling',
      description: 'Multiple levels of prop passing could be simplified with Context API.',
      status: 'warning',
    },
    {
      id: 'pattern4',
      title: 'State Management',
      description: 'Consider using React Query for server state and Context for UI state.',
      status: 'info',
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'good':
        return <div className="p-1 rounded-full bg-green-100 text-green-600"><Check size={16} /></div>;
      case 'warning':
        return <div className="p-1 rounded-full bg-amber-100 text-amber-600"><AlertCircle size={16} /></div>;
      case 'info':
        return <div className="p-1 rounded-full bg-blue-100 text-blue-600"><Info size={16} /></div>;
      default:
        return <div className="p-1 rounded-full bg-green-100 text-green-600"><Check size={16} /></div>;
    }
  };

  return (
    <div className={`expandable-section mt-6 ${expanded ? 'animate-slide-up' : ''}`} style={{ animationDelay: '100ms' }}>
      <div 
        className="expandable-header glass-card p-4 flex items-center justify-between cursor-pointer transition-colors hover:bg-white/5 dark:hover:bg-black/20 shadow-md bg-white/10 dark:bg-black/20 backdrop-blur-xl border border-white/20 dark:border-white/10"
        onClick={() => setExpanded(!expanded)}
      >
        <h3 className="text-lg font-medium">React Patterns</h3>
        {expanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </div>
      
      {expanded && (
        <div className="p-6 bg-white/20 dark:bg-black/10 backdrop-blur-sm">
          <div className="space-y-4">
            {patterns.map((pattern) => (
              <div 
                key={pattern.id} 
                className="glass-card p-5 animate-fade-in transition-transform hover:scale-[1.01] shadow-lg bg-white/10 dark:bg-black/20 backdrop-blur-xl border border-white/20 dark:border-white/10"
                style={{ animationDelay: `${patterns.indexOf(pattern) * 100}ms` }}
              >
                <div className="flex items-start gap-3">
                  <div className="mt-0.5">
                    {getStatusIcon(pattern.status)}
                  </div>
                  <div>
                    <div className="font-medium">{pattern.title}</div>
                    <p className="text-sm text-muted-foreground mt-1">
                      {pattern.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ReactPatterns;
