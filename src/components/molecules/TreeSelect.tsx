import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/utils/cn';
import { ChevronDown, X } from 'lucide-react';
import { Tree, TreeNode } from '@/components/data-display/Tree';

interface TreeSelectProps {
  treeData: TreeNode[];
  value?: string;
  onChange?: (value: string, node: TreeNode) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  error?: boolean;
}

export const TreeSelect: React.FC<TreeSelectProps> = ({
  treeData,
  value,
  onChange,
  placeholder = 'Select...',
  disabled,
  className,
  error,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedNode, setSelectedNode] = useState<TreeNode | null>(null);

  // Find selected node recursively
  useEffect(() => {
    if (!value) {
      setSelectedNode(null);
      return;
    }

    const findNode = (nodes: TreeNode[]): TreeNode | null => {
      for (const node of nodes) {
        if (node.key === value) return node;
        if (node.children) {
          const found = findNode(node.children);
          if (found) return found;
        }
      }
      return null;
    };

    const node = findNode(treeData);
    if (node) setSelectedNode(node);
  }, [value, treeData]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (node: TreeNode) => {
    // Basic logic: Select any node. Can add strategy for leaf-only.
    onChange?.(node.key, node);
    setIsOpen(false);
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange?.('', {} as TreeNode);
  };

  return (
    <div className={cn("relative w-full", className)} ref={containerRef}>
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={cn(
          "w-full bg-white border border-gray-200 rounded-xl px-4 py-2 text-left text-sm flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-orange-500/10 transition-all",
          disabled ? "opacity-50 cursor-not-allowed bg-gray-50" : "hover:border-gray-300",
          isOpen && "border-orange-500 ring-2 ring-orange-500/10",
          error && "border-red-500 focus:ring-red-500/10",
          !selectedNode && "text-gray-400"
        )}
      >
        <span className={cn("block truncate", selectedNode ? "text-gray-900" : "text-gray-400")}>
          {selectedNode ? selectedNode.title : placeholder}
        </span>
        <div className="flex items-center gap-1">
           {selectedNode && !disabled && (
              <span onClick={handleClear} className="p-1 hover:bg-gray-100 rounded-full cursor-pointer">
                  <X className="w-3 h-3 text-gray-400" />
              </span>
           )}
           <ChevronDown className={cn("w-4 h-4 text-gray-400 transition-transform", isOpen && "transform rotate-180")} />
        </div>
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-1 w-full bg-white border border-gray-100 rounded-xl shadow-lg max-h-60 overflow-auto py-2 text-sm">
          <Tree 
            data={treeData} 
            onSelect={handleSelect} 
            className="px-2"
          />
        </div>
      )}
    </div>
  );
};
