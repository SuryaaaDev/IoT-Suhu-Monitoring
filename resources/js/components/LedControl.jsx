import React, { useEffect, useState } from "react";
import axios from "axios";
import DashboardCard from "./DashboardCard";

export default function LedControl() {
    const [status, setStatus] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchStatus = async () => {
        try {
            setLoading(true);
            const response = await axios.get("/api/led/status");
            setStatus(response.data?.status);
            setError(null);
        } catch (err) {
            console.error("Gagal mengambil status LED:", err);
            setError("Gagal memuat status LED");
        } finally {
            setLoading(false);
        }
    };

    const toggleLed = async () => {
        try {
            setLoading(true);
            await axios.post("/api/led/toggle");
            await fetchStatus(); //refresh
        } catch (err) {
            console.error("Gagal mengubah status LED:", err);
            setError("Gagal mengubah status LED");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStatus();
        const interval = setInterval(fetchStatus, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <DashboardCard title="Kontrol LED">
            <div className="sm:flex justify-center items-center space-x-4">
                <div className="flex items-center gap-2 mb-3 sm:mb-0">
                    {loading ? (
                        <span className="text-gray-500">Memuat...</span>
                    ) : error ? (
                        <span className="text-red-500">{error}</span>
                    ) : status !== null ? (
                        <>
                            <span
                                className={`w-4 h-4 rounded-full ${
                                    status ? "bg-green-500" : "bg-red-500"
                                }`}
                            />
                            <span className="font-bold dark:text-gray-200">
                                {status ? "ON" : "OFF"}
                            </span>
                        </>
                    ) : (
                        <span className="text-gray-500">-</span>
                    )}
                </div>
                <button
                    className={`ml-auto px-4 py-2 ${
                        loading
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-blue-500 hover:bg-blue-600 cursor-pointer"
                    } text-white rounded`}
                    onClick={toggleLed} 
                    disabled={loading}
                >
                    {loading ? "Memproses..." : "Ganti Status"}
                </button>
            </div>
        </DashboardCard>
    );
}