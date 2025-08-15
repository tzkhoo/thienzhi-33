import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { GraduationCap } from 'lucide-react';
import { userInfo } from "@/data/user-data";

// Import local university logos
import HKUSTLogo from "@/assets/HKUST.png";
import DTULogo from "@/assets/DTU_Logo.jpg";

const Education = () => {
  const getLogoSrc = (logoPath: string, universityName: string) => {
    // Handle local asset paths based on university name
    if (
      universityName.includes('Hong Kong University of Science and Technology') ||
      universityName.includes('HKUST')
    ) {
      return HKUSTLogo;
    }
    if (
      universityName.includes('Technical University of Denmark') ||
      universityName.includes('DTU')
    ) {
      return DTULogo;
    }
    // Return external URLs as-is for fallback
    return logoPath;
  };

  return (
    <section id="education" className="py-20 relative">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-4">
              <GraduationCap className="w-8 h-8 text-primary mr-3" />
              <h2 className="text-4xl md:text-6xl font-bold text-white">
                Education
              </h2>
            </div>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              My academic journey in Computer Engineering
            </p>
          </div>

          <div className="space-y-8">
            {userInfo.education.map((edu, index) => (
              <Card key={index} className="bg-slate-800/85 border-slate-700 hover:bg-slate-800/95 hover:scale-105 hover:shadow-xl hover:shadow-primary/20 transition-all duration-300">
                <CardHeader>
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2">
                    <div className="flex flex-col sm:flex-row sm:items-start space-y-3 sm:space-y-0 sm:space-x-4">
                      <div className="flex-shrink-0 self-center sm:self-start">
                        <img 
                          src={getLogoSrc(edu.logo, edu.university)} 
                          alt={`${edu.university} logo`}
                          className="w-16 h-16 object-contain bg-white rounded-lg p-2"
                        />
                      </div>
                      <div className="text-center sm:text-left">
                        <CardTitle className="text-white text-lg sm:text-xl mb-2 leading-relaxed">
                          {edu.degree} {edu.major && `in ${edu.major}`}
                        </CardTitle>
                        <CardDescription className="text-primary text-base sm:text-lg leading-relaxed">
                          {edu.university}
                        </CardDescription>
                      </div>
                    </div>
                    <div className="text-center sm:text-right mt-3 sm:mt-0">
                      <p className="text-gray-300 font-semibold text-sm sm:text-base">{edu.graduation_date}</p>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;
