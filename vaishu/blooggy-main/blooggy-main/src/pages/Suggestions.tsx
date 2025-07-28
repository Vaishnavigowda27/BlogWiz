import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Lightbulb, 
  Search, 
  ExternalLink, 
  Plus,
  TrendingUp,
  Clock,
  Hash
} from 'lucide-react';
import axios from 'axios';

interface SuggestionItem {
  id: string;
  title: string;
  url: string;
  description: string;
  keywords: string[];
  trending: boolean;
}

// Mock data - replace with actual API calls
const mockSuggestions: SuggestionItem[] = [
  {
    id: '1',
    title: 'The Future of Artificial Intelligence in 2024',
    url: 'https://example.com/ai-future-2024',
    description: 'Explore the latest trends and developments in AI technology',
    keywords: ['AI', 'technology', 'future', 'innovation'],
    trending: true
  },
  {
    id: '2',
    title: 'Complete Guide to Remote Work Productivity',
    url: 'https://example.com/remote-work-guide',
    description: 'Tips and strategies for maximizing productivity while working from home',
    keywords: ['remote work', 'productivity', 'work from home', 'tips'],
    trending: false
  },
  {
    id: '3',
    title: 'Sustainable Living: Small Changes, Big Impact',
    url: 'https://example.com/sustainable-living',
    description: 'Simple ways to reduce your environmental footprint',
    keywords: ['sustainability', 'environment', 'green living', 'eco-friendly'],
    trending: true
  },
  {
    id: '4',
    title: 'Digital Marketing Trends for Small Businesses',
    url: 'https://example.com/digital-marketing-trends',
    description: 'Latest marketing strategies that work for small business owners',
    keywords: ['digital marketing', 'small business', 'social media', 'SEO'],
    trending: false
  },
  {
    id: '5',
    title: 'Mental Health in the Digital Age',
    url: 'https://example.com/mental-health-digital',
    description: 'Understanding the impact of technology on mental wellness',
    keywords: ['mental health', 'digital wellness', 'technology', 'wellbeing'],
    trending: true
  }
];

export const Suggestions: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState<SuggestionItem[]>(mockSuggestions);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    try {
      const response = await axios.get('http://localhost:5000/suggest-titles', {
        params: {
          query: searchQuery,
          num_results: 5
        }
      });
      setSuggestions(response.data.titles.map((item: any, idx: number) => ({
        id: idx.toString(),
        title: item.title,
        url: item.link,
        description: '',
        keywords: [],
        trending: false
      })));
    } catch (error: any) {
      alert('Error fetching suggestions: ' + (error.response?.data?.error || error.message));
      setSuggestions([]);
    }
    setIsSearching(false);
  };

  const handleUseTitle = (title: string, keywords: string[]) => {
    // Store the selected title and keywords in localStorage for the generate page
    localStorage.setItem('selectedTitle', title);
    localStorage.setItem('selectedKeywords', keywords.join(', '));
  };

  return (
    <div className="space-y-6">
      <div className="card">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">
      🔮 Suggested Blog Titles
</h1>

        <p className="text-gray-600">
          Discover trending blog topics and title ideas from live web searches
        </p>
      </div>

      {/* Search Section */}
      <div className="card">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search for blog ideas... (e.g., 'AI trends', 'productivity tips')"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full input-field"
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
          </div>
          <button
            onClick={handleSearch}
            disabled={isSearching || !searchQuery.trim()}
            className="btn-primary flex items-center space-x-2"
          >
            {isSearching ? (
              <div className="loading-spinner"></div>
            ) : (
              <Search className="w-4 h-4" />
            )}
            <span>{isSearching ? 'Searching...' : 'Search'}</span>
          </button>
        </div>
      </div>

      {/* Suggestions List */}
      <div className="space-y-4">
        {suggestions.length === 0 ? (
          <div className="card text-center py-12">
            <Lightbulb className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              No suggestions found
            </h3>
            <p className="text-gray-500 mb-6">
              Try searching for different keywords or topics
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSuggestions(mockSuggestions);
              }}
              className="btn-secondary"
            >
              Show All Suggestions
            </button>
          </div>
        ) : (
          suggestions.map((suggestion) => (
            <div key={suggestion.id} className="card hover-lift">
              <div className="flex items-start justify-between">
                <div className="flex-1 space-y-3">
                  <div className="flex items-center space-x-2">
                    <h3 className="text-lg font-semibold text-gray-800">
                      {suggestion.title}
                    </h3>
                    {suggestion.trending && (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                        <TrendingUp className="w-3 h-3 mr-1" />
                        Trending
                      </span>
                    )}
                  </div>
                  
                  <p className="text-gray-600 text-sm">
                    {suggestion.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    {suggestion.keywords.map((keyword) => (
                      <span
                        key={keyword}
                        className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800"
                      >
                        <Hash className="w-3 h-3 mr-1" />
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="flex flex-col space-y-2 ml-4">
                  <Link
                    to="/generate"
                    onClick={() => handleUseTitle(suggestion.title, suggestion.keywords)}
                    className="btn-primary flex items-center space-x-2 text-sm"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Use This Title</span>
                  </Link>
                  <a
                    href={suggestion.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary flex items-center space-x-2 text-sm"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>View Source</span>
                  </a>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Quick Actions */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Popular Search Topics
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {['AI Technology', 'Remote Work', 'Digital Marketing', 'Health & Wellness'].map((topic) => (
            <button
              key={topic}
              onClick={() => {
                setSearchQuery(topic);
                handleSearch();
              }}
              className="btn-secondary text-sm"
            >
              {topic}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};