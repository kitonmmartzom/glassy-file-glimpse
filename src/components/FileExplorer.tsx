
import React, { useState, useCallback } from 'react';
import { ChevronDown, ChevronRight, File, Folder, Plus, Search } from 'lucide-react';

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
    name: 'components',
    type: 'folder',
    children: [
      { id: 'f2-1', name: 'Button.tsx', type: 'file' },
      { id: 'f2-2', name: 'Card.tsx', type: 'file' },
      { id: 'f2-3', name: 'Input.tsx', type: 'file' },
      { id: 'f2-4', name: 'Modal.tsx', type: 'file' },
    ]
  },
  {
    id: 'f3',
    name: 'hooks',
    type: 'folder',
    children: [
      { id: 'f3-1', name: 'useResponsive.ts', type: 'file' },
      { id: 'f3-2', name: 'useLocalStorage.ts', type: 'file' },
    ]
  }
];

const FileExplorer: React.FC<FileExplorerProps> = ({ onSelectFile }) => {
  const [files, setFiles] = useState<FileItem[]>(initialFiles);
  const [expandedFolders, setExpandedFolders] = useState<Record<string, boolean>>({ f1: true });
  const [selectedFileId, setSelectedFileId] = useState<string>('f1-1');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const toggleFolder = useCallback((folderId: string) => {
    setExpandedFolders(prev => ({
      ...prev,
      [folderId]: !prev[folderId]
    }));
  }, []);

  const handleSelectFile = useCallback((file: FileItem) => {
    if (file.type === 'file') {
      setSelectedFileId(file.id);
      onSelectFile(file);
    }
  }, [onSelectFile]);

  // Filter files based on search query
  const filterFiles = useCallback((items: FileItem[], query: string): FileItem[] => {
    if (!query) return items;
    
    return items.reduce<FileItem[]>((filtered, item) => {
      if (item.name.toLowerCase().includes(query.toLowerCase())) {
        filtered.push(item);
      } else if (item.children && item.children.length > 0) {
        const filteredChildren = filterFiles(item.children, query);
        if (filteredChildren.length > 0) {
          filtered.push({
            ...item,
            children: filteredChildren
          });
        }
      }
      return filtered;
    }, []);
  }, []);

  const visibleFiles = searchQuery ? filterFiles(files, searchQuery) : files;

  const renderFileTree = useCallback((items: FileItem[], level = 0) => {
    return items.map(item => {
      const isFolder = item.type === 'folder';
      const isExpanded = expandedFolders[item.id];
      const isSelected = selectedFileId === item.id;
      
      return (
        <div 
          key={item.id} 
          className="animate-fade-in" 
          style={{ 
            marginLeft: `${level * 12}px`, 
            animationDelay: `${level * 50}ms`,
            transition: 'all 0.2s ease-in-out'
          }}
        >
          <div 
            className={`file-item ${isSelected ? 'active' : ''} hover:bg-white/10 dark:hover:bg-black/20 p-2 rounded-md cursor-pointer transition-colors duration-200 flex items-center gap-2`}
            onClick={() => isFolder ? toggleFolder(item.id) : handleSelectFile(item)}
          >
            {isFolder ? (
              isExpanded ? 
                <ChevronDown size={16} className="text-blue-400" /> : 
                <ChevronRight size={16} className="text-blue-400" />
            ) : (
              <File size={16} className="text-indigo-400" />
            )}
            <span className={`truncate ${isSelected ? 'font-medium text-primary' : ''}`}>{item.name}</span>
          </div>
          
          {isFolder && isExpanded && item.children && (
            <div className="mt-1 ml-2 animate-fade-in transition-all duration-300">
              {renderFileTree(item.children, level + 1)}
            </div>
          )}
        </div>
      );
    });
  }, [expandedFolders, selectedFileId, handleSelectFile, toggleFolder]);

  return (
    <div className="glass-card w-full h-full overflow-hidden flex flex-col shadow-xl bg-white/10 dark:bg-black/20 backdrop-blur-xl border border-white/20 dark:border-white/10">
      <div className="flex items-center justify-between p-4 border-b border-border/40">
        <h2 className="font-medium">File Explorer</h2>
        <button className="p-1 rounded-md hover:bg-primary/10 transition-colors">
          <Plus size={18} />
        </button>
      </div>
      
      <div className="p-3 border-b border-border/40">
        <div className="relative">
          <input
            type="text"
            placeholder="Search files..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-3 py-2 rounded-md bg-white/5 dark:bg-black/10 backdrop-blur-md border border-white/10 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-primary"
          />
          <Search size={16} className="absolute top-1/2 left-2 transform -translate-y-1/2 text-gray-400" />
        </div>
      </div>
      
      <div className="flex-1 overflow-auto p-2">
        {visibleFiles.length > 0 ? (
          renderFileTree(visibleFiles)
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
            <File size={48} className="opacity-20 mb-2" />
            <p>No files match your search</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileExplorer;
