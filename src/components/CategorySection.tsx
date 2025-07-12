
import { Folder, ChevronDown, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { LinkCard } from './LinkCard';
import { LinkItem } from '@/pages/Index';

interface CategorySectionProps {
  category: string;
  links: LinkItem[];
  onDeleteLink: (id: string) => void;
}

export const CategorySection = ({ category, links, onDeleteLink }: CategorySectionProps) => {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-6 py-4 bg-gradient-to-r from-indigo-50 to-purple-50 hover:from-indigo-100 hover:to-purple-100 transition-colors duration-200 flex items-center justify-between"
      >
        <div className="flex items-center gap-3">
          <div className="p-2 bg-white rounded-lg shadow-sm">
            <Folder className="h-5 w-5 text-indigo-600" />
          </div>
          <div className="text-left">
            <h2 className="text-xl font-semibold text-gray-800">{category}</h2>
            <p className="text-sm text-gray-600">{links.length} link{links.length !== 1 ? 's' : ''}</p>
          </div>
        </div>
        
        {isExpanded ? (
          <ChevronDown className="h-5 w-5 text-gray-500" />
        ) : (
          <ChevronRight className="h-5 w-5 text-gray-500" />
        )}
      </button>

      {isExpanded && (
        <div className="p-6 space-y-4 animate-fade-in">
          {links.map((link) => (
            <LinkCard
              key={link.id}
              link={link}
              onDelete={onDeleteLink}
            />
          ))}
        </div>
      )}
    </div>
  );
};
