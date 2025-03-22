
import React from 'react';
import { Eye, Edit } from 'lucide-react';

interface CodeViewProps {
  activeTab: 'view' | 'edit';
  onTabChange: (tab: 'view' | 'edit') => void;
  fileName: string;
  language: string;
  content: string;
}

const CodeView: React.FC<CodeViewProps> = ({
  activeTab,
  onTabChange,
  fileName,
  language,
  content
}) => {
  return (
    <div className="glass-card w-full overflow-hidden animate-scale-in">
      <div className="flex items-center p-3 border-b border-border/40">
        <div className="flex space-x-1">
          <button
            className={`px-4 py-2 rounded-md transition-all duration-300 ${activeTab === 'view' ? 'bg-primary/10 text-primary' : 'hover:bg-muted'}`}
            onClick={() => onTabChange('view')}
          >
            <span className="flex items-center gap-2">
              <Eye size={16} />
              View Code
            </span>
          </button>
          <button
            className={`px-4 py-2 rounded-md transition-all duration-300 ${activeTab === 'edit' ? 'bg-primary/10 text-primary' : 'hover:bg-muted'}`}
            onClick={() => onTabChange('edit')}
          >
            <span className="flex items-center gap-2">
              <Edit size={16} />
              Edit Code
            </span>
          </button>
        </div>
      </div>
      <div className="p-6 animate-fade-in">
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="w-full">
              <label htmlFor="fileName" className="block text-sm font-medium mb-1 text-muted-foreground">
                File Name
              </label>
              <input
                id="fileName"
                type="text"
                className="glass-input w-full px-3 py-2 rounded-md"
                placeholder="Enter file name (e.g., my-component.tsx)"
                value={fileName}
                readOnly={activeTab === 'view'}
              />
            </div>
            <div className="w-full sm:w-40">
              <label htmlFor="language" className="block text-sm font-medium mb-1 text-muted-foreground">
                Language
              </label>
              <select
                id="language"
                className="glass-input w-full px-3 py-2 rounded-md appearance-none"
                value={language}
                disabled={activeTab === 'view'}
              >
                <option value="TypeScript">TypeScript</option>
                <option value="JavaScript">JavaScript</option>
                <option value="CSS">CSS</option>
                <option value="HTML">HTML</option>
              </select>
            </div>
          </div>
        </div>
        <div>
          <label htmlFor="codeContent" className="block text-sm font-medium mb-1 text-muted-foreground">
            Code Content
          </label>
          <textarea
            id="codeContent"
            className="glass-input w-full p-4 rounded-md font-mono text-sm h-64"
            placeholder="Paste or type your code here"
            value={content}
            readOnly={activeTab === 'view'}
          />
        </div>
        {activeTab === 'edit' && (
          <div className="mt-6 flex justify-end">
            <button className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 transition-colors flex items-center gap-2">
              Save Code
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CodeView;
