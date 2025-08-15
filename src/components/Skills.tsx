import { userInfo } from "@/data/user-data";
import { Code, Database, Cloud, Briefcase } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Skills = () => {
  const { skills } = userInfo;

  // Map categories to icons and colors
  const categoryConfig = {
    programming: {
      icon: Code,
      title: "Programming Languages",
      color: "from-primary to-accent",
      bgColor: "bg-primary/10",
      borderColor: "border-primary/30"
    },
    data_analysis_visualization: {
      icon: Database,
      title: "Data Analysis & Visualization",
      color: "from-accent to-primary",
      bgColor: "bg-accent/10",
      borderColor: "border-accent/30"
    },
    tools_services: {
      icon: Cloud,
      title: "Tools & Cloud Services",
      color: "from-primary to-accent",
      bgColor: "bg-primary/10",
      borderColor: "border-primary/30"
    },
    business_design: {
      icon: Briefcase,
      title: "Business & Design",
      color: "from-slate-500 to-gray-500",
      bgColor: "bg-slate-500/10",
      borderColor: "border-slate-500/30"
    }
  };

  return (
    <section id="skills" className="py-20 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Skills
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            A comprehensive overview of my technical expertise and tools I work with
          </p>
        </div>
        
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-8">
          {Object.entries(skills).map(([category, skillList]) => {
            const config = categoryConfig[category as keyof typeof categoryConfig];
            const IconComponent = config?.icon || Code;
            
            return (
              <Card 
                key={category} 
                className={`bg-slate-800/85 backdrop-blur-sm border-slate-700 hover:bg-slate-800/95 transition-all duration-300 hover:scale-[1.02] ${config?.borderColor || 'border-slate-700'}`}
              >
                <CardHeader className="pb-4">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className={`p-3 rounded-lg ${config?.bgColor || 'bg-slate-500/10'}`}>
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-white text-xl">
                      {config?.title || category.replace('_', ' ')}
                    </CardTitle>
                  </div>
                  <div className={`h-1 rounded-full bg-gradient-to-r ${config?.color || 'from-slate-500 to-gray-500'}`}></div>
                </CardHeader>
                
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {skillList.map((skill, index) => (
                      <div 
                        key={skill}
                        className="group relative bg-slate-700/30 backdrop-blur-sm border border-slate-600/50 rounded-lg px-4 py-3 text-gray-300 hover:border-primary/50 hover:text-white transition-all duration-300 hover:scale-105 hover:bg-slate-700/50"
                        style={{ animationDelay: `${index * 50}ms` }}
                      >
                         <div className="flex items-center justify-between">
                           <span className="text-sm font-medium">{skill}</span>
                           <div className="flex space-x-1">
                             {Array.from({ length: 3 }, (_, i) => {
                               let skillLevel = 1; // default 1 dot
                               
                                // Programming skills
                                if (skill === "Python" || skill === "n8n") skillLevel = 3;
                                else if (skill === "C++" || skill === "SQL" || skill === "Figma" || skill === "MongoDB" || skill === "Vercel" || skill === "Google Cloud") skillLevel = 2;
                                else if (skill === "Powerpoint" || skill === "Capcut" || skill === "Canva") skillLevel = 3;
                               
                               return (
                                 <div 
                                   key={i}
                                   className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${
                                     i < skillLevel ? 'bg-primary' : 'bg-slate-600 group-hover:bg-primary'
                                   }`}
                                 />
                               );
                             })}
                           </div>
                         </div>
                        
                        {/* Hover effect gradient */}
                        <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
                      </div>
                    ))}
                  </div>
                  
                                    </CardContent>
              </Card>
            );
          })}
        </div>
        
        
      </div>
    </section>
  );
};

export default Skills;
