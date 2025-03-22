
import React, { useState } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';

interface ComponentStructureProps {
  isExpanded?: boolean;
}

const ComponentStructure: React.FC<ComponentStructureProps> = ({ isExpanded = false }) => {
  const [expanded, setExpanded] = useState<boolean>(isExpanded);

  return (
    <div className={`expandable-section mt-6 ${expanded ? 'animate-slide-up' : ''}`}>
      <div 
        className="expandable-header"
        onClick={() => setExpanded(!expanded)}
      >
        <h3 className="text-lg font-medium">Component Structure</h3>
        {expanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </div>
      
      {expanded && (
        <div className="p-6 bg-white/50 animate-fade-in">
          <div className="glass-card p-5">
            <div className="mb-1 font-medium">Page</div>
            <div className="text-sm text-muted-foreground mb-3">Functional Component</div>
            <p className="text-sm">
              Main page component that serves as the entry point for the application.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ComponentStructure;
