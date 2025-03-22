
import React, { useState } from 'react';
import { ChevronUp, ChevronDown, Layers, Puzzle, ArrowRightLeft } from 'lucide-react';

interface ComponentStructureProps {
  isExpanded?: boolean;
}

const ComponentStructure: React.FC<ComponentStructureProps> = ({ isExpanded = false }) => {
  const [expanded, setExpanded] = useState<boolean>(isExpanded);

  const componentTypes = [
    {
      id: 'comp1',
      title: 'Page Component',
      description: 'Main page component that serves as the entry point for the application.',
      type: 'functional',
      props: ['children', 'className'],
      icon: <Layers size={18} />
    },
    {
      id: 'comp2',
      title: 'UI Components',
      description: 'Collection of reusable UI components for building the interface.',
      type: 'functional',
      props: ['variant', 'size', 'className', 'onClick'],
      icon: <Puzzle size={18} />
    },
    {
      id: 'comp3',
      title: 'Data Flow',
      description: 'State management and data flow between components.',
      type: 'hooks',
      props: ['state', 'dispatch', 'context'],
      icon: <ArrowRightLeft size={18} />
    }
  ];

  return (
    <div className={`expandable-section mt-6 ${expanded ? 'animate-slide-up' : ''}`}>
      <div 
        className="expandable-header glass-card p-4 flex items-center justify-between cursor-pointer transition-colors hover:bg-white/5 dark:hover:bg-black/20 shadow-md bg-white/10 dark:bg-black/20 backdrop-blur-xl border border-white/20 dark:border-white/10"
        onClick={() => setExpanded(!expanded)}
      >
        <h3 className="text-lg font-medium">Component Structure</h3>
        {expanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </div>
      
      {expanded && (
        <div className="p-6 bg-white/20 dark:bg-black/10 backdrop-blur-sm animate-fade-in">
          <div className="space-y-4">
            {componentTypes.map((component) => (
              <div key={component.id} className="glass-card p-5 transition-transform hover:scale-[1.01] shadow-lg bg-white/10 dark:bg-black/20 backdrop-blur-xl border border-white/20 dark:border-white/10">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 p-2 rounded-full bg-primary/10 text-primary">
                    {component.icon}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">{component.title}</div>
                    <p className="text-sm text-muted-foreground mt-1">
                      {component.description}
                    </p>
                    <div className="mt-3">
                      <div className="text-xs font-medium uppercase text-muted-foreground">Type</div>
                      <div className="text-sm mt-1">{component.type}</div>
                    </div>
                    <div className="mt-2">
                      <div className="text-xs font-medium uppercase text-muted-foreground">Props</div>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {component.props.map((prop, i) => (
                          <span key={i} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-md">
                            {prop}
                          </span>
                        ))}
                      </div>
                    </div>
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

export default ComponentStructure;
