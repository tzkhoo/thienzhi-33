import { projectsData } from "@/data/projects-data";
import { useNavigate } from "react-router-dom";

// Import local images
import BochkImg from "@/assets/bochk.jpg";
import BnpImg from "@/assets/bnp.jpg";
import OwImg from "@/assets/ow.jpg"; 

const Projects = () => {
  const navigate = useNavigate();
  
  // Show only first 3 projects on homepage
  const featuredProjects = projectsData.slice(0, 3);

  const getImageSrc = (imagePath: string) => {
    // Handle local asset paths
    if (imagePath.includes('bochk.jpg')) return BochkImg;
    if (imagePath.includes('bnp.jpg')) return BnpImg;
    if (imagePath.includes('ow.jpg')) return OwImg;
    // Handle awards images
    if (imagePath.includes('awards1.png')) return '/awards1.png';
    if (imagePath.includes('awards2.png')) return '/awards2.png';
    if (imagePath.includes('awards3.png')) return '/awards3.png';
    if (imagePath.includes('awards4.png')) return '/awards4.png';
    if (imagePath.includes('awards5.png')) return '/awards5.png';
    // Return external URLs as-is
    return imagePath;
  };

  const getRoleStyle = (role: string) => {
    // Apply enhanced styling to all roles
    return "font-bold text-xl" + " text-[#FFDE21]";
  };

  const handleShowAllProjects = () => {
    navigate('/awards');
    // Scroll to top after navigation
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  };

  return (
    <section id="case-comp" className="py-20 relative">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl md:text-6xl font-bold text-white mb-12 text-center">
            Professional Awards
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {featuredProjects.map((project) => (
            <div 
              key={project.title}
              className="group bg-slate-800/85 backdrop-blur-sm border border-slate-700 rounded-xl overflow-hidden hover:border-primary hover:bg-slate-800/95 transition-all duration-300 hover:scale-105"
            >
              <div className="relative overflow-hidden h-48 bg-slate-700/30">
                <img 
                  src={getImageSrc(project.image)}
                  alt={project.title}
                  className="w-full h-full object-contain p-4 group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1 bg-primary text-primary-foreground text-sm rounded-full font-medium">
                    {project.category}
                  </span>
                </div>
              </div>
              
              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-white group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <span className="text-xs text-gray-400 bg-slate-700/50 px-2 py-1 rounded">
                    {project.status}
                  </span>
                </div>
                
                <p className="text-gray-300 text-sm leading-relaxed">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2">
                  {project.technologies.slice(0, 4).map((tech) => (
                    <span key={tech} className="px-2 py-1 bg-primary/20 text-primary rounded text-xs">
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 4 && (
                    <span className="px-2 py-1 bg-slate-600/50 text-gray-400 rounded text-xs">
                      +{project.technologies.length - 4} more
                    </span>
                  )}
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <span className={getRoleStyle(project.role)}>{project.role}</span>
                  <span className="text-gray-400">{project.period}</span>
                </div>
                
                <div className="flex gap-4 pt-4">
                  <a 
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 text-center py-2 bg-gradient-to-r from-primary to-accent text-primary-foreground rounded-lg hover:scale-105 transition-transform duration-300"
                  >
                    View Awards
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Show All Projects Button */}
        <div className="text-center mt-12">
          <button
            onClick={handleShowAllProjects}
            className="px-8 py-3 bg-gradient-to-r from-primary to-accent text-primary-foreground rounded-lg hover:scale-105 transition-all duration-300 font-semibold shadow-lg hover:shadow-primary/25"
          >
                Show All Awards
          </button>
        </div>
      </div>
    </section>
  );
};

export default Projects;
