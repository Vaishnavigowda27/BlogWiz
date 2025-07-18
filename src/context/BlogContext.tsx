import React, { createContext, useContext, useState, useEffect } from 'react';

interface BlogPost {
  id: string;
  title: string;
  content: string;
  translatedContent?: string;
  language: string;
  keywords: string[];
  tone: string;
  wordCount: number;
  createdAt: Date;
  images: string[];
}

interface BlogSettings {
  defaultLanguage: string;
  defaultTone: string;
  preferredFont: string;
  fontSize: number;
  maxImages: number;
}

interface BlogContextType {
  blogs: BlogPost[];
  settings: BlogSettings;
  addBlog: (blog: Omit<BlogPost, 'id' | 'createdAt'>) => void;
  deleteBlog: (id: string) => void;
  updateSettings: (settings: Partial<BlogSettings>) => void;
  currentBlog: BlogPost | null;
  setCurrentBlog: (blog: BlogPost | null) => void;
  isGenerating: boolean;
  setIsGenerating: (generating: boolean) => void;
}

const defaultSettings: BlogSettings = {
  defaultLanguage: 'en',
  defaultTone: 'Professional',
  preferredFont: 'Inter',
  fontSize: 16,
  maxImages: 3,
};

const BlogContext = createContext<BlogContextType | undefined>(undefined);

export const BlogProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [settings, setSettings] = useState<BlogSettings>(defaultSettings);
  const [currentBlog, setCurrentBlog] = useState<BlogPost | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedBlogs = localStorage.getItem('blogcraft_blogs');
    const savedSettings = localStorage.getItem('blogcraft_settings');
    
    if (savedBlogs) {
      try {
        const parsedBlogs = JSON.parse(savedBlogs);
        setBlogs(parsedBlogs.map((blog: any) => ({
          ...blog,
          createdAt: new Date(blog.createdAt)
        })));
      } catch (error) {
        console.error('Error parsing saved blogs:', error);
      }
    }
    
    if (savedSettings) {
      try {
        setSettings(JSON.parse(savedSettings));
      } catch (error) {
        console.error('Error parsing saved settings:', error);
      }
    }
  }, []);

  // Save blogs to localStorage whenever blogs change
  useEffect(() => {
    localStorage.setItem('blogcraft_blogs', JSON.stringify(blogs));
  }, [blogs]);

  // Save settings to localStorage whenever settings change
  useEffect(() => {
    localStorage.setItem('blogcraft_settings', JSON.stringify(settings));
  }, [settings]);

  const addBlog = (blogData: Omit<BlogPost, 'id' | 'createdAt'>) => {
    const newBlog: BlogPost = {
      ...blogData,
      id: Date.now().toString(),
      createdAt: new Date(),
    };
    setBlogs(prev => [newBlog, ...prev]);
    setCurrentBlog(newBlog);
  };

  const deleteBlog = (id: string) => {
    setBlogs(prev => prev.filter(blog => blog.id !== id));
    if (currentBlog?.id === id) {
      setCurrentBlog(null);
    }
  };

  const updateSettings = (newSettings: Partial<BlogSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  return (
    <BlogContext.Provider value={{
      blogs,
      settings,
      addBlog,
      deleteBlog,
      updateSettings,
      currentBlog,
      setCurrentBlog,
      isGenerating,
      setIsGenerating,
    }}>
      {children}
    </BlogContext.Provider>
  );
};

export const useBlog = () => {
  const context = useContext(BlogContext);
  if (context === undefined) {
    throw new Error('useBlog must be used within a BlogProvider');
  }
  return context;
};