
export enum EnvironmentProfile {
  CleanLab = 'Clean Lab (ISO 7)',
  HomeOffice = 'Home Office',
  IndustrialFloor = 'Industrial Floor',
  OutdoorField = 'Outdoor Field Site',
}

export interface TelemetryData {
  timestamp: number;
  cpuTemp: number; // Celsius
  gpuTemp: number; // Celsius
  cpuLoad: number; // Percentage
  fanSpeed: number; // RPM
  batteryHealth: number; // Percentage
  voltage: number; // Volts
  uptime: number; // Seconds
  humidity: number; // Percentage (Relative Humidity)
  particulateMatter: number; // µg/m³ (Dust/Air Quality)
}

export type PowerMode = 'eco' | 'balanced' | 'turbo';

export interface SystemState {
  powerMode: PowerMode;
  environmentProfile: EnvironmentProfile;
  deviceAgeMonths: number; // Hardcoded/Retrieved from "BIOS"
}

export interface AIInsight {
  status: 'healthy' | 'warning' | 'critical';
  summary: string;
  prediction: string;
  recommendation: string;
  estimatedLifespan: string;
}
