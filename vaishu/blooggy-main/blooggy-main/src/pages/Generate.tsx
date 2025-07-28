import React, { useState, useEffect } from 'react';
import { useBlog } from '../context/BlogContext';
import { 
  Sparkles, 
  Download, 
  Eye, 
  Settings as SettingsIcon,
  Wand2,
  Globe,
  Type,
  Palette,
  Hash,
  FileText,
  Image as ImageIcon,
  Search
} from 'lucide-react';
import axios from 'axios';

const tones = ['Professional', 'Casual', 'Friendly', 'Persuasive', 'Witty', 'Formal'];
const fonts = ['Inter', 'Poppins', 'Nunito', 'Roboto', 'Playfair Display', 'Montserrat'];
const languages = [
  { code: 'English', name: 'English' },
  { code: 'Hindi', name: 'Hindi' },
  { code: 'Kannada', name: 'Kannada' }
];


// Restricted content keywords
const RESTRICTED_TOPICS = [
  'sexual content', 'sex', 'rape', 'harassment', 'porn', 'pornography',
  'sexual assault', 'sexual violence', 'nudity', 'explicit content',
  'sexual abuse', 'child abuse', 'molestation', 'incest', 'xxx',
  'adult content', 'erotic', 'nsfw', 'prostitution', 'brothel'
];

const containsRestrictedContent = (text: string): boolean => {
  if (!text) return false;
  const textLower = text.toLowerCase();
  return RESTRICTED_TOPICS.some(topic => textLower.includes(topic));
};

export const Generate: React.FC = () => {
  const { addBlog, settings, isGenerating, setIsGenerating } = useBlog();
  const [formData, setFormData] = useState({
    language: settings.defaultLanguage,
    title: '',
    keywords: '',
    structure: '',
    tone: settings.defaultTone,
    wordCount: 500,
    fontSize: settings.fontSize,
    fontStyle: settings.preferredFont,
    numImages: 2
  });
  const [generatedContent, setGeneratedContent] = useState('');
  const [generatedImages, setGeneratedImages] = useState<string[]>([]);
  const [showPreview, setShowPreview] = useState(false);

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const generateBlog = async () => {
    if (!formData.language || !formData.title || !formData.keywords) {
      alert('Please select language and provide both title and keywords');
      return;
    }

    // Check for restricted content
    if (containsRestrictedContent(formData.title) || containsRestrictedContent(formData.keywords)) {
      alert('This topic contains restricted content and cannot be generated. Please choose a different topic.');
      return;
    }

    setIsGenerating(true);
    setShowPreview(true);

    try {
      // Call backend API for blog generation
      const response = await axios.post('http://localhost:5000/generate-blog', {
        blog_title: formData.title,
        keywords: formData.keywords,
        num_words: formData.wordCount,
        num_images: formData.numImages,
        custom_structure: formData.structure,
        tone: formData.tone,
        lang: formData.language,
        font_style: formData.fontStyle,
        font_size: formData.fontSize
      });
      setGeneratedContent(response.data.blog_display);

      // Call backend API for images
      if (formData.numImages > 0) {
        const imgRes = await axios.get('http://localhost:5000/fetch-images', {
          params: {
            query: formData.title,
            num_images: formData.numImages
          }
        });
        setGeneratedImages(imgRes.data.images || []);
      } else {
        setGeneratedImages([]);
      }

      // Save to blog history
      addBlog({
        title: formData.title,
        content: response.data.blog_display,
        language: formData.language,
        keywords: formData.keywords.split(',').map(k => k.trim()),
        tone: formData.tone,
        wordCount: formData.wordCount,
        images: generatedImages
      });
    } catch (error: any) {
      alert('Error generating blog: ' + (error.response?.data?.error || error.message));
      setGeneratedContent('');
      setGeneratedImages([]);
    }
    setIsGenerating(false);
  };

  const generateTopicImages = async (title: string, keywords: string, numImages: number) => {
    try {
      // Check for restricted content in image generation
      if (containsRestrictedContent(title) || containsRestrictedContent(keywords)) {
        setGeneratedImages([]);
        return;
      }

      // Create more specific search queries
      const titleWords = title.toLowerCase().split(' ');
      const keywordList = keywords.split(',').map(k => k.trim().toLowerCase());
      
      const imagePromises = Array.from({ length: numImages }, async (_, index) => {
        // Use different search terms for variety
        let searchTerm = '';
        if (index === 0) {
          searchTerm = titleWords.join(' ');
        } else if (keywordList[index - 1]) {
          searchTerm = keywordList[index - 1];
        } else {
          searchTerm = titleWords[index % titleWords.length] || 'business';
        }

        const imageIds = getImageIdsForTopic(searchTerm);
        const randomId = imageIds[Math.floor(Math.random() * imageIds.length)];
        
        return `https://images.pexels.com/photos/${randomId}/pexels-photo-${randomId}.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop`;
      });
      
      const images = await Promise.all(imagePromises);
      setGeneratedImages(images);
    } catch (error) {
      console.error('Error generating images:', error);
      setGeneratedImages([]);
    }
  };

  const getImageIdsForTopic = (searchTerm: string): number[] => {
    // Enhanced mapping with more specific topics and real Pexels image IDs
    const topicImageMap: { [key: string]: number[] } = {
      // Education & College
      'college': [1205651, 207692, 289737, 1454360, 1438081, 256490, 159844, 267885],
      'university': [1205651, 207692, 289737, 1454360, 1438081, 256490, 159844, 267885],
      'education': [289737, 1454360, 1438081, 5212345, 3184418, 256490, 159844],
      'school': [289737, 1454360, 1438081, 5212345, 3184418, 256490, 159844],
      'student': [1205651, 289737, 1454360, 256490, 159844, 267885],
      'campus': [1205651, 289737, 1454360, 256490, 159844, 267885],
      'sjce': [1205651, 289737, 1454360, 256490, 159844, 267885], // College images for SJCE
      
      // Technology
      'technology': [373543, 4164418, 1181467, 3861969, 2599244, 325229, 577585],
      'computer': [373543, 4164418, 1181467, 325229, 577585, 2599244],
      'software': [373543, 4164418, 1181467, 325229, 577585, 2599244],
      'programming': [373543, 4164418, 1181467, 325229, 577585, 2599244],
      'coding': [373543, 4164418, 1181467, 325229, 577585, 2599244],
      'ai': [373543, 4164418, 1181467, 3861969, 2599244, 325229],
      'artificial intelligence': [373543, 4164418, 1181467, 3861969, 2599244],
      
      // Business
      'business': [3184465, 3184418, 3184419, 3184420, 3184421, 416405, 590016],
      'marketing': [265087, 265088, 265089, 265090, 265091, 590016, 416405],
      'finance': [3483098, 3483099, 3483100, 3483101, 3483102, 416405, 590016],
      'startup': [3184465, 3184418, 416405, 590016, 3184419],
      'entrepreneur': [3184465, 3184418, 416405, 590016, 3184419],
      
      // Health & Wellness
      'health': [40568, 40569, 40570, 40571, 40572, 3768916, 1640777],
      'fitness': [841130, 841131, 841132, 841133, 841134, 3768916, 1640777],
      'wellness': [3768916, 1640777, 40568, 40569, 40570],
      'medical': [40568, 40569, 40570, 3768916, 1640777],
      
      // Lifestyle
      'food': [376464, 376465, 376466, 376467, 376468, 1640777, 958545],
      'travel': [346885, 346886, 346887, 346888, 346889, 1640777, 958545],
      'lifestyle': [1640777, 1640778, 1640779, 1640780, 1640781, 958545],
      'fashion': [985635, 985636, 985637, 985638, 985639, 1640777],
      
      // Creative
      'art': [1183992, 1183993, 1183994, 1183995, 1183996, 164938, 90946],
      'music': [164938, 164939, 164940, 164941, 164942, 1183992, 90946],
      'photography': [90946, 90947, 90948, 90949, 90950, 1183992, 164938],
      'design': [1183992, 1183993, 90946, 90947, 164938],
      
      // Sports & Activities
      'sports': [863988, 863989, 863990, 863991, 863992, 841130, 3768916],
      'football': [863988, 863989, 863990, 863991, 863992],
      'basketball': [863988, 863989, 863990, 863991, 863992],
      'cricket': [863988, 863989, 863990, 863991, 863992],
      
      // Nature & Environment
      'nature': [147411, 147412, 147413, 147414, 147415, 346885, 958545],
      'environment': [147411, 147412, 147413, 147414, 147415, 346885],
      'green': [147411, 147412, 147413, 147414, 147415],
      'sustainability': [147411, 147412, 147413, 346885, 958545],
      
      // Science
      'science': [2280549, 2280550, 2280551, 2280552, 2280553, 373543, 325229],
      'research': [2280549, 2280550, 2280551, 289737, 1454360],
      'laboratory': [2280549, 2280550, 2280551, 2280552, 2280553],
      'experiment': [2280549, 2280550, 2280551, 2280552, 2280553]
    };
    
    // Find the best matching topic
    for (const [topic, ids] of Object.entries(topicImageMap)) {
      if (searchTerm.includes(topic)) {
        return ids;
      }
    }
    
    // Check for partial matches
    for (const [topic, ids] of Object.entries(topicImageMap)) {
      if (topic.includes(searchTerm) || searchTerm.includes(topic)) {
        return ids;
      }
    }
    
    // Default professional images
    return [3184465, 3184418, 416405, 590016, 373543, 4164418];
  };
  const downloadBlog = () => {
    const element = document.createElement('a');
    const file = new Blob([generatedContent], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `${formData.title}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Left Panel - Generation Form */}
      <div className="space-y-6">
        <div className="card">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
        🪄Generate Blog Post
</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Globe className="w-4 h-4 inline mr-1" />
                Language
              </label>
              <select
                value={formData.language}
                onChange={(e) => handleInputChange('language', e.target.value)}
                className="w-full input-field"
              >
                {languages.map(lang => (
                  <option key={lang.code} value={lang.code}>{lang.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <FileText className="w-4 h-4 inline mr-1" />
                Blog Title
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                className="w-full input-field"
                placeholder="Enter your blog title..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Hash className="w-4 h-4 inline mr-1" />
                Keywords (comma separated)
              </label>
              <textarea
                value={formData.keywords}
                onChange={(e) => handleInputChange('keywords', e.target.value)}
                className="w-full input-field h-20 resize-none"
                placeholder="AI, technology, innovation, future..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Blog Structure (optional)
              </label>
              <textarea
                value={formData.structure}
                onChange={(e) => handleInputChange('structure', e.target.value)}
                className="w-full input-field h-20 resize-none"
                placeholder="Introduction, Main Points, Conclusion..."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Palette className="w-4 h-4 inline mr-1" />
                  Tone & Style
                </label>
                <select
                  value={formData.tone}
                  onChange={(e) => handleInputChange('tone', e.target.value)}
                  className="w-full input-field"
                >
                  {tones.map(tone => (
                    <option key={tone} value={tone}>{tone}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <ImageIcon className="w-4 h-4 inline mr-1" />
                  Number of Images
                </label>
                <input
                  type="number"
                  min="0"
                  max="5"
                  value={formData.numImages}
                  onChange={(e) => handleInputChange('numImages', parseInt(e.target.value))}
                  className="w-full input-field"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Word Count: {formData.wordCount}
              </label>
              <input
                type="range"
                min="250"
                max="1000"
                step="50"
                value={formData.wordCount}
                onChange={(e) => handleInputChange('wordCount', parseInt(e.target.value))}
                className="w-full accent-blue-600"
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>250</span>
                <span>1000</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Type className="w-4 h-4 inline mr-1" />
                  Font Style
                </label>
                <select
                  value={formData.fontStyle}
                  onChange={(e) => handleInputChange('fontStyle', e.target.value)}
                  className="w-full input-field"
                >
                  {fonts.map(font => (
                    <option key={font} value={font}>{font}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Font Size: {formData.fontSize}px
                </label>
                <input
                  type="range"
                  min="12"
                  max="24"
                  value={formData.fontSize}
                  onChange={(e) => handleInputChange('fontSize', parseInt(e.target.value))}
                  className="w-full accent-blue-600"
                />
              </div>
            </div>

            <button
              onClick={generateBlog}
              disabled={isGenerating}
              className="w-full btn-primary flex items-center justify-center space-x-2 py-3"
            >
              {isGenerating ? (
                <>
                  <div className="loading-spinner"></div>
                  <span>Generating...</span>
                </>
              ) : (
                <span>Generate Blog</span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Right Panel - Preview */}
      <div className="space-y-6">
        {showPreview && (
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-gray-800 flex items-center">
                <Eye className="w-5 h-5 mr-2" />
                Preview
              </h3>
              {generatedContent && (
                <button
                  onClick={downloadBlog}
                  className="btn-secondary flex items-center space-x-2"
                >
                  <Download className="w-4 h-4" />
                  <span>Download</span>
                </button>
              )}
            </div>
            
            <div className="prose max-w-none">
              {isGenerating ? (
                <div className="space-y-4">
                  <div className="animate-pulse">
                    <div className="h-6 bg-gray-200 rounded mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded"></div>
                  </div>
                </div>
              ) : generatedContent ? (
                <>
                  <div 
                    style={{
                      fontFamily: formData.fontStyle,
                      fontSize: `${formData.fontSize}px`,
                      lineHeight: '1.6'
                    }}
                    className="prose prose-blue max-w-none"
                  >
                    <h1 className="text-3xl font-bold mb-6 text-blue-600 border-b-2 border-blue-200 pb-2">
                      {formData.title}
                    </h1>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: generatedContent
                          .replace(/\n/g, '<br>')
                          .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                          .replace(/^#{1,6}\s*/gm, '')
                      }}
                    />
                  </div>
                  
                  {/* Generated Images */}
                  {generatedImages.length > 0 && (
                    <div className="mt-8">
                      <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                        <ImageIcon className="w-5 h-5 mr-2" />
                        Related Images
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {generatedImages.map((imageUrl, index) => (
                          <div key={index} className="relative group">
                            <img
                              src={imageUrl}
                              alt={`Related to ${formData.title} - Image ${index + 1}`}
                              className="w-full h-48 object-cover rounded-lg shadow-md group-hover:shadow-lg transition-shadow"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all rounded-lg flex items-center justify-center">
                              <button
                                onClick={() => {
                                  const link = document.createElement('a');
                                  link.href = imageUrl;
                                  link.download = `${formData.title}_image_${index + 1}.jpg`;
                                  link.target = '_blank';
                                  document.body.appendChild(link);
                                  link.click();
                                  document.body.removeChild(link);
                                }}
                                className="opacity-0 group-hover:opacity-100 transition-opacity bg-white text-gray-800 px-3 py-2 rounded-lg shadow-md hover:shadow-lg"
                              >
                                <Download className="w-4 h-4 inline mr-1" />
                                Download
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-12 text-gray-500">
                  <Sparkles className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                  <p>Your generated blog will appear here</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};