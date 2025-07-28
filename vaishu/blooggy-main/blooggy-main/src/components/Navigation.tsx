
// import React from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import { 
//   Home, 
//   PenTool, 
//   History, 
//   Settings, 
//   Lightbulb, 
//   BookOpen 
// } from 'lucide-react';

// const navItems = [
//   { path: '/', icon: Home, label: 'Home' },
//   { path: '/generate', icon: PenTool, label: 'Generate' },
//   { path: '/history', icon: History, label: 'History' },
//   { path: '/templates', icon: BookOpen, label: 'Templates' },
//   { path: '/suggestions', icon: Lightbulb, label: 'Suggestions' },
//   { path: '/settings', icon: Settings, label: 'Settings' },
// ];

// export const Navigation: React.FC = () => {
//   const location = useLocation();

//   return (
//     <nav className="sticky top-0 z-50 glass border-b border-white/20">
//       <div className="container mx-auto px-4">
//         <div className="flex items-center justify-between h-16">
          
//           {/* BlogCraft Title (Logo Removed) */}
//           <Link to="/" className="text-xl font-bold gradient-text">
//           🧙‍♂️ BlogWiz
//           </Link>

//           {/* Navigation Links */}
//           <div className="hidden md:flex items-center space-x-1">
//             {navItems.map((item) => {
//               const isActive = location.pathname === item.path;
//               return (
//                 <Link
//                   key={item.path}
//                   to={item.path}
//                   className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all ${
//                     isActive 
//                       ? 'bg-white/30 text-blue-600 font-medium' 
//                       : 'text-gray-600 hover:bg-white/20 hover:text-blue-600'
//                   }`}
//                 >
//                   <item.icon className="w-4 h-4" />
//                   <span className="text-sm">{item.label}</span>
//                 </Link>
//               );
//             })}
//           </div>

//           {/* Mobile Hamburger */}
//           <div className="md:hidden">
//             <button className="p-2 rounded-lg hover:bg-white/20 transition-colors">
//               <div className="w-6 h-6 flex flex-col justify-center items-center">
//                 <span className="w-4 h-0.5 bg-gray-600 mb-1"></span>
//                 <span className="w-4 h-0.5 bg-gray-600 mb-1"></span>
//                 <span className="w-4 h-0.5 bg-gray-600"></span>
//               </div>
//             </button>
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// };

import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const navItems = [
  { path: '/', label: 'Home' },
  { path: '/generate', label: 'Generate' },
  { path: '/history', label: 'History' },
  { path: '/templates', label: 'Templates' },
  { path: '/suggestions', label: 'Suggestions' },
  { path: '/settings', label: 'Settings' },
];

export const Navigation: React.FC = () => {
  const location = useLocation();

  return (
    <nav className="sticky top-0 z-50 glass border-b border-white/20">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          
          {/* BlogCraft Title (Logo) */}
          <Link to="/" className="text-xl font-bold gradient-text">
            🧙‍♂️ BlogWiz
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-3 py-2 rounded-lg transition-all ${
                    isActive 
                      ? 'bg-white/30 text-blue-600 font-medium' 
                      : 'text-gray-600 hover:bg-white/20 hover:text-blue-600'
                  }`}
                >
                  <span className="text-sm">{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Mobile Hamburger */}
          <div className="md:hidden">
            <button className="p-2 rounded-lg hover:bg-white/20 transition-colors">
              <div className="w-6 h-6 flex flex-col justify-center items-center">
                <span className="w-4 h-0.5 bg-gray-600 mb-1"></span>
                <span className="w-4 h-0.5 bg-gray-600 mb-1"></span>
                <span className="w-4 h-0.5 bg-gray-600"></span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};
