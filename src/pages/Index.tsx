
import React, { useState } from 'react';
import FileExplorer from '../components/FileExplorer';
import CodeView from '../components/CodeView';
import ComponentStructure from '../components/ComponentStructure';
import ReactPatterns from '../components/ReactPatterns';
import Recommendations from '../components/Recommendations';

interface FileItem {
  id: string;
  name: string;
  type: 'file' | 'folder';
}

const Index = () => {
  const [activeTab, setActiveTab] = useState<'view' | 'edit'>('view');
  const [selectedFile, setSelectedFile] = useState<FileItem>({
    id: 'f1-1',
    name: 'page.tsx',
    type: 'file'
  });
  
  const [codeContent, setCodeContent] = useState<string>(
    'export default function Page() {\n  return (\n    <div>\n      <h1>Hello World</h1>\n    </div>\n  );\n}'
  );
  
  const handleSelectFile = (file: FileItem) => {
    setSelectedFile(file);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="container mx-auto py-8 px-4">
        <div className="flex flex-col space-y-8">
          <div className="flex flex-col sm:flex-row gap-8">
            {/* Left Column - File Explorer */}
            <div className="w-full sm:w-80">
              <FileExplorer onSelectFile={handleSelectFile} />
            </div>
            
            {/* Right Column - Code View & Analysis */}
            <div className="flex-1">
              <CodeView 
                activeTab={activeTab}
                onTabChange={setActiveTab}
                fileName={selectedFile.name}
                language="TypeScript"
                content={codeContent}
              />
              
              <ComponentStructure isExpanded={true} />
              <ReactPatterns />
              <Recommendations />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
