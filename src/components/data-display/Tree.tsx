import React, { useState } from 'react';
import { cn } from '@/utils/cn';
import { ChevronRight, Folder, File } from 'lucide-react';

export interface TreeNode {
  key: string;
  title: string;
  children?: TreeNode[];
  isLeaf?: boolean;
}

interface TreeProps {
  data: TreeNode[];
  onSelect?: (node: TreeNode) => void;
  className?: string;
}

const TreeNodeItem: React.FC<{
  node: TreeNode;
  level: number;
  onSelect?: (node: TreeNode) => void;
}> = ({ node, level, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const hasChildren = node.children && node.children.length > 0;

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  const handleSelect = () => {
    onSelect?.(node);
  };

  return (
    <div className="select-none">
      <div
        className={cn(
          "flex items-center gap-1 py-1 px-2 rounded-md hover:bg-gray-100 cursor-pointer transition-colors text-sm",
        )}
        style={{ paddingLeft: level * 20 + 8 }}
        onClick={handleSelect}
      >
        <span
          onClick={hasChildren ? handleToggle : undefined}
          className={cn(
            "w-4 h-4 flex items-center justify-center transition-transform text-gray-400 hover:text-gray-600",
            isOpen && "transform rotate-90",
            !hasChildren && "opacity-0 pointer-events-none"
          )}
        >
          <ChevronRight className="w-3 h-3" />
        </span>
        
        {hasChildren ? (
          <Folder className={cn("w-4 h-4 text-orange-400", isOpen && "text-orange-500")} />
        ) : (
          <File className="w-4 h-4 text-gray-400" />
        )}
        
        <span className="text-gray-700">{node.title}</span>
      </div>

      {hasChildren && isOpen && (
        <div>
          {node.children!.map((child) => (
            <TreeNodeItem
              key={child.key}
              node={child}
              level={level + 1}
              onSelect={onSelect}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export const Tree: React.FC<TreeProps> = ({ data, onSelect, className }) => {
  return (
    <div className={cn("w-full", className)}>
      {data.map((node) => (
        <TreeNodeItem key={node.key} node={node} level={0} onSelect={onSelect} />
      ))}
    </div>
  );
};
