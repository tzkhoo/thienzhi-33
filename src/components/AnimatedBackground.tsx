import { useEffect, useState } from 'react';

const AnimatedBackground = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Floating cosmic dust */}
      <div className="absolute top-1/4 left-1/4 w-8 h-8 bg-blue-400/20 rounded-full animate-pulse blur-sm"></div>
      <div className="absolute top-3/4 right-1/4 w-6 h-6 bg-purple-400/15 rounded-full animate-pulse blur-sm animation-delay-1000"></div>
      
      {/* Cosmic nebula */}
      <div className="absolute top-1/2 left-1/6 w-32 h-32 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-full animate-pulse blur-2xl animation-delay-2000"></div>
      <div className="absolute top-1/3 right-1/3 w-24 h-24 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full animate-pulse blur-xl"></div>
      <div className="absolute bottom-1/4 left-1/3 w-40 h-40 bg-gradient-to-r from-indigo-500/8 to-purple-500/8 rounded-full animate-pulse blur-3xl animation-delay-3000"></div>
      
      {/* Animated Stars */}
      <div className="absolute inset-0">
        {Array.from({ length: 120 }, (_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-primary rounded-full animate-twinkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
        {Array.from({ length: 80 }, (_, i) => (
          <div
            key={`moving-${i}`}
            className="absolute w-0.5 h-0.5 bg-accent rounded-full animate-drift-star"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${8 + Math.random() * 4}s`
            }}
          />
        ))}
        {Array.from({ length: 40 }, (_, i) => (
          <div
            key={`shooting-${i}`}
            className="absolute w-1 h-1 bg-yellow-300 rounded-full animate-drift-star"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 8}s`,
              animationDuration: `${6 + Math.random() * 6}s`
            }}
          />
        ))}
      </div>
      
      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="grid grid-cols-12 gap-4 h-full">
          {Array.from({ length: 144 }, (_, i) => (
            <div key={i} className="border border-primary/20 rounded"></div>
          ))}
        </div>
      </div>
      
      {/* Galaxy orbs */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-r from-purple-600/15 to-blue-600/15 rounded-full blur-3xl animate-drift-1"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-r from-blue-600/15 to-indigo-600/15 rounded-full blur-3xl animate-drift-2"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-indigo-600/10 to-purple-600/10 rounded-full blur-2xl animate-drift-3"></div>
      </div>
    </div>
  );
};

export default AnimatedBackground;
