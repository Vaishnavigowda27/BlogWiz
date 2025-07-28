
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight 
} from 'lucide-react';

const features = [
  {
    icon: () => <span className="text-3xl">🧠</span>,
    title: 'AI-Powered Writing',
    description: 'Generate high-quality blog posts with advanced AI technology'
  },
  {
    icon: () => <span className="text-3xl">🌐</span>,
    title: 'Global Reach',
    description: 'Instantly generate content for readers around the world.'
  },
  {
    icon: () => <span className="text-3xl">📝</span>,
    title: 'Title Suggestions',
    description: 'Get trending title ideas from web searches'
  },
];

const stats = [
  { value: '50+', label: 'Blogs Generated' },
  { value: '3', label: 'Languages' },
  { value: '24/7', label: 'Support' }
];

export const Home: React.FC = () => {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="text-center space-y-8">
        <div className="space-y-4">
          <h1 className="text-5xl md:text-7xl font-bold gradient-text animate-float">
            Write blogs with AI,
            <br />
            <span className="text-blue-600">faster than ever</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">
            Generate blogs and add images — all with one click.
            Transform your ideas into engaging content in minutes.
          </p>
        </div>

        {/* Centered Get Started Button */}
        <div className="flex justify-center">
          <Link
            to="/generate"
            className="btn-primary flex items-center space-x-2 text-lg px-8 py-4"
          >
            <span>Get Started</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Features Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <div key={index} className="card hover-lift text-center space-y-4">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto">
              <feature.icon />
            </div>
            <h3 className="text-xl font-semibold text-gray-800">{feature.title}</h3>
            <p className="text-gray-600">{feature.description}</p>
          </div>
        ))}
      </section>

      {/* Stats Section */}
      <section className="glass rounded-3xl p-8 md:p-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center space-y-2">
              <div className="text-3xl md:text-4xl font-bold gradient-text">
                {stat.value}
              </div>
              <div className="text-gray-600 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center space-y-8 card">
        <div className="space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            Ready to create amazing content?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Whether you're a blogger, student or entrepreneur, 
            BlogCraft helps you craft impactful content — fast.
          </p>
        </div>
        
        {/* Single CTA Button */}
        <div className="flex justify-center">
          <Link
            to="/generate"
            className="btn-primary flex items-center space-x-2 text-lg px-8 py-4"
          >
            <span>Start Writing Now</span>
          </Link>
        </div>
      </section>
    </div>
  );
};
