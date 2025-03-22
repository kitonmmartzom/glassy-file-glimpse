
import React, { useState } from 'react';
import { ChevronUp, ChevronDown, Check } from 'lucide-react';

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
    },
    {
      id: 'pattern2',
      title: 'Component Composition',
      description: 'Uses the Layout component to maintain consistent structure across pages.',
    }
  ];

  return (
    <div className={`expandable-section mt-6 ${expanded ? 'animate-slide-up' : ''}`} style={{ animationDelay: '100ms' }}>
      <div 
        className="expandable-header"
        onClick={() => setExpanded(!expanded)}
      >
        <h3 className="text-lg font-medium">React Patterns</h3>
        {expanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </div>
      
      {expanded && (
        <div className="p-6 bg-white/50">
          <div className="space-y-4">
            {patterns.map((pattern) => (
              <div key={pattern.id} className="glass-card p-5 animate-fade-in">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 p-1 rounded-full bg-green-100 text-green-600">
                    <Check size={16} />
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
