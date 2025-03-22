
import React, { useState } from 'react';
import { ChevronUp, ChevronDown, Zap } from 'lucide-react';

interface RecommendationsProps {
  isExpanded?: boolean;
}

const Recommendations: React.FC<RecommendationsProps> = ({ isExpanded = false }) => {
  const [expanded, setExpanded] = useState<boolean>(isExpanded);

  const recommendations = [
    {
      id: 'rec1',
      title: 'Add TypeScript typing',
      description: 'Consider adding explicit return type to the Page component for better type safety.',
      codeExample: 'export default function Page(): React.ReactElement { ... }'
    },
    {
      id: 'rec2',
      title: 'Implement dynamic preview links',
      description: 'Replace the comment with actual implementation for preview links, possibly using a map function over an array of preview options.',
      codeExample: 'const previewOptions = [\'mobile\', \'tablet\', \'desktop\']; return (\n  <div>\n    {previewOptions.map(option => (\n      <PreviewLink key={option} type={option} />\n    ))}\n  </div>\n);'
    }
  ];

  return (
    <div className={`expandable-section mt-6 ${expanded ? 'animate-slide-up' : ''}`} style={{ animationDelay: '200ms' }}>
      <div 
        className="expandable-header"
        onClick={() => setExpanded(!expanded)}
      >
        <h3 className="text-lg font-medium">Recommendations</h3>
        {expanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </div>
      
      {expanded && (
        <div className="p-6 bg-white/50">
          <div className="space-y-6">
            {recommendations.map((recommendation, index) => (
              <div key={recommendation.id} className="glass-card p-5 border border-blue-100 animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 p-1.5 rounded-full bg-blue-100 text-blue-600">
                    <Zap size={16} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="improvement-tag">IMPROVEMENT</div>
                      <div className="font-medium">{recommendation.title}</div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">
                      {recommendation.description}
                    </p>
                    <pre className="bg-gray-50 p-3 rounded-md text-xs font-mono overflow-x-auto border border-gray-100">
                      {recommendation.codeExample}
                    </pre>
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

export default Recommendations;
