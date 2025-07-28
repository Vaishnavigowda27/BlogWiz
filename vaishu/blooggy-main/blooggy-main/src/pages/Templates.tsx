
import React from 'react';
import { Link } from 'react-router-dom';

interface Template {
  id: string;
  title: string;
  description: string;
  structure: string;
  tone: string;
  keywords: string[];
  popular: boolean;
}

const templates: Template[] = [
  {
    id: '1',
    title: 'How-To Guide',
    description: 'Step-by-step tutorials and instructional content',
    structure: 'Introduction, Step 1, Step 2, Step 3, Tips, Conclusion',
    tone: 'Professional',
    keywords: ['tutorial', 'guide', 'how to', 'steps'],
    popular: true
  },
  {
    id: '2',
    title: 'Top 10 List',
    description: 'Curated lists of the best tools, tips, or resources',
    structure: 'Introduction, Item 1-10 with descriptions, Conclusion',
    tone: 'Engaging',
    keywords: ['top 10', 'best', 'list', 'recommendations'],
    popular: true
  },
  {
    id: '3',
    title: 'Personal Story',
    description: 'Share experiences and lessons learned',
    structure: 'Background, Challenge, Journey, Lesson, Takeaway',
    tone: 'Personal',
    keywords: ['story', 'experience', 'journey', 'lessons'],
    popular: false
  },
  {
    id: '4',
    title: 'Opinion Piece',
    description: 'Share your thoughts on trending topics',
    structure: 'Introduction, Current Situation, My Opinion, Evidence, Conclusion',
    tone: 'Persuasive',
    keywords: ['opinion', 'thoughts', 'perspective', 'analysis'],
    popular: false
  },
  {
    id: '5',
    title: 'Product Review',
    description: 'Detailed analysis of products or services',
    structure: 'Overview, Features, Pros, Cons, Verdict, Rating',
    tone: 'Analytical',
    keywords: ['review', 'product', 'analysis', 'rating'],
    popular: true
  },
  {
    id: '6',
    title: 'Industry Trends',
    description: 'Analysis of current trends and future predictions',
    structure: 'Current State, Emerging Trends, Impact, Future Outlook',
    tone: 'Professional',
    keywords: ['trends', 'industry', 'analysis', 'future'],
    popular: true
  },
  {
    id: '7',
    title: 'Case Study',
    description: 'Deep dive into successful projects or strategies',
    structure: 'Background, Challenge, Solution, Results, Lessons',
    tone: 'Professional',
    keywords: ['case study', 'success', 'strategy', 'results'],
    popular: false
  },
  {
    id: '8',
    title: 'Tips & Tricks',
    description: 'Quick and actionable advice for your audience',
    structure: 'Introduction, Tip 1, Tip 2, Tip 3, Bonus Tips, Conclusion',
    tone: 'Helpful',
    keywords: ['tips', 'tricks', 'advice', 'hacks'],
    popular: true
  }
];

export const Templates: React.FC = () => {
  const handleSelectTemplate = (template: Template) => {
    localStorage.setItem('selectedTemplate', JSON.stringify({
      title: `${template.title} - [Your Topic Here]`,
      structure: template.structure,
      tone: template.tone,
      keywords: template.keywords.join(', ')
    }));
  };

  const popularTemplates = templates.filter(t => t.popular);
  const otherTemplates = templates.filter(t => !t.popular);

  const renderTemplateCard = (template: Template, isPrimary: boolean) => (
    <div key={template.id} className="card hover-lift">
      <div className="space-y-4">
        <div className="flex flex-col">
          <h3 className="text-lg font-semibold text-gray-800">
            {template.title}
          </h3>
          <p className="text-gray-600 text-sm mb-3">
            {template.description}
          </p>
        </div>

        <div className="space-y-2">
          <div className="text-sm">
            <span className="font-medium text-gray-700">Structure:</span>
            <p className="text-gray-600 mt-1">{template.structure}</p>
          </div>
          <div className="text-sm">
            <span className="font-medium text-gray-700">Tone:</span>
            <span className="text-gray-600 ml-2">{template.tone}</span>
          </div>
        </div>

        <div className="bg-white pt-4">
          <Link
            to="/generate"
            onClick={() => handleSelectTemplate(template)}
            className={isPrimary ? "btn-primary w-full text-center" : "btn-secondary w-full text-center"}
          >
            Use This Template
          </Link>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="card">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
        🗂️ Templates Gallery
        </h1>
        <p className="text-gray-600">
          Choose from pre-designed templates to quickly create structured content
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">
          Popular Templates
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {popularTemplates.map((template) => renderTemplateCard(template, true))}
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">
          More Templates
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {otherTemplates.map((template) => renderTemplateCard(template, false))}
        </div>
      </div>
    </div>
  );
};
