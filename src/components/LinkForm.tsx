
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, Link, Tag, Type } from 'lucide-react';
import { LinkItem } from '@/pages/Index';

interface LinkFormProps {
  onAddLink: (link: Omit<LinkItem, 'id' | 'dateAdded'>) => void;
}

export const LinkForm = ({ onAddLink }: LinkFormProps) => {
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [category, setCategory] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || !url.trim() || !category.trim()) {
      return;
    }

    // Ensure URL has protocol
    const formattedUrl = url.startsWith('http') ? url : `https://${url}`;

    onAddLink({
      title: title.trim(),
      url: formattedUrl,
      category: category.trim()
    });

    // Clear form
    setTitle('');
    setUrl('');
    setCategory('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="title" className="flex items-center gap-2 text-sm font-medium text-gray-700">
            <Type className="h-4 w-4" />
            Title
          </Label>
          <Input
            id="title"
            type="text"
            placeholder="My awesome link"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="transition-all duration-200 focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="url" className="flex items-center gap-2 text-sm font-medium text-gray-700">
            <Link className="h-4 w-4" />
            URL
          </Label>
          <Input
            id="url"
            type="url"
            placeholder="https://example.com"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="transition-all duration-200 focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="category" className="flex items-center gap-2 text-sm font-medium text-gray-700">
            <Tag className="h-4 w-4" />
            Category
          </Label>
          <Input
            id="category"
            type="text"
            placeholder="Development"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="transition-all duration-200 focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>
      </div>

      <Button 
        type="submit" 
        className="w-full bg-indigo-600 hover:bg-indigo-700 transition-colors duration-200"
        disabled={!title.trim() || !url.trim() || !category.trim()}
      >
        <Plus className="h-4 w-4 mr-2" />
        Save Link
      </Button>
    </form>
  );
};
