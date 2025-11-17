
   # ❖ NEXUS DIGITAL TWIN

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/React-19.0-blue)
![Gemini](https://img.shields.io/badge/AI-Google%20Gemini%202.5-orange)
![Tailwind](https://img.shields.io/badge/Style-TailwindCSS-cyan)

**Nexus Digital Twin** is a high-fidelity dashboard concept designed to visualize the "Digital Twin" of a high-performance laptop (The Nexus Model-X). 

Developed by **Yanshu Baria**, this application demonstrates how AI and IoT data can converge to predict hardware failure, optimize performance, and visualize the impact of environmental factors on device longevity.

## 🚀 Concept

In Industry 4.0, a **Digital Twin** is a virtual replica of a physical product. This app simulates that connection:
1.  **Physical Simulation:** The app generates realistic telemetry (CPU/GPU temps, voltage, fan curves) based on physics logic.
2.  **Environmental Context:** Simulates external IoT sensor data (Humidity, Particulate Matter/Dust, Ambient Temp).
3.  **AI Core:** Uses **Google Gemini 2.5 Flash** to analyze the correlation between the environment and the hardware stats to predict lifespan and suggest maintenance.

## ✨ Key Features

*   **🤖 AI-Powered Diagnostics:** Integrated with Google Gemini to act as the device's "Neural Core," providing real-time health assessments and predictive warnings.
*   **📊 Dynamic Telemetry Engine:** Simulates realistic hardware behavior, including thermal throttling, fan curve hysteresis, and voltage droop under load.
*   **🌍 Environmental Physics:** The "Environment Profile" system (e.g., Home Office vs. Industrial Floor) dynamically alters the simulation physics—high dust levels clog vents, and high humidity increases corrosion risks.
*   **🎨 Sci-Fi UI/UX:** A "Cyberpunk/Futuristic" interface featuring:
    *   Scanline animations and glitch effects.
    *   Responsive Bento-grid dashboard layout.
    *   Interactive 3D-style device wireframe visualization.
*   **📈 Real-time Visualization:** Live Recharts implementation for tracking Thermal Dynamics and Power Load.

## 🛠️ Tech Stack

*   **Frontend:** React 19, TypeScript, Vite
*   **Styling:** Tailwind CSS (Custom animations & layouts)
*   **AI Integration:** Google GenAI SDK (`@google/genai`)
*   **Visualization:** Recharts, Lucide React
*   **Deployment:** Built for web compatibility

## 📸 Screenshots

<img width="1279" height="633" alt="image" src="https://github.com/user-attachments/assets/75c76910-49d9-49b7-8165-95c9ef53ebdb" />

<img width="1280" height="751" alt="image" src="https://github.com/user-attachments/assets/3a92d10e-72dc-4ca2-9e55-335dc85d38e8" />

<img width="1280" height="752" alt="image" src="https://github.com/user-attachments/assets/0631f6b8-a497-4f03-ae46-17297db920df" />

<img width="1272" height="749" alt="image" src="https://github.com/user-attachments/assets/22aa9274-f9f6-4915-b002-107c86082b86" />

## 🧠 How It Works

1.  **Initialization:** The app boots up with a simulated system check (Splash Screen).
2.  **Monitoring:** The "Drivers" (internal logic) simulate hardware ticks every second, adjusting temperatures based on the selected Power Mode (Eco/Balanced/Turbo) and Environment.
3.  **Analysis:** When the user requests a report, the app packages the current telemetry + environmental data and sends a prompt to Gemini.
4.  **Insight:** Gemini analyzes the specific combination (e.g., "High Temp + High Dust") and returns a JSON structured prediction on component lifespan.

## 👨‍💻 Developer

**Yanshu Baria**  
*Architecting the future of hardware interfaces.*

---
