
import { useState, useEffect } from 'react';
import { LinkForm } from '@/components/LinkForm';
import { CategorySection } from '@/components/CategorySection';
import { SearchFilter } from '@/components/SearchFilter';
import { Link2, BookmarkPlus } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

export interface LinkItem {
  id: string;
  title: string;
  url: string;
  category: string;
  dateAdded: string;
}

const Index = () => {
  const [links, setLinks] = useState<LinkItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Load links from localStorage on component mount
  useEffect(() => {
    const savedLinks = localStorage.getItem('linkCollectorLinks');
    if (savedLinks) {
      try {
        setLinks(JSON.parse(savedLinks));
      } catch (error) {
        console.error('Error loading links:', error);
        toast({
          title: "Error",
          description: "Failed to load saved links",
          variant: "destructive"
        });
      }
    }
  }, []);

  // Save links to localStorage whenever links change
  useEffect(() => {
    localStorage.setItem('linkCollectorLinks', JSON.stringify(links));
  }, [links]);

  const addLink = (newLink: Omit<LinkItem, 'id' | 'dateAdded'>) => {
    const linkWithId: LinkItem = {
      ...newLink,
      id: crypto.randomUUID(),
      dateAdded: new Date().toISOString()
    };
    setLinks(prev => [...prev, linkWithId]);
    toast({
      title: "Link saved!",
      description: `"${newLink.title}" has been added to your collection.`
    });
  };

  const deleteLink = (id: string) => {
    const linkToDelete = links.find(link => link.id === id);
    setLinks(prev => prev.filter(link => link.id !== id));
    toast({
      title: "Link deleted",
      description: `"${linkToDelete?.title}" has been removed from your collection.`
    });
  };

  // Filter and group links
  const filteredLinks = links.filter(link => {
    const matchesSearch = link.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         link.url.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || link.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const groupedLinks = filteredLinks.reduce((groups, link) => {
    const category = link.category;
    if (!groups[category]) {
      groups[category] = [];
    }
    groups[category].push(link);
    return groups;
  }, {} as Record<string, LinkItem[]>);

  // Sort links within each category alphabetically by title
  Object.keys(groupedLinks).forEach(category => {
    groupedLinks[category].sort((a, b) => a.title.localeCompare(b.title));
  });

  const categories = ['All', ...Array.from(new Set(links.map(link => link.category)))];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-white rounded-full shadow-lg">
              <Link2 className="h-8 w-8 text-indigo-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-800">Link Collector</h1>
          </div>
          <p className="text-gray-600 text-lg">Save and organize your favorite links</p>
        </div>

        {/* Add Link Form */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex items-center gap-2 mb-4">
            <BookmarkPlus className="h-5 w-5 text-indigo-600" />
            <h2 className="text-xl font-semibold text-gray-800">Add New Link</h2>
          </div>
          <LinkForm onAddLink={addLink} />
        </div>

        {/* Search and Filter */}
        <SearchFilter
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          categories={categories}
        />

        {/* Stats */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>Total links: {links.length}</span>
            <span>Showing: {filteredLinks.length}</span>
            <span>Categories: {categories.length - 1}</span>
          </div>
        </div>

        {/* Links Display */}
        <div className="space-y-6">
          {Object.keys(groupedLinks).length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <Link2 className="h-16 w-16 mx-auto mb-4 opacity-30" />
                <p className="text-lg">No links found</p>
                <p className="text-sm">Add your first link to get started!</p>
              </div>
            </div>
          ) : (
            Object.entries(groupedLinks).map(([category, categoryLinks]) => (
              <CategorySection
                key={category}
                category={category}
                links={categoryLinks}
                onDeleteLink={deleteLink}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
