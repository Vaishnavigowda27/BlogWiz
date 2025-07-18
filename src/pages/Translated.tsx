import React, { useState } from 'react';
import { useBlog } from '../context/BlogContext';
import { Languages, Download, Eye, ArrowLeftRight } from 'lucide-react';

export const Translated: React.FC = () => {
  const { currentBlog } = useBlog();
  const [viewMode, setViewMode] = useState<'horizontal' | 'vertical'>('horizontal');
  const [showTranslation, setShowTranslation] = useState(true);

  const handleDownload = (content: string, filename: string) => {
    const element = document.createElement('a');
    const file = new Blob([content], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = filename;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  if (!currentBlog) {
    return (
      <div className="space-y-6">
        <div className="card">
          <h1 className="text-3xl font-bold text-gray-800 mb-2 flex items-center">
            <Languages className="w-8 h-8 mr-3 text-blue-600" />
            Translation Preview
          </h1>
          <p className="text-gray-600">
            View your blog posts in multiple languages side by side
          </p>
        </div>

        <div className="card text-center py-12">
          <Languages className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-600 mb-2">
            No blog selected
          </h3>
          <p className="text-gray-500 mb-6">
            Generate a blog post first to see the translation preview
          </p>
          <button
            onClick={() => window.location.href = '/generate'}
            className="btn-primary"
          >
            Generate Blog
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="card">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2 flex items-center">
              <Languages className="w-8 h-8 mr-3 text-blue-600" />
              Translation Preview
            </h1>
            <p className="text-gray-600">
              Comparing: {currentBlog.title}
            </p>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setViewMode('horizontal')}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  viewMode === 'horizontal' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Side by Side
              </button>
              <button
                onClick={() => setViewMode('vertical')}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  viewMode === 'vertical' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Stacked
              </button>
            </div>
            
            <button
              onClick={() => setShowTranslation(!showTranslation)}
              className="btn-secondary flex items-center space-x-2"
            >
              <Eye className="w-4 h-4" />
              <span>{showTranslation ? 'Hide' : 'Show'} Translation</span>
            </button>
          </div>
        </div>
      </div>

      {/* Content Display */}
      <div className={`grid gap-6 ${viewMode === 'horizontal' ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1'}`}>
        {/* Original Content */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-800 flex items-center">
              <span className="w-4 h-4 bg-blue-600 rounded-full mr-2"></span>
              Original (English)
            </h2>
            <button
              onClick={() => handleDownload(currentBlog.content, `${currentBlog.title}_English.txt`)}
              className="btn-secondary flex items-center space-x-2"
            >
              <Download className="w-4 h-4" />
              <span>Download</span>
            </button>
          </div>
          
          <div className="prose max-w-none">
            <div
              dangerouslySetInnerHTML={{
                __html: currentBlog.content
                  .replace(/\n/g, '<br>')
                  .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                  .replace(/^# (.*$)/gm, '<h1 class="text-2xl font-bold mb-4">$1</h1>')
                  .replace(/^## (.*$)/gm, '<h2 class="text-xl font-semibold mb-3">$1</h2>')
              }}
            />
          </div>
        </div>

        {/* Translated Content */}
        {showTranslation && (
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                <span className="w-4 h-4 bg-purple-600 rounded-full mr-2"></span>
                Translated ({currentBlog.language})
              </h2>
              <button
                onClick={() => handleDownload(
                  currentBlog.translatedContent || currentBlog.content,
                  `${currentBlog.title}_${currentBlog.language}.txt`
                )}
                className="btn-secondary flex items-center space-x-2"
              >
                <Download className="w-4 h-4" />
                <span>Download</span>
              </button>
            </div>
            
            <div className="prose max-w-none">
              {currentBlog.translatedContent ? (
                <div
                  dangerouslySetInnerHTML={{
                    __html: currentBlog.translatedContent
                      .replace(/\n/g, '<br>')
                      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                      .replace(/^# (.*$)/gm, '<h1 class="text-2xl font-bold mb-4">$1</h1>')
                      .replace(/^## (.*$)/gm, '<h2 class="text-xl font-semibold mb-3">$1</h2>')
                  }}
                />
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <ArrowLeftRight className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                  <p>Translation not available</p>
                  <p className="text-sm">Generate a new blog with translation enabled</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="card">
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => window.location.href = '/generate'}
            className="btn-primary flex items-center space-x-2"
          >
            <Languages className="w-4 h-4" />
            <span>Generate New Translation</span>
          </button>
          <button
            onClick={() => window.location.href = '/history'}
            className="btn-secondary flex items-center space-x-2"
          >
            <Eye className="w-4 h-4" />
            <span>View All Blogs</span>
          </button>
        </div>
      </div>
    </div>
  );
};