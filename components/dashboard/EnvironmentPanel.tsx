
import React from 'react';
import { Droplets, Wind, ThermometerSun, AlertCircle } from 'lucide-react';

interface EnvironmentPanelProps {
    humidity: number;
    dustLevel: number;
    ambientTemp: number;
}

const EnvironmentPanel: React.FC<EnvironmentPanelProps> = ({ humidity, dustLevel, ambientTemp }) => {

    // Determine Impact Levels
    const getHumidityImpact = (h: number) => {
        if (h > 75) return { level: 'High Risk', color: 'text-red-400', text: 'Corrosion & Short Risk' };
        if (h > 60) return { level: 'Moderate', color: 'text-amber-400', text: 'Moisture Watch' };
        if (h < 20) return { level: 'Low', color: 'text-blue-400', text: 'ESD Risk (Static)' };
        return { level: 'Optimal', color: 'text-emerald-400', text: 'Ideal Range' };
    };

    const getDustImpact = (d: number) => {
        if (d > 60) return { level: 'Critical', color: 'text-red-400', text: 'Rapid Vent Clogging' };
        if (d > 35) return { level: 'High', color: 'text-amber-400', text: 'Frequent Cleaning Req.' };
        return { level: 'Safe', color: 'text-emerald-400', text: 'Air Quality Good' };
    };

    const hImpact = getHumidityImpact(humidity);
    const dImpact = getDustImpact(dustLevel);

    return (
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 shadow-lg flex flex-col h-full justify-between relative overflow-hidden">
             {/* Decorative BG */}
             <div className="absolute -right-4 -top-4 w-24 h-24 bg-indigo-500/10 rounded-full blur-2xl"></div>

            <div>
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                        <ThermometerSun size={18} className="text-indigo-400" />
                        External Environment
                    </h3>
                    <span className="text-[10px] font-mono bg-zinc-800 text-zinc-400 px-2 py-1 rounded uppercase tracking-widest">IoT Sensor Array</span>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                    {/* Humidity Sensor */}
                    <div className="bg-zinc-950/50 p-4 rounded-lg border border-zinc-800/50">
                        <div className="flex items-center gap-2 mb-2 text-zinc-400">
                            <Droplets size={16} className="text-blue-400" />
                            <span className="text-xs font-medium uppercase">Rel. Humidity</span>
                        </div>
                        <div className="text-2xl font-mono font-bold text-white mb-1">
                            {humidity.toFixed(1)}%
                        </div>
                        <div className={`text-xs font-medium flex items-center gap-1 ${hImpact.color}`}>
                            {hImpact.level !== 'Optimal' && <AlertCircle size={10} />}
                            {hImpact.text}
                        </div>
                    </div>

                    {/* Particulate Matter Sensor */}
                    <div className="bg-zinc-950/50 p-4 rounded-lg border border-zinc-800/50">
                        <div className="flex items-center gap-2 mb-2 text-zinc-400">
                            <Wind size={16} className="text-gray-400" />
                            <span className="text-xs font-medium uppercase">Dust (PM2.5)</span>
                        </div>
                        <div className="text-2xl font-mono font-bold text-white mb-1">
                            {dustLevel.toFixed(0)} <span className="text-sm text-zinc-500 font-normal">µg/m³</span>
                        </div>
                        <div className={`text-xs font-medium flex items-center gap-1 ${dImpact.color}`}>
                            {dImpact.level !== 'Safe' && <AlertCircle size={10} />}
                            {dImpact.text}
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Ambient Temp Context */}
            <div className="pt-4 border-t border-zinc-800 mt-auto">
                <div className="flex justify-between items-center text-sm">
                    <span className="text-zinc-400">Ambient Temperature</span>
                    <span className="text-white font-mono">{ambientTemp.toFixed(1)}°C</span>
                </div>
                <div className="mt-2 h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
                    {/* Visualizing ambient temp relative to standard ranges */}
                    <div 
                        className="h-full bg-gradient-to-r from-blue-500 via-emerald-500 to-red-500" 
                        style={{ width: `${Math.min(100, (ambientTemp / 50) * 100)}%` }}
                    ></div>
                </div>
                <p className="text-[10px] text-zinc-500 mt-2 leading-relaxed">
                    Environmental data is aggregated from local IoT nodes. High dust or humidity levels directly accelerate hardware degradation rates in the Digital Twin model.
                </p>
            </div>
        </div>
    );
};

export default EnvironmentPanel;
