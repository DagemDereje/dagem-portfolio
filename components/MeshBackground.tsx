'use client';

import React, { useEffect } from 'react';

export default function MeshBackground() {
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const mesh = document.getElementById('mesh-bg');
      if (!mesh) return;

      const x = (e.clientX / window.innerWidth - 0.5) * 40;
      const y = (e.clientY / window.innerHeight - 0.5) * 40;

      mesh.style.transform = `translate(${x}px, ${y}px) scale(1.02)`;
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Container with deep blur and smooth tracking */}
      <div 
        id="mesh-bg" 
        className="absolute inset-0 blur-[90px] opacity-80 transition-transform duration-300 ease-out"
      >
        {/* Blob 1: Vibrant Cyan */}
        <div className="absolute w-[400px] h-[400px] bg-cyan-400/50 rounded-full mix-blend-screen top-[5%] left-[10%] animate-blob-1" />
        
        {/* Blob 2: Electric Indigo-Blue */}
        <div className="absolute w-[450px] h-[450px] bg-blue-600/40 rounded-full mix-blend-screen bottom-[5%] right-[10%] animate-blob-2" />
        
        {/* Blob 3: Rich Violet/Purple Accent */}
        <div className="absolute w-[380px] h-[380px] bg-purple-500/40 rounded-full mix-blend-screen top-[30%] left-[35%] animate-blob-3" />

        {/* Blob 4: Warm Gold Highlight (To match your portfolio accents) */}
        <div className="absolute w-[300px] h-[300px] bg-amber-400/30 rounded-full mix-blend-screen top-[60%] left-[10%] animate-blob-4" />
      </div>
    </div>
  );
}