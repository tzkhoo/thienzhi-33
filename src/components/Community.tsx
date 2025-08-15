import { userInfo } from "@/data/user-data";

// Import local images
import SengImg from "@/assets/seng.png";
import PmpImg from "@/assets/pmp.png";
import SgImg from "@/assets/sg.png";

const Community = () => {
  const getImageSrc = (imagePath: string) => {
    // Handle local asset pathsre
    if (imagePath.includes('seng.png')) return SengImg;
    if (imagePath.includes('pmp.png')) return PmpImg;
    if (imagePath.includes('sg.png')) return SgImg;
    // Return external URLs as-is
    return imagePath;
  };

  return (
    <section id="community" className="py-20 relative">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl md:text-6xl font-bold text-white mb-12 text-center">
          Community Engagement
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {userInfo.co_curricular_activities.map((activity) => (
            <div 
              key={activity.title}
              className="group bg-slate-800/85 backdrop-blur-sm border border-slate-700 rounded-xl overflow-hidden hover:border-primary hover:bg-slate-800/95 transition-all duration-300 hover:scale-105"
            >
              <div className="relative overflow-hidden h-48 bg-slate-700/30">
                <img 
                  src={getImageSrc(activity.image)}
                  alt={activity.title}
                  className="w-full h-full object-contain p-4 group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              
              <div className="p-6 space-y-4">
                <h3 className="text-xl font-semibold text-white group-hover:text-primary transition-colors">
                  {activity.title}
                </h3>
                
                <p className="text-gray-300 text-sm leading-relaxed">
                  {activity.description}
                </p>
                
                <div className="flex items-center justify-between text-sm text-gray-400">
                  <span>{activity.role}</span>
                  <span>{activity.period}</span>
                </div>
                
                <div className="flex gap-4 pt-4">
                  <a 
                    href={activity.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 text-center py-2 bg-gradient-to-r from-primary to-accent text-primary-foreground rounded-lg hover:scale-105 transition-transform duration-300"
                  >
                    Learn More
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Community;