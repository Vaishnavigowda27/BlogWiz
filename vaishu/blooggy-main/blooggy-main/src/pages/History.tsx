import React, { useState } from 'react';
import { useBlog } from '../context/BlogContext';
import { 
  History as HistoryIcon, 
  Eye, 
  Download, 
  Trash2, 
  Search,
  Calendar,
  Tag,
  FileText
} from 'lucide-react';

export const History: React.FC = () => {
  const { blogs, deleteBlog, setCurrentBlog } = useBlog();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBlog, setSelectedBlog] = useState<string | null>(null);

  const filteredBlogs = blogs.filter(blog =>
    blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    blog.keywords.some(keyword => keyword.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleViewBlog = (blogId: string) => {
    setSelectedBlog(selectedBlog === blogId ? null : blogId);
  };

  const handleDownload = (blog: any) => {
    const element = document.createElement('a');
    const file = new Blob([blog.content], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `${blog.title}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-6">
      <div className="card">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">
      🕰️ Blog History
</h1>

        <p className="text-gray-600">View and manage your previously generated blog posts</p>
      </div>

      {/* Search Bar */}
      <div className="card">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search blogs by title or keywords..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 input-field"
          />
        </div>
      </div>

      {/* Blog List */}
      {filteredBlogs.length === 0 ? (
        <div className="card text-center py-12">
          <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-600 mb-2">
            {searchTerm ? 'No blogs found' : 'No blogs yet'}
          </h3>
          <p className="text-gray-500 mb-6">
            {searchTerm 
              ? 'Try adjusting your search terms' 
              : 'Start writing your first blog post!'
            }
          </p>
          <button
            onClick={() => window.location.href = '/generate'}
            className="btn-primary"
          >
            Generate Now
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredBlogs.map((blog) => (
            <div key={blog.id} className="card hover-lift">
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {blog.title}
                  </h3>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {blog.keywords.slice(0, 3).map((keyword) => (
                      <span
                        key={keyword}
                        className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800"
                      >
                        <Tag className="w-3 h-3 mr-1" />
                        {keyword}
                      </span>
                    ))}
                    {blog.keywords.length > 3 && (
                      <span className="text-xs text-gray-500">
                        +{blog.keywords.length - 3} more
                      </span>
                    )}
                  </div>
                  <div className="flex items-center text-sm text-gray-500 mb-4">
                    <Calendar className="w-4 h-4 mr-1" />
                    {formatDate(blog.createdAt)}
                    <span className="mx-2">•</span>
                    <span className="capitalize">{blog.tone}</span>
                    <span className="mx-2">•</span>
                    <span>{blog.wordCount} words</span>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <button
                    onClick={() => handleViewBlog(blog.id)}
                    className="btn-secondary flex items-center space-x-2 flex-1"
                  >
                    <Eye className="w-4 h-4" />
                    <span>{selectedBlog === blog.id ? 'Hide' : 'View'}</span>
                  </button>
                  <button
                    onClick={() => handleDownload(blog)}
                    className="btn-secondary flex items-center space-x-2"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => deleteBlog(blog.id)}
                    className="btn-secondary flex items-center space-x-2 text-red-600 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                {selectedBlog === blog.id && (
                  <div className="border-t pt-4">
                    <div
                      className="prose max-w-none text-sm"
                      dangerouslySetInnerHTML={{
                        __html: blog.content
                          .replace(/\n/g, '<br>')
                          .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                          .replace(/^# (.*$)/gm, '<h3 class="text-lg font-semibold mb-2">$1</h3>')
                          .replace(/^## (.*$)/gm, '<h4 class="text-md font-medium mb-2">$1</h4>')
                      }}
                    />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};