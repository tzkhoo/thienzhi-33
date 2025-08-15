import AnimatedBackground from "@/components/AnimatedBackground";
import Navigation from "@/components/Navigation";

const ProjectsPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-900 via-yellow-800 to-amber-900 relative overflow-hidden">
      <Navigation />
      <AnimatedBackground />
      
      <div className="container mx-auto px-6 py-20 relative z-10">
        <div className="text-center mb-16 pt-16">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            Data Engineering Projects
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Projects I built during my Data Engineering Analyst internship
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          {/* Sample Project 1 */}
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-8 hover:border-primary transition-all duration-300 hover:scale-105">
            <h3 className="text-2xl font-bold text-white mb-4">
              Data Pipeline Optimization
            </h3>
            <p className="text-gray-300 mb-4">
              Developed and optimized ETL pipelines for processing large-scale datasets, 
              improving data processing efficiency by 40% and reducing processing time from 
              hours to minutes using Python, Apache Spark, and cloud technologies.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm">
                Python
              </span>
              <span className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm">
                Apache Spark
              </span>
              <span className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm">
                AWS
              </span>
              <span className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm">
                SQL
              </span>
            </div>
          </div>

          {/* Sample Project 2 */}
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-8 hover:border-primary transition-all duration-300 hover:scale-105">
            <h3 className="text-2xl font-bold text-white mb-4">
              Real-time Analytics Dashboard
            </h3>
            <p className="text-gray-300 mb-4">
              Built a comprehensive real-time analytics dashboard that monitors key business 
              metrics and data quality indicators, enabling stakeholders to make data-driven 
              decisions with up-to-date insights and automated alerting systems.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm">
                React
              </span>
              <span className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm">
                D3.js
              </span>
              <span className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm">
                Node.js
              </span>
              <span className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm">
                MongoDB
              </span>
            </div>
          </div>

          {/* Sample Project 3 */}
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-8 hover:border-primary transition-all duration-300 hover:scale-105">
            <h3 className="text-2xl font-bold text-white mb-4">
              Machine Learning Model Deployment
            </h3>
            <p className="text-gray-300 mb-4">
              Implemented and deployed machine learning models for predictive analytics, 
              creating automated workflows for model training, validation, and deployment 
              using MLOps best practices and containerization technologies.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm">
                Python
              </span>
              <span className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm">
                Scikit-learn
              </span>
              <span className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm">
                Docker
              </span>
              <span className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm">
                Kubernetes
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectsPage;