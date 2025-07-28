import React, { useState } from 'react';
import { useBlog } from '../context/BlogContext';
import { 
  Settings as SettingsIcon, 
  Save, 
  Globe, 
  Type, 
  Palette,
  Image as ImageIcon
} from 'lucide-react';

const languages = [
  { code: 'en', name: 'English' },
  { code: 'hi', name: 'Hindi' },
  { code: 'kn', name: 'Kannada' },
  { code: 'es', name: 'Spanish' },
  { code: 'fr', name: 'French' },
  { code: 'de', name: 'German' }
];

const tones = ['Professional', 'Casual', 'Friendly', 'Persuasive', 'Witty', 'Formal'];
const fonts = ['Inter', 'Poppins', 'Nunito', 'Roboto', 'Playfair Display', 'Montserrat'];

export const Settings: React.FC = () => {
  const { settings, updateSettings } = useBlog();
  const [formData, setFormData] = useState(settings);
  const [saved, setSaved] = useState(false);

  const handleChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    updateSettings(formData);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="card">
      <h1 className="text-3xl font-bold text-gray-800 mb-2 flex items-center">
  🔧 Settings
</h1>

        <p className="text-gray-600">Configure your default writing preferences</p>
      </div>

      <div className="card space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Globe className="w-4 h-4 inline mr-1" />
            Default Language
          </label>
          <select
            value={formData.defaultLanguage}
            onChange={(e) => handleChange('defaultLanguage', e.target.value)}
            className="w-full input-field"
          >
            {languages.map(lang => (
              <option key={lang.code} value={lang.code}>{lang.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Palette className="w-4 h-4 inline mr-1" />
            Default Blog Tone
          </label>
          <select
            value={formData.defaultTone}
            onChange={(e) => handleChange('defaultTone', e.target.value)}
            className="w-full input-field"
          >
            {tones.map(tone => (
              <option key={tone} value={tone}>{tone}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Type className="w-4 h-4 inline mr-1" />
            Preferred Font
          </label>
          <select
            value={formData.preferredFont}
            onChange={(e) => handleChange('preferredFont', e.target.value)}
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
            onChange={(e) => handleChange('fontSize', parseInt(e.target.value))}
            className="w-full accent-blue-600"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>12px</span>
            <span>24px</span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <ImageIcon className="w-4 h-4 inline mr-1" />
            Maximum Images per Blog
          </label>
          <input
            type="number"
            min="0"
            max="10"
            value={formData.maxImages}
            onChange={(e) => handleChange('maxImages', parseInt(e.target.value))}
            className="w-full input-field"
          />
        </div>

        <div className="pt-4 border-t">
          <button
            onClick={handleSave}
            className={`w-full flex items-center justify-center space-x-2 py-3 px-4 rounded-lg font-medium transition-all ${
              saved 
                ? 'bg-green-500 text-white' 
                : 'btn-primary'
            }`}
          >
            <Save className="w-5 h-5" />
            <span>{saved ? 'Saved!' : 'Save Preferences'}</span>
          </button>
        </div>
      </div>

      <div className="card">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Preview</h3>
        <div 
          style={{
            fontFamily: formData.preferredFont,
            fontSize: `${formData.fontSize}px`,
            lineHeight: '1.6'
          }}
          className="p-4 bg-gray-50 rounded-lg"
        >
          <h4 className="font-bold mb-2">Sample Blog Title</h4>
          <p className="text-gray-700">
            This is how your blog content will appear with the selected font and size settings. 
            The text will be rendered in <strong>{formData.preferredFont}</strong> at {formData.fontSize}px size.
          </p>
        </div>
      </div>
    </div>
  );
};