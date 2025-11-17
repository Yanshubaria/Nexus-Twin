
import React from 'react';
import { Laptop, Fan, Cpu, Battery, Wifi } from 'lucide-react';

interface DeviceRenderProps {
  temperature: number;
  load: number;
  fanSpeed: number;
}

const DeviceRender: React.FC<DeviceRenderProps> = ({ temperature, load, fanSpeed }) => {
  
  const isHot = temperature > 80;
  const isHeavyLoad = load > 70;

  return (
    <div className="relative w-full h-full min-h-[300px] bg-zinc-900 rounded-xl border border-zinc-800 overflow-hidden flex flex-col relative group">
      
      {/* Header */}
      <div className="p-4 border-b border-zinc-800 flex justify-between items-center bg-zinc-900/80 backdrop-blur-sm z-20">
        <div className="flex items-center gap-2">
          <Laptop size={16} className="text-indigo-500" />
          <span className="text-xs font-mono text-zinc-300 tracking-widest">NEXUS MODEL-X TWIN</span>
        </div>
        <div className="flex items-center gap-2">
             <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
             <span className="text-[10px] text-emerald-500 font-mono uppercase">Sync Active</span>
        </div>
      </div>

      {/* Main Visualization Area */}
      <div className="flex-1 relative flex items-center justify-center p-8">
        
        {/* Grid Background */}
        <div className="absolute inset-0 opacity-10" 
             style={{ 
               backgroundImage: 'linear-gradient(#4f46e5 1px, transparent 1px), linear-gradient(90deg, #4f46e5 1px, transparent 1px)', 
               backgroundSize: '40px 40px',
               perspective: '1000px',
               transform: 'rotateX(20deg) scale(1.2)'
             }}>
        </div>

        {/* Laptop Abstract Wireframe */}
        <div className="relative z-10 w-64 h-40 border-2 border-zinc-600 rounded-lg bg-zinc-950/80 backdrop-blur-md flex items-center justify-center shadow-2xl transform transition-all duration-500 group-hover:scale-105 group-hover:border-indigo-500/50">
            
            {/* Screen Glow */}
            <div className="absolute inset-2 bg-indigo-500/5 rounded border border-indigo-500/10 overflow-hidden">
                 {/* Scanline passing through */}
                 <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-indigo-500/10 to-transparent animate-[scanline_3s_linear_infinite]"></div>
            </div>

            {/* Internal Component Nodes */}
            
            {/* CPU Node */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className={`w-16 h-16 border ${isHot ? 'border-red-500 shadow-[0_0_20px_rgba(239,68,68,0.4)]' : 'border-indigo-500 shadow-[0_0_20px_rgba(99,102,241,0.2)]'} bg-zinc-900 rounded flex items-center justify-center transition-all duration-500`}>
                    <Cpu size={32} className={`${isHot ? 'text-red-500' : 'text-indigo-400'} transition-colors`} />
                </div>
                {/* Connecting Lines */}
                <div className="absolute top-1/2 left-full w-12 h-[1px] bg-zinc-700"></div>
                <div className="absolute top-1/2 right-full w-12 h-[1px] bg-zinc-700"></div>
            </div>

            {/* Fan Node Left */}
            <div className="absolute top-1/2 left-4 -translate-y-1/2">
                 <Fan 
                    size={24} 
                    className={`text-zinc-500 ${fanSpeed > 2000 ? 'animate-[spin_1s_linear_infinite]' : fanSpeed > 4000 ? 'animate-[spin_0.2s_linear_infinite]' : ''}`} 
                 />
            </div>

             {/* Fan Node Right */}
             <div className="absolute top-1/2 right-4 -translate-y-1/2">
                 <Fan 
                    size={24} 
                    className={`text-zinc-500 ${fanSpeed > 2000 ? 'animate-[spin_1s_linear_infinite]' : fanSpeed > 4000 ? 'animate-[spin_0.2s_linear_infinite]' : ''}`} 
                 />
            </div>

             {/* Keyboard Area (Bottom Base) */}
             <div className="absolute -bottom-4 -left-4 -right-4 h-4 bg-zinc-800 rounded-b-xl transform skew-x-[10deg] border-b border-l border-r border-zinc-700"></div>
        </div>

        {/* Floating Stats Badges */}
        <div className="absolute top-10 left-10">
             <div className="flex items-center gap-2 bg-zinc-900/90 border border-zinc-700 px-3 py-1.5 rounded-full shadow-lg">
                <Battery size={14} className={load > 80 ? 'text-amber-400' : 'text-emerald-400'} />
                <span className="text-xs font-mono text-white">Pwr Draw: {(load * 0.8).toFixed(0)}W</span>
             </div>
        </div>

        <div className="absolute bottom-10 right-10">
             <div className="flex items-center gap-2 bg-zinc-900/90 border border-zinc-700 px-3 py-1.5 rounded-full shadow-lg">
                <Wifi size={14} className="text-blue-400" />
                <span className="text-xs font-mono text-white">IoT Latency: 12ms</span>
             </div>
        </div>

      </div>
    </div>
  );
};

export default DeviceRender;
