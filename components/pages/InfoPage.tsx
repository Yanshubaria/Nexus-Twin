import React from 'react';
import { ArrowLeft, Database, Cpu, Brain, Activity, Zap } from 'lucide-react';

interface InfoPageProps {
  onBack: () => void;
}

const InfoPage: React.FC<InfoPageProps> = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 p-6 md:p-12 relative scanline">
      <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none"></div>
      
      <div className="max-w-4xl mx-auto relative z-10">
        <button 
          onClick={onBack}
          className="group flex items-center gap-2 text-zinc-400 hover:text-indigo-400 transition-colors mb-8 font-mono text-sm"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          RETURN TO DASHBOARD
        </button>

        <header className="mb-12 border-b border-zinc-800 pb-8">
          <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-400">
            How Nexus Twin Works
          </h1>
          <p className="text-lg text-zinc-400 leading-relaxed">
            A Digital Twin is a virtual representation that serves as the real-time digital counterpart of a physical object or process. 
            Nexus uses this technology to protect your hardware.
          </p>
        </header>

        <div className="grid gap-12">
          
          {/* The Flow Visualization */}
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-8 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
            
            <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative">
              {/* Step 1 */}
              <div className="text-center z-10 flex-1">
                <div className="w-16 h-16 bg-zinc-800 rounded-full flex items-center justify-center mx-auto mb-4 border border-zinc-700 shadow-[0_0_15px_rgba(0,0,0,0.5)]">
                  <Cpu className="text-indigo-400" size={32} />
                </div>
                <h3 className="font-bold text-white mb-2">1. Physical Device</h3>
                <p className="text-sm text-zinc-400">Your laptop's sensors generate real-time telemetry (Heat, Load, Power).</p>
              </div>

              {/* Connector */}
              <div className="hidden md:block h-0.5 bg-zinc-700 flex-1 relative">
                <div className="absolute top-1/2 -translate-y-1/2 left-0 w-full h-full animate-pulse bg-indigo-500/50"></div>
              </div>

              {/* Step 2 */}
               <div className="text-center z-10 flex-1">
                <div className="w-16 h-16 bg-zinc-800 rounded-full flex items-center justify-center mx-auto mb-4 border border-zinc-700 shadow-[0_0_15px_rgba(0,0,0,0.5)]">
                  <Database className="text-purple-400" size={32} />
                </div>
                <h3 className="font-bold text-white mb-2">2. Digital Twin</h3>
                <p className="text-sm text-zinc-400">Data maps to a virtual model, mirroring state instantly in the cloud.</p>
              </div>

               {/* Connector */}
              <div className="hidden md:block h-0.5 bg-zinc-700 flex-1">
                 <div className="absolute top-1/2 -translate-y-1/2 left-0 w-full h-full animate-pulse bg-purple-500/50"></div>
              </div>

              {/* Step 3 */}
               <div className="text-center z-10 flex-1">
                <div className="w-16 h-16 bg-zinc-800 rounded-full flex items-center justify-center mx-auto mb-4 border border-zinc-700 shadow-[0_0_15px_rgba(0,0,0,0.5)]">
                  <Brain className="text-pink-400" size={32} />
                </div>
                <h3 className="font-bold text-white mb-2">3. AI Analysis</h3>
                <p className="text-sm text-zinc-400">Gemini AI processes patterns to predict failures before they happen.</p>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-xl hover:border-zinc-600 transition-colors group">
              <div className="flex items-center gap-3 mb-3">
                <Activity className="text-emerald-400" />
                <h3 className="font-bold text-lg">Predictive Maintenance</h3>
              </div>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Instead of waiting for your laptop to overheat and crash, the Digital Twin detects thermal runaway trends hours in advance, warning you to clean fans or reduce load.
              </p>
            </div>

            <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-xl hover:border-zinc-600 transition-colors group">
               <div className="flex items-center gap-3 mb-3">
                <Zap className="text-amber-400" />
                <h3 className="font-bold text-lg">Lifecycle Optimization</h3>
              </div>
              <p className="text-zinc-400 text-sm leading-relaxed">
                By analyzing voltage fluctuations and battery cycles against global averages, Nexus predicts exactly when your hardware will need replacement, saving costs.
              </p>
            </div>
          </div>

          <footer className="mt-12 text-center border-t border-zinc-900 pt-8">
            <p className="text-zinc-600 text-sm font-mono">
              NEXUS DIGITAL TWIN PROJECT &bull; DEVELOPED BY YANSHU BARIA
            </p>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default InfoPage;