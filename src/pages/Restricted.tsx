import React from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle, ArrowLeft, Shield } from 'lucide-react';

export const Restricted: React.FC = () => {
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="card text-center py-12">
        <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <AlertTriangle className="w-10 h-10 text-red-600" />
        </div>
        
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Content Restricted
        </h1>
        
        <p className="text-lg text-gray-600 mb-6">
          Oops! This topic includes restricted content that cannot be generated.
        </p>
        
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <div className="flex items-start space-x-3">
            <Shield className="w-5 h-5 text-red-600 mt-0.5" />
            <div className="text-sm text-red-700">
              <p className="font-medium mb-1">Why is this content restricted?</p>
              <p>
                Our AI assistant follows strict content policies to ensure safe and appropriate content generation. 
                Topics related to explicit content, violence, harassment, or harmful activities are automatically blocked.
              </p>
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">
            Suggestions to get unblocked:
          </h3>
          <ul className="text-left space-y-2 text-gray-600">
            <li className="flex items-start space-x-2">
              <span className="text-blue-600">•</span>
              <span>Reword your topic to focus on educational or informational aspects</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-blue-600">•</span>
              <span>Use more neutral language in your keywords</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-blue-600">•</span>
              <span>Choose a different topic that aligns with our content policies</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-blue-600">•</span>
              <span>Try our template gallery for inspiration</span>
            </li>
          </ul>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <Link
            to="/generate"
            className="btn-primary flex items-center space-x-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Go Back to Generate</span>
          </Link>
          <Link
            to="/templates"
            className="btn-secondary flex items-center space-x-2"
          >
            <span>Browse Templates</span>
          </Link>
        </div>
      </div>
    </div>
  );
};