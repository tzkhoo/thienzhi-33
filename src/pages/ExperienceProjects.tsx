import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Briefcase, ExternalLink } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { userInfo } from "@/data/user-data";
import Navigation from '@/components/Navigation';
import AnimatedBackground from '@/components/AnimatedBackground';

const ExperienceProjects = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const experienceIndex = parseInt(id || '0');
  const experience = userInfo.work_experience[experienceIndex];

  // Sample project data - you can replace this with actual data later
  const sampleProjects = [
    {
      title: "Data Pipeline Automation",
      description: "Built an automated data pipeline that processes 10,000+ records daily, reducing manual processing time by 80%. Implemented ETL processes using Python and SQL.",
      technologies: ["Python", "SQL", "Apache Airflow", "PostgreSQL"],
      impact: "Improved data processing efficiency by 80%"
    },
    {
      title: "Business Intelligence Dashboard",
      description: "Developed an interactive dashboard for executive reporting, providing real-time insights into key business metrics and KPIs.",
      technologies: ["Tableau", "SQL", "Python", "Excel"],
      impact: "Enabled data-driven decision making for 50+ stakeholders"
    },
    {
      title: "Customer Segmentation Analysis",
      description: "Performed comprehensive customer segmentation analysis using machine learning algorithms to identify high-value customer groups.",
      technologies: ["Python", "Scikit-learn", "Pandas", "Matplotlib"],
      impact: "Identified 3 key customer segments leading to 15% increase in targeted marketing effectiveness"
    }
  ];

  if (!experience) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-amber-900/20 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl text-white mb-4">Experience not found</h1>
          <Button onClick={() => navigate('/')} variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-amber-900/20 to-slate-900 relative">
      <Navigation />
      <AnimatedBackground />
      <div className="relative z-10">
        {/* Header */}
        <div className="pt-24 pb-12">
          <div className="container mx-auto px-6">
            <Button 
              onClick={() => navigate('/')} 
              variant="outline" 
              className="mb-6 bg-slate-800/50 border-slate-700 text-white hover:bg-slate-800"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Portfolio
            </Button>
            
            <div className="flex items-center justify-center mb-6">
              <Briefcase className="w-8 h-8 text-primary mr-3" />
              <h1 className="text-4xl md:text-6xl font-bold text-white text-center">
                Projects from {experience.company}
              </h1>
            </div>
            <div className="text-center">
              <h2 className="text-2xl text-primary mb-2">{experience.role}</h2>
              <p className="text-xl text-gray-300">{experience.period}</p>
            </div>
          </div>
        </div>

        {/* Projects Content */}
        <div className="container mx-auto px-6 pb-20">
          <div className="max-w-6xl mx-auto space-y-8">
            {sampleProjects.map((project, index) => (
              <Card key={index} className="bg-slate-800/50 backdrop-blur-sm border-slate-700 hover:bg-slate-800/70 hover:scale-105 hover:shadow-xl hover:shadow-primary/20 transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-white text-2xl mb-2">
                    {project.title}
                  </CardTitle>
                  <CardDescription className="text-gray-300 text-lg">
                    {project.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h4 className="text-primary font-semibold mb-3">Technologies Used:</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, techIndex) => (
                        <span 
                          key={techIndex} 
                          className="bg-primary/20 text-primary px-3 py-1 rounded-full text-sm border border-primary/30"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="bg-slate-700/30 rounded-lg p-4 border border-slate-600/50">
                    <h4 className="text-primary font-semibold mb-2">Impact:</h4>
                    <p className="text-gray-300">{project.impact}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
            
            <div className="text-center mt-12">
              <p className="text-gray-400 italic">
                Note: These are sample projects. Actual project details will be updated based on real experience.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExperienceProjects;