import "./GradientText.css";

interface GradientTextProps {
  children: React.ReactNode;
  className?: string;
  colors?: string[];
  animationSpeed?: number;
  showBorder?: boolean;
}

export default function GradientText({
  children,
  className = "",
  colors = [
    "hsl(220, 70%, 50%)", // Blue
    "hsl(160, 70%, 50%)", // Green  
    "hsl(49, 100%, 57%)", // Yellow (from design system primary)
    "hsl(160, 70%, 50%)", // Green
    "hsl(220, 70%, 50%)"  // Blue
  ],
  animationSpeed = 3,
  showBorder = false
}: GradientTextProps) {
  const gradientStyle = {
    backgroundImage: `linear-gradient(to right, ${colors.join(", ")})`,
    animationDuration: `${animationSpeed}s`,
  };

  return (
    <div className={`animated-gradient-text ${className}`}>
      {showBorder && <div className="gradient-overlay" style={gradientStyle}></div>}
      <div className="text-content" style={gradientStyle}>{children}</div>
    </div>
  );
}