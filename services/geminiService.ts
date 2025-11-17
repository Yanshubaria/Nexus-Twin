
import { GoogleGenAI, Type } from "@google/genai";
import { TelemetryData, SystemState, AIInsight } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const analyzeDeviceHealth = async (
  telemetry: TelemetryData,
  state: SystemState
): Promise<AIInsight> => {
  
  const prompt = `
    You are the "Nexus Twin" AI Core embedded in a high-performance laptop (Model X-9000).
    Your job is to interpret the current sensor data and environment context to protect the device.

    System Context:
    - Location Context (IoT): ${state.environmentProfile}
    - Power Profile: ${state.powerMode.toUpperCase()}
    - Device Age: ${state.deviceAgeMonths} months

    Real-Time Telemetry:
    - CPU Temp: ${telemetry.cpuTemp.toFixed(1)}°C (Max Safe: 95°C)
    - GPU Temp: ${telemetry.gpuTemp.toFixed(1)}°C
    - Fan Speed: ${telemetry.fanSpeed.toFixed(0)} RPM
    - Battery Integrity: ${telemetry.batteryHealth.toFixed(1)}%
    - Voltage Stability: ${telemetry.voltage.toFixed(3)}V
    
    Environmental Sensors (External):
    - Ambient Humidity: ${telemetry.humidity.toFixed(1)}%
    - Air Quality (PM2.5): ${telemetry.particulateMatter.toFixed(1)} µg/m³

    Analysis Objectives:
    1. Analyze impact of external environment (Dust/Humidity) on internal thermals.
    2. Predict potential thermal throttling or hardware degradation based on current Power Profile vs. Thermals.
    3. Provide specific actionable advice for the user (e.g., "Move to cooler area", "Clean vents", "Switch to Eco mode").

    Output JSON format only.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            status: { type: Type.STRING, enum: ["healthy", "warning", "critical"] },
            summary: { type: Type.STRING },
            prediction: { type: Type.STRING },
            recommendation: { type: Type.STRING },
            estimatedLifespan: { type: Type.STRING }
          },
          required: ["status", "summary", "prediction", "recommendation", "estimatedLifespan"]
        }
      }
    });

    if (response.text) {
      return JSON.parse(response.text) as AIInsight;
    }
    
    throw new Error("No response text from AI");

  } catch (error) {
    console.error("Gemini Analysis Failed:", error);
    return {
      status: 'warning',
      summary: 'Neural Link Offline. Using cached heuristics.',
      prediction: 'Data insufficient for prediction.',
      recommendation: 'Verify network connection.',
      estimatedLifespan: 'Calculating...'
    };
  }
};
