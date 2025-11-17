
import React, { useState, useEffect, useCallback } from 'react';
import { SystemState, TelemetryData, AIInsight, EnvironmentProfile } from './types';
import DeviceRender from './components/visuals/DeviceRender';
import SystemModes from './components/dashboard/Controls'; // Using the overwritten Controls file
import Charts from './components/dashboard/Charts';
import InsightPanel from './components/dashboard/InsightPanel';
import EnvironmentPanel from './components/dashboard/EnvironmentPanel';
import SplashScreen from './components/pages/SplashScreen';
import InfoPage from './components/pages/InfoPage';
import { analyzeDeviceHealth } from './services/geminiService';
import { LayoutDashboard, Zap, Battery } from 'lucide-react';

const App: React.FC = () => {
  // --- View State ---
  const [view, setView] = useState<'splash' | 'dashboard' | 'info'>('splash');

  // --- System State ---
  const [systemState, setSystemState] = useState<SystemState>({
    powerMode: 'balanced',
    environmentProfile: EnvironmentProfile.HomeOffice,
    deviceAgeMonths: 14 // Hardcoded as if reading from BIOS
  });
  
  const [telemetryHistory, setTelemetryHistory] = useState<TelemetryData[]>([]);
  const [currentTelemetry, setCurrentTelemetry] = useState<TelemetryData | null>(null);
  const [aiInsight, setAiInsight] = useState<AIInsight | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // --- Core Simulation Engine (The "Drivers") ---
  const simulateHardwareTick = useCallback(() => {
    const { powerMode, environmentProfile } = systemState;
    
    // 1. Simulate Realistic Workload Fluctuation
    const time = Date.now() / 1000;
    const baseLoad = Math.sin(time * 0.5) * 20 + 40; // Oscillation between 20 and 60
    const randomSpike = Math.random() > 0.9 ? Math.random() * 40 : 0; // Occasional spikes
    
    let modeMultiplier = 1.0;
    if (powerMode === 'eco') modeMultiplier = 0.6;
    if (powerMode === 'turbo') modeMultiplier = 1.2;

    const currentCpuLoad = Math.min(100, (baseLoad + randomSpike) * modeMultiplier);

    // 2. Environment Physics (IoT Data)
    let ambientTemp = 22;
    let baseHumidity = 40;
    let baseDust = 10;

    switch (environmentProfile) {
        case EnvironmentProfile.CleanLab:
            ambientTemp = 20; baseHumidity = 45; baseDust = 5; break;
        case EnvironmentProfile.HomeOffice:
            ambientTemp = 23; baseHumidity = 50; baseDust = 20; break;
        case EnvironmentProfile.IndustrialFloor:
            ambientTemp = 28; baseHumidity = 30; baseDust = 65; break;
        case EnvironmentProfile.OutdoorField:
            ambientTemp = 32; baseHumidity = 75; baseDust = 45; break;
    }

    // 3. Thermal Physics
    const dustInsulation = baseDust * 0.1;
    const powerHeat = currentCpuLoad * 0.5 * modeMultiplier;
    
    // Calculate Target Temp
    const targetTemp = ambientTemp + powerHeat + dustInsulation;
    
    // Smooth transition
    const prevTemp = currentTelemetry?.cpuTemp || ambientTemp;
    const newCpuTemp = prevTemp + (targetTemp - prevTemp) * 0.05;
    const newGpuTemp = newCpuTemp * 0.85;

    // 4. Fan Curve
    let targetFan = 0;
    if (newCpuTemp > 50) targetFan = 1500;
    if (newCpuTemp > 70) targetFan = 3200;
    if (newCpuTemp > 85) targetFan = 4800;
    if (powerMode === 'turbo') targetFan = Math.max(targetFan, 3000);
    if (powerMode === 'eco') targetFan = Math.min(targetFan, 2500);
    
    const prevFan = currentTelemetry?.fanSpeed || 0;
    const newFanSpeed = prevFan + (targetFan - prevFan) * 0.1;

    // 5. Electrical
    const voltageBase = 1.2;
    const vDroop = currentCpuLoad * 0.002;
    const voltage = voltageBase - vDroop + (Math.random() * 0.01);

    const newData: TelemetryData = {
      timestamp: Date.now(),
      cpuTemp: newCpuTemp,
      gpuTemp: newGpuTemp,
      cpuLoad: currentCpuLoad,
      fanSpeed: newFanSpeed,
      batteryHealth: 94,
      voltage: voltage,
      uptime: performance.now() / 1000,
      humidity: baseHumidity + (Math.random() * 2),
      particulateMatter: baseDust + (Math.random() * 5),
    };

    setCurrentTelemetry(newData);
    setTelemetryHistory(prev => {
      const h = [...prev, newData];
      if (h.length > 50) h.shift();
      return h;
    });

  }, [systemState, currentTelemetry]);

  useEffect(() => {
    const interval = setInterval(simulateHardwareTick, 1000);
    return () => clearInterval(interval);
  }, [simulateHardwareTick]);

  const handleAnalyze = async () => {
    if (!currentTelemetry) return;
    setIsAnalyzing(true);
    const insight = await analyzeDeviceHealth(currentTelemetry, systemState);
    setAiInsight(insight);
    setIsAnalyzing(false);
  };

  useEffect(() => {
    setAiInsight(null);
  }, [systemState.environmentProfile, systemState.powerMode]);

  // --- Renders ---

  if (view === 'splash') {
    return <SplashScreen onComplete={() => setView('dashboard')} />;
  }

  if (view === 'info') {
    return <InfoPage onBack={() => setView('dashboard')} />;
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 p-4 md:p-6 scanline font-sans selection:bg-indigo-500/30 flex flex-col">
      
      {/* App Header */}
      <header className="w-full max-w-[1920px] mx-auto mb-6 flex justify-between items-end border-b border-zinc-800/50 pb-4 px-2">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-zinc-900 rounded border border-zinc-700 flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-indigo-600 opacity-20 animate-pulse"></div>
            <LayoutDashboard className="text-indigo-400 relative z-10" size={20} />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight font-mono leading-none">NEXUS<span className="text-indigo-500">TWIN</span></h1>
            <p className="text-zinc-500 text-[10px] uppercase tracking-[0.2em] mt-1">System Core // Model X-9000</p>
          </div>
        </div>

        <button 
          onClick={() => setView('info')}
          className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-xs font-mono text-zinc-400 rounded transition-colors"
        >
          SYSTEM INFO
        </button>
      </header>

      {/* Main Grid */}
      <main className="flex-1 w-full max-w-[1920px] mx-auto grid grid-cols-1 xl:grid-cols-12 gap-6 animate-in fade-in duration-700 pb-6 px-2">
        
        {/* LEFT COLUMN: Visuals & Controls (4/12) */}
        <div className="xl:col-span-4 flex flex-col gap-6 h-full">
          
          {/* Device Visualizer */}
          <div className="h-[320px] xl:h-[400px] transition-all duration-500">
            {currentTelemetry && (
              <DeviceRender 
                temperature={currentTelemetry.cpuTemp} 
                load={currentTelemetry.cpuLoad} 
                fanSpeed={currentTelemetry.fanSpeed}
              />
            )}
          </div>
          
          {/* System Mode Controls */}
          <SystemModes 
            state={systemState} 
            onChange={(updates) => setSystemState(prev => ({ ...prev, ...updates }))} 
          />

          {/* Live Quick Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-zinc-900/50 p-4 rounded-xl border border-zinc-800 flex items-center gap-3">
                <div className="p-2 bg-amber-500/10 rounded-lg">
                    <Zap size={18} className="text-amber-400" />
                </div>
                <div>
                    <div className="text-[10px] text-zinc-500 uppercase font-bold">Core Voltage</div>
                    <div className="text-lg font-mono font-bold text-zinc-200">
                        {currentTelemetry?.voltage.toFixed(2)}V
                    </div>
                </div>
            </div>
             <div className="bg-zinc-900/50 p-4 rounded-xl border border-zinc-800 flex items-center gap-3">
                <div className="p-2 bg-emerald-500/10 rounded-lg">
                    <Battery size={18} className="text-emerald-400" />
                </div>
                <div>
                    <div className="text-[10px] text-zinc-500 uppercase font-bold">Battery Est.</div>
                    <div className="text-lg font-mono font-bold text-zinc-200">
                        4h 12m
                    </div>
                </div>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: Data & Intelligence (8/12) */}
        <div className="xl:col-span-8 flex flex-col gap-6 h-full">
          
          {/* Top Row: Env + Charts */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 min-h-[280px]">
            
            {/* Environmental Data (1/3) */}
            <div className="md:col-span-1 h-full">
                {currentTelemetry && (
                    <EnvironmentPanel 
                        humidity={currentTelemetry.humidity}
                        dustLevel={currentTelemetry.particulateMatter}
                        ambientTemp={currentTelemetry.cpuTemp - (currentTelemetry.cpuLoad * 0.3)} 
                    />
                )}
            </div>
            
            {/* Performance Charts (2/3) */}
            <div className="md:col-span-2 h-full">
                 <Charts data={telemetryHistory} />
            </div>
          </div>

          {/* Bottom Row: AI Twin Insight */}
          <div className="flex-1 min-h-[300px]">
            <InsightPanel 
              insight={aiInsight} 
              isLoading={isAnalyzing} 
              onAnalyze={handleAnalyze} 
            />
          </div>
          
        </div>

      </main>
    </div>
  );
};

export default App;
