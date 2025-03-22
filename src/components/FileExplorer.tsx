
import React, { useState } from 'react';
import { ChevronDown, ChevronRight, File, Folder, Plus } from 'lucide-react';

interface FileItem {
  id: string;
  name: string;
  type: 'file' | 'folder';
  children?: FileItem[];
}

interface FileExplorerProps {
  onSelectFile: (file: FileItem) => void;
}

const initialFiles: FileItem[] = [
  {
    id: 'f1',
    name: 'valtoznak',
    type: 'folder',
    children: [
      { id: 'f1-1', name: 'page.tsx', type: 'file' },
      { id: 'f1-2', name: 'layout.tsx', type: 'file' },
      { id: 'f1-3', name: 'user-flow-preview.tsx', type: 'file' },
      { id: 'f1-4', name: 'style-system-preview.tsx', type: 'file' },
      { id: 'f1-5', name: 'prompt-template-selector.tsx', type: 'file' },
      { id: 'f1-6', name: 'prompt-preview.tsx', type: 'file' },
      { id: 'f1-7', name: 'iterative-design-preview.tsx', type: 'file' },
      { id: 'f1-8', name: 'image-reference-preview.tsx', type: 'file' },
      { id: 'f1-9', name: 'feedback-preview.tsx', type: 'file' },
      { id: 'f1-10', name: 'ecommerce-preview.tsx', type: 'file' },
      { id: 'f1-11', name: 'dashboard-preview.tsx', type: 'file' },
      { id: 'f1-12', name: 'component-based-preview.tsx', type: 'file' },
      { id: 'f1-13', name: 'code-export-preview.tsx', type: 'file' },
    ]
  },
  {
    id: 'f2',
    name: 'user',
    type: 'folder',
    children: []
  }
];

const FileExplorer: React.FC<FileExplorerProps> = ({ onSelectFile }) => {
  const [files, setFiles] = useState<FileItem[]>(initialFiles);
  const [expandedFolders, setExpandedFolders] = useState<Record<string, boolean>>({ f1: true });
  const [selectedFileId, setSelectedFileId] = useState<string>('f1-1');

  const toggleFolder = (folderId: string) => {
    setExpandedFolders(prev => ({
      ...prev,
      [folderId]: !prev[folderId]
    }));
  };

  const handleSelectFile = (file: FileItem) => {
    if (file.type === 'file') {
      setSelectedFileId(file.id);
      onSelectFile(file);
    }
  };

  const renderFileTree = (items: FileItem[], level = 0) => {
    return items.map(item => {
      const isFolder = item.type === 'folder';
      const isExpanded = expandedFolders[item.id];
      const isSelected = selectedFileId === item.id;
      
      return (
        <div 
          key={item.id} 
          className="animate-fade-in" 
          style={{ marginLeft: `${level * 12}px`, animationDelay: `${level * 50}ms` }}
        >
          <div 
            className={`file-item ${isSelected ? 'active' : ''}`}
            onClick={() => isFolder ? toggleFolder(item.id) : handleSelectFile(item)}
          >
            {isFolder ? (
              isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />
            ) : (
              <File size={16} />
            )}
            <span>{item.name}</span>
          </div>
          
          {isFolder && isExpanded && item.children && (
            <div className="mt-1 ml-2">
              {renderFileTree(item.children, level + 1)}
            </div>
          )}
        </div>
      );
    });
  };

  return (
    <div className="glass-card w-full h-full overflow-hidden flex flex-col">
      <div className="flex items-center justify-between p-4 border-b border-border/40">
        <h2 className="font-medium">File Explorer</h2>
        <button className="p-1 rounded-md hover:bg-primary/10 transition-colors">
          <Plus size={18} />
        </button>
      </div>
      <div className="flex-1 overflow-auto p-2">
        {renderFileTree(files)}
      </div>
    </div>
  );
};

export default FileExplorer;
