
import { ExternalLink, Trash2, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { LinkItem } from '@/pages/Index';

interface LinkCardProps {
  link: LinkItem;
  onDelete: (id: string) => void;
}

export const LinkCard = ({ link, onDelete }: LinkCardProps) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getDomain = (url: string) => {
    try {
      return new URL(url).hostname.replace('www.', '');
    } catch {
      return url;
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-all duration-200 group">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="font-semibold text-gray-900 truncate group-hover:text-indigo-600 transition-colors">
              <a 
                href={link.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:underline flex items-center gap-2"
              >
                {link.title}
                <ExternalLink className="h-4 w-4 text-gray-400 group-hover:text-indigo-500" />
              </a>
            </h3>
          </div>
          
          <div className="text-sm text-gray-500 mb-2 truncate">
            {getDomain(link.url)}
          </div>
          
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <Calendar className="h-3 w-3" />
            <span>Added {formatDate(link.dateAdded)}</span>
          </div>
        </div>

        <Button
          variant="ghost"
          size="sm"
          onClick={() => onDelete(link.id)}
          className="text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors opacity-0 group-hover:opacity-100"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
