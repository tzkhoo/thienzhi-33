import Hero from '@/components/Hero';
import Education from '@/components/Education';
import Experience from '@/components/Experience';
import Skills from '@/components/Skills';
import Community from '@/components/Community';
import Projects from '@/components/Projects';
import Contact from '@/components/Contact';
import Navigation from '@/components/Navigation';
import AnimatedBackground from '@/components/AnimatedBackground';
import ChatbotWidget from '@/components/ChatbotWidget';
import SplashCursor from '@/components/SplashCursor';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-purple-950 relative">
      <AnimatedBackground />
      <SplashCursor SPLAT_RADIUS={0.06} SPLAT_FORCE={2400} />
      <div className="relative z-10">
        <Navigation />
        <Hero />
        <Education />
        <Experience />
        <Projects />
        <Community />
        <Skills />
        <Contact />
        <ChatbotWidget />
      </div>
    </div>
  );
};

export default Index;
