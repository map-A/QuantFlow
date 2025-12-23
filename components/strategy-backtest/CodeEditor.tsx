import React from 'react';
import { Strategy } from '../../types';

interface CodeEditorProps {
  activeStrategy: Strategy | null;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ activeStrategy }) => {
  return (
    <div className="flex-1 h-full bg-[#0d1117] flex flex-col relative">
      <div className="flex-1 flex overflow-hidden">
        {/* Line Numbers */}
        <div className="w-12 pt-4 text-right pr-4 text-text-muted/30 font-mono text-sm select-none border-r border-border/30 bg-surface/10">
          {Array.from({length: 40}, (_, i) => <div key={i}>{i+1}</div>)}
        </div>
        
        {/* Code Content */}
        <div className="flex-1 p-4 font-mono text-sm text-text-main overflow-auto custom-scrollbar leading-relaxed">
          <pre className="whitespace-pre-wrap">
            {activeStrategy?.code || '# Select a strategy or create a new one'}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;
