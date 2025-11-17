import React, { useEffect, useState } from 'react';
import { Cpu, ChevronRight } from 'lucide-react';

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsReady(true);
          return 100;
        }
        return prev + 2;
      });
    }, 40); // ~2-3 seconds total

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 bg-zinc-950 flex flex-col items-center justify-center scanline text-white overflow-hidden">
      
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-10 grid-bg pointer-events-none"></div>

      <div className="relative z-10 text-center p-8 max-w-md w-full flex flex-col items-center">
        
        {/* Logo Animation */}
        <div className="mb-8 relative inline-block">
          <div className="absolute inset-0 bg-indigo-500 blur-xl opacity-20 animate-pulse"></div>
          <Cpu className="w-20 h-20 text-indigo-500 mx-auto mb-4 animate-bounce" strokeWidth={1} />
        </div>

        <h1 className="text-4xl md:text-5xl font-bold tracking-tighter mb-2 font-mono fade-in-up" style={{ animationDelay: '0.2s' }}>
          NEXUS<span className="text-indigo-500">TWIN</span>
        </h1>
        
        <p className="text-zinc-500 font-mono text-sm tracking-[0.2em] uppercase mb-12 fade-in-up" style={{ animationDelay: '0.4s' }}>
          Digital Replica Initializing
        </p>

        {/* Loader */}
        <div className="w-full h-1 bg-zinc-900 rounded-full overflow-hidden mb-4 relative border border-zinc-800">
            <div 
              className="h-full bg-gradient-to-r from-indigo-600 to-purple-600 transition-all duration-100 ease-out relative"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute right-0 top-0 bottom-0 w-[20px] bg-white opacity-50 blur-[5px]"></div>
            </div>
        </div>
        
        <div className="flex justify-between text-xs font-mono text-zinc-600 mb-12 w-full">
            <span>SYS.BOOT</span>
            <span>{progress}%</span>
        </div>

        {/* Entry Button */}
        <div className="h-16 flex items-center justify-center fade-in-up" style={{ animationDelay: '0.8s' }}>
            {isReady ? (
                <button 
                    onClick={onComplete}
                    className="group relative px-8 py-3 bg-white text-zinc-950 font-bold font-mono uppercase tracking-wider hover:bg-indigo-500 hover:text-white transition-all duration-300 clip-path-polygon flex items-center gap-2"
                    style={{ clipPath: 'polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)' }}
                >
                    Initialize Neural Link
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
            ) : (
                <span className="text-zinc-700 text-xs animate-pulse font-mono">ESTABLISHING SECURE CONNECTION...</span>
            )}
        </div>

        {/* Developer Credit */}
        <div className="mt-12 fade-in-up" style={{ animationDelay: '1s' }}>
          <p className="text-zinc-500 text-xs mb-1">Architected & Developed By</p>
          <p className="text-zinc-200 font-bold text-lg tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-500">
            YANSHU BARIA
          </p>
        </div>

      </div>
    </div>
  );
};

export default SplashScreen;