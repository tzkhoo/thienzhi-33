import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Briefcase, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { userInfo } from "@/data/user-data";
import StarBorder from '@/components/StarBorder';

const Experience = () => {
  const navigate = useNavigate();
  return (
    <section id="experience" className="py-20 relative">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-4">
              <Briefcase className="w-8 h-8 text-primary mr-3" />
              <h2 className="text-4xl md:text-6xl font-bold text-white">
                Experience
              </h2>
            </div>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              My professional and academic work experience
            </p>
          </div>

          <div className="space-y-8">
            {userInfo.work_experience.map((exp, index) => {
              const cardInner = (
                <>
                  <CardHeader>
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <CardTitle className="text-white text-xl mb-1">{exp.role}</CardTitle>
                        <CardDescription className="text-primary text-lg">
                          {exp.company}
                        </CardDescription>
                      </div>
                      <div className="text-right">
                        <p className="text-gray-300 font-semibold">{exp.period}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <ul className="space-y-2 mb-6">
                        {exp.responsibilities.map((item, itemIndex) => (
                          <li key={itemIndex} className="text-gray-300 flex items-start">
                            <span className="text-primary mr-2">•</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                      {exp.role === "Data Engineering Analyst" && (
                        <Button 
                          onClick={() => navigate(`/experience-projects/${index}`)}
                          variant="outline"
                          className="w-full bg-primary/10 border-primary/30 text-primary hover:bg-primary/20 hover:text-primary-foreground"
                        >
                          View My Projects
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </>
              );

              if (exp.role === "Data Engineering Analyst") {
                return (
                  <StarBorder
                    key={index}
                    as="div"
                    color="hsl(var(--primary))"
                    speed="2.5s"
                    thickness={3.5}
                    className="w-full"
                  >
                    <Card className="bg-slate-800/85 border-slate-700 hover:bg-slate-800/95 hover:shadow-xl hover:shadow-primary/20 transition-all duration-300">
                      {cardInner}
                    </Card>
                  </StarBorder>
                );
              }

              return (
                <Card key={index} className="bg-slate-800/85 border-slate-700 hover:bg-slate-800/95 hover:scale-105 hover:shadow-xl hover:shadow-primary/20 transition-all duration-300">
                  {cardInner}
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
