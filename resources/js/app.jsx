import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import TemperatureDisplay from './components/TemperatureDisplay';
import TemperatureChart from './components/TemperatureChart';
import LedControl from './components/LedControl';
import '../css/app.css';

function App() {
    const [highTemp, setHighTemp] = useState(false);

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-8 relative">
            <h1 className="text-3xl font-bold mb-4 text-center dark:text-white">IoT Monitoring Dashboard</h1>

            {highTemp && (
                <div className="fixed top-4 right-4 flex items-start w-56 gap-3 px-4 py-3 text-sm border rounded border-red-500 bg-red-100 text-red-700 dark:bg-red-700/70 dark:text-red-100 shadow-lg animate-pulse z-50" role="alert">  
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 shrink-0" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"><path strokeDasharray="60" strokeDashoffset="60" d="M12 3L21 20H3L12 3Z"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.5s" values="60;0"/></path><path strokeDasharray="6" strokeDashoffset="6" d="M12 10V14"><animate fill="freeze" attributeName="stroke-dashoffset" begin="0.6s" dur="0.2s" values="6;0"/></path></g><circle cx="12" cy="17" r="1" fill="currentColor" fillOpacity="0"><animate fill="freeze" attributeName="fill-opacity" begin="0.8s" dur="0.4s" values="0;1"/></circle></svg>
                  <div>
                    <h3 className="mb-2 font-bold">Peringatan!</h3>
                    <p>Suhu di atas 30°C</p>
                  </div>
                </div>
            )}

            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-6">
                <TemperatureDisplay onHighTemp={setHighTemp} />
                <LedControl />
            </div>

            <TemperatureChart />

            <footer className="flex justify-center">
            <p className="text-sm py-5 text-gray-600 dark:text-gray-300">Created by SuryaDev.</p>
            </footer>
        </div>
    );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
