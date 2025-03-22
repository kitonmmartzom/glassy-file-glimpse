
import React, { useEffect, useState } from 'react';
import { Eye, Edit, Save, Copy } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-markup';
import 'prismjs/plugins/line-numbers/prism-line-numbers.js';
import 'prismjs/plugins/line-numbers/prism-line-numbers.css';

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
  const [editableContent, setEditableContent] = useState(content);
  const [editableFileName, setEditableFileName] = useState(fileName);
  const [editableLanguage, setEditableLanguage] = useState(language);

  useEffect(() => {
    if (activeTab === 'view') {
      Prism.highlightAll();
    }
  }, [activeTab, content, language]);

  const handleSave = () => {
    // In a real app, we would save to the database here
    toast({
      title: 'Saved successfully',
      description: `${editableFileName} has been updated`,
    });
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(content);
    toast({
      title: 'Copied to clipboard',
      description: 'The code has been copied to your clipboard',
    });
  };

  const getLanguageClass = () => {
    const languageMap: Record<string, string> = {
      'TypeScript': 'language-typescript',
      'JavaScript': 'language-javascript',
      'CSS': 'language-css',
      'HTML': 'language-markup',
    };
    return languageMap[language] || 'language-typescript';
  };

  return (
    <div className="glass-card w-full overflow-hidden animate-scale-in">
      <Tabs value={activeTab} onValueChange={(value) => onTabChange(value as 'view' | 'edit')}>
        <div className="flex items-center justify-between p-3 border-b border-border/40">
          <TabsList>
            <TabsTrigger value="view" className="flex items-center gap-2">
              <Eye size={16} />
              View Code
            </TabsTrigger>
            <TabsTrigger value="edit" className="flex items-center gap-2">
              <Edit size={16} />
              Edit Code
            </TabsTrigger>
          </TabsList>
          
          <div className="flex gap-2">
            {activeTab === 'view' && (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={copyToClipboard}
                className="flex items-center gap-1"
              >
                <Copy size={14} />
                Copy
              </Button>
            )}
            
            {activeTab === 'edit' && (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleSave}
                className="flex items-center gap-1"
              >
                <Save size={14} />
                Save
              </Button>
            )}
          </div>
        </div>
        
        <TabsContent value="view" className="p-6 animate-fade-in">
          <div className="mb-6">
            <div className="flex items-center justify-between gap-4 mb-4">
              <div>
                <p className="text-sm font-medium mb-1 text-muted-foreground">File Name</p>
                <p className="font-mono text-sm">{fileName}</p>
              </div>
              <div>
                <p className="text-sm font-medium mb-1 text-muted-foreground">Language</p>
                <p className="font-mono text-sm">{language}</p>
              </div>
            </div>
          </div>
          
          <div>
            <p className="text-sm font-medium mb-1 text-muted-foreground">Code</p>
            <div className="glass-card overflow-hidden">
              <pre className="line-numbers">
                <code className={getLanguageClass()}>
                  {content}
                </code>
              </pre>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="edit" className="p-6 animate-fade-in">
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
                  value={editableFileName}
                  onChange={(e) => setEditableFileName(e.target.value)}
                />
              </div>
              <div className="w-full sm:w-40">
                <label htmlFor="language" className="block text-sm font-medium mb-1 text-muted-foreground">
                  Language
                </label>
                <select
                  id="language"
                  className="glass-input w-full px-3 py-2 rounded-md appearance-none"
                  value={editableLanguage}
                  onChange={(e) => setEditableLanguage(e.target.value)}
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
              value={editableContent}
              onChange={(e) => setEditableContent(e.target.value)}
            />
          </div>
          <div className="mt-6 flex justify-end">
            <Button 
              variant="default" 
              onClick={handleSave}
              className="flex items-center gap-2"
            >
              <Save size={16} />
              Save Code
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CodeView;
