import React from 'react';

export type BugsyMood = 'happy' | 'laughing' | 'dizzy' | 'thinking' | 'idle';

interface BugsyProps {
  mood?: BugsyMood;
  className?: string;
  size?: number;
}

export function Bugsy({ mood = 'idle', className = '', size = 64 }: BugsyProps) {
  // Common colors
  const bodyColor = '#f59e0b'; // Amber-500
  const bellyColor = '#fcd34d'; // Amber-300
  const eyeColor = '#18181b'; // Zinc-900
  const legColor = '#713f12'; // Yellow-900
  const strokeColor = '#451a03'; // Amber-950

  const getEyeShapes = () => {
    switch (mood) {
      case 'happy':
      case 'laughing':
        return (
          <>
            <path d="M 30 42 Q 35 35 40 42" fill="none" stroke={eyeColor} strokeWidth="3" strokeLinecap="round" />
            <path d="M 60 42 Q 65 35 70 42" fill="none" stroke={eyeColor} strokeWidth="3" strokeLinecap="round" />
          </>
        );
      case 'dizzy':
        return (
          <>
            <path d="M 28 38 L 42 46 M 28 46 L 42 38" fill="none" stroke={eyeColor} strokeWidth="3" strokeLinecap="round" />
            <path d="M 58 38 L 72 46 M 58 46 L 72 38" fill="none" stroke={eyeColor} strokeWidth="3" strokeLinecap="round" />
          </>
        );
      case 'thinking':
        return (
          <>
            <circle cx="35" cy="40" r="4" fill={eyeColor} />
            <circle cx="65" cy="35" r="4" fill={eyeColor} />
            <line x1="30" y1="32" x2="40" y2="34" stroke={eyeColor} strokeWidth="2" strokeLinecap="round" />
            <line x1="60" y1="28" x2="70" y2="26" stroke={eyeColor} strokeWidth="2" strokeLinecap="round" />
          </>
        );
      case 'idle':
      default:
        return (
          <>
            <circle cx="35" cy="40" r="4" fill={eyeColor} />
            <circle cx="65" cy="40" r="4" fill={eyeColor} />
          </>
        );
    }
  };

  const getMouthShape = () => {
    switch (mood) {
      case 'happy':
        return <path d="M 35 55 Q 50 65 65 55" fill="none" stroke={eyeColor} strokeWidth="3" strokeLinecap="round" />;
      case 'laughing':
        return (
          <path d="M 35 55 Q 50 70 65 55 Q 50 65 35 55 Z" fill="#ef4444" stroke={eyeColor} strokeWidth="2" strokeLinejoin="round" />
        );
      case 'dizzy':
        return <path d="M 40 60 Q 45 55 50 60 T 60 60" fill="none" stroke={eyeColor} strokeWidth="3" strokeLinecap="round" />;
      case 'thinking':
        return <path d="M 45 55 Q 50 58 55 55" fill="none" stroke={eyeColor} strokeWidth="2" strokeLinecap="round" />;
      case 'idle':
      default:
        return <path d="M 40 55 Q 50 58 60 55" fill="none" stroke={eyeColor} strokeWidth="2" strokeLinecap="round" />;
    }
  };

  const animationClass = 
    mood === 'dizzy' ? 'animate-[spin_3s_linear_infinite]' :
    mood === 'laughing' ? 'animate-[bounce_0.5s_infinite]' :
    mood === 'thinking' ? 'animate-[pulse_2s_infinite]' :
    '';

  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 100 100" 
      xmlns="http://www.w3.org/2000/svg"
      className={`${animationClass} ${className}`}
    >
      <g stroke={strokeColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        {/* Antennae */}
        <path d="M 40 25 Q 30 10 20 15" fill="none" />
        <circle cx="20" cy="15" r="3" fill={bodyColor} />
        
        <path d="M 60 25 Q 70 10 80 15" fill="none" />
        <circle cx="80" cy="15" r="3" fill={bodyColor} />

        {/* Legs */}
        {/* Left legs */}
        <path d="M 25 45 L 10 40" fill="none" stroke={legColor} strokeWidth="3" />
        <path d="M 22 60 L 12 65" fill="none" stroke={legColor} strokeWidth="3" />
        
        {/* Right legs */}
        <path d="M 75 45 L 90 40" fill="none" stroke={legColor} strokeWidth="3" />
        <path d="M 78 60 L 88 65" fill="none" stroke={legColor} strokeWidth="3" />

        {/* Body */}
        <ellipse cx="50" cy="50" rx="28" ry="32" fill={bodyColor} />
        
        {/* Belly */}
        <ellipse cx="50" cy="55" rx="18" ry="20" fill={bellyColor} stroke="none" />
      </g>

      {/* Face features (no global stroke to keep them distinct) */}
      <g>
        {getEyeShapes()}
        {getMouthShape()}
      </g>
    </svg>
  );
}
