import { useEffect, useRef, useState } from 'react';
import CountUp from 'react-countup';

interface CountUpCardProps {
  end: number;
  label: string;
  prefix?: string;
  suffix?: string;
  duration?: number;
}

const CountUpCard = ({ end, label, prefix = "", suffix = "", duration = 2.5 }: CountUpCardProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setIsVisible(true);
          setHasStarted(true);
        }
      },
      { threshold: 0.3 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, [hasStarted]);

  return (
    <div 
      ref={cardRef}
      className="flex flex-col items-center justify-center bg-slate-800/30 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6 hover:bg-slate-800/40 transition-all duration-300 hover:scale-105 hover:border-primary/30"
    >
      <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-2">
        {isVisible ? (
          <CountUp
            start={0}
            end={end}
            duration={duration}
            prefix={prefix}
            suffix={suffix}
            separator=","
          />
        ) : (
          `${prefix}0${suffix}`
        )}
      </div>
      <p className="text-gray-300 text-center text-sm md:text-base font-medium">
        {label}
      </p>
    </div>
  );
};

export default CountUpCard;