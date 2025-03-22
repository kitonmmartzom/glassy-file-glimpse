
import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';
import Navbar from '@/components/Navbar';
import FileExplorer from '@/components/FileExplorer';
import CodeView from '@/components/CodeView';
import ComponentStructure from '@/components/ComponentStructure';
import ReactPatterns from '@/components/ReactPatterns';
import Recommendations from '@/components/Recommendations';

interface FileItem {
  id: string;
  name: string;
  type: 'file' | 'folder';
  content?: string;
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

  // Fetch projects from Supabase
  const { data: projects, isLoading: projectsLoading } = useQuery({
    queryKey: ['projects'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('updated_at', { ascending: false });
      
      if (error) {
        toast({
          title: 'Error fetching projects',
          description: error.message,
          variant: 'destructive',
        });
        throw error;
      }
      
      return data || [];
    },
  });
  
  const handleSelectFile = (file: FileItem) => {
    setSelectedFile(file);
    // In a real app we would fetch file content from the database
    if (file.content) {
      setCodeContent(file.content);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900 dark:to-indigo-900">
      <div className="container mx-auto py-4 px-4">
        <Navbar />
        
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
