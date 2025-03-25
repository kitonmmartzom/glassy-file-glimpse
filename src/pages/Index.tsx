import React, { useState, useEffect, memo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';
import Navbar from '@/components/Navbar';
import FileExplorer from '@/components/FileExplorer';
import CodeView from '@/components/CodeView';
import ComponentStructure from '@/components/ComponentStructure';
import ReactPatterns from '@/components/ReactPatterns';
import Recommendations from '@/components/Recommendations';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-markup';
import 'prismjs/plugins/line-numbers/prism-line-numbers.js';
import 'prismjs/plugins/line-numbers/prism-line-numbers.css';

interface FileItem {
  id: string;
  name: string;
  type: 'file' | 'folder';
  content?: string;
}

interface Project {
  id: string;
  name: string;
  description: string | null;
  owner_id: string;
  created_at: string;
  updated_at: string;
}

// Memoized components for performance optimization
const MemoizedFileExplorer = memo(FileExplorer);
const MemoizedCodeView = memo(CodeView);
const MemoizedComponentStructure = memo(ComponentStructure);
const MemoizedReactPatterns = memo(ReactPatterns);
const MemoizedRecommendations = memo(Recommendations);

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
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const { data: projects, isLoading: projectsLoading } = useQuery({
    queryKey: ['projects'],
    queryFn: async () => {
      try {
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
        
        return data as Project[] || [];
      } catch (error) {
        console.error('Error fetching projects:', error);
        return [];
      }
    },
  });
  
  const handleSelectFile = (file: FileItem) => {
    setSelectedFile(file);
    setIsAnalyzing(true);
    
    // Simulate loading delay for analysis to show animation
    setTimeout(() => {
      if (file.content) {
        setCodeContent(file.content);
      }
      setIsAnalyzing(false);
    }, 800);
  };

  const handleCodeChange = (newContent: string) => {
    setCodeContent(newContent);
    // In a real app we would save to Supabase here
    toast({
      title: 'Code updated',
      description: 'Your changes have been saved',
    });
  };

  // Real-time code editing functionality
  useEffect(() => {
    if (activeTab === 'view') {
      // Update syntax highlighting when switching to view tab
      Prism.highlightAll();
    }
  }, [activeTab, codeContent]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/40 dark:to-indigo-900/40 transition-colors duration-300">
      <div className="container mx-auto py-4 px-4">
        <Navbar />
        
        <div className="flex flex-col space-y-8">
          <div className="flex flex-col sm:flex-row gap-8">
            {/* Left Column - File Explorer */}
            <div className="w-full sm:w-80 animate-fade-in">
              <MemoizedFileExplorer onSelectFile={handleSelectFile} />
            </div>
            
            {/* Right Column - Code View & Analysis */}
            <div className="flex-1 space-y-6">
              <MemoizedCodeView 
                activeTab={activeTab}
                onTabChange={setActiveTab}
                fileName={selectedFile.name}
                language="TypeScript"
                content={codeContent}
                onContentChange={handleCodeChange}
              />
              
              {isAnalyzing ? (
                <div className="glass-card p-8 flex items-center justify-center animate-pulse">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                  <span className="ml-4 text-lg">Analyzing code structure...</span>
                </div>
              ) : (
                <>
                  <MemoizedComponentStructure isExpanded={true} />
                  <MemoizedReactPatterns />
                  <MemoizedRecommendations />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
