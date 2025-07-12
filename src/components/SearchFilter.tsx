
import { Search, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface SearchFilterProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  categories: string[];
}

export const SearchFilter = ({
  searchTerm,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  categories
}: SearchFilterProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Search links..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 transition-all duration-200 focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        
        <div className="flex items-center gap-2 min-w-0 sm:min-w-[200px]">
          <Filter className="h-4 w-4 text-gray-400 flex-shrink-0" />
          <Select value={selectedCategory} onValueChange={onCategoryChange}>
            <SelectTrigger className="transition-all duration-200 focus:ring-2 focus:ring-indigo-500">
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category} {category === 'All' ? '' : `(${categories.filter(c => c === category).length})`}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};
