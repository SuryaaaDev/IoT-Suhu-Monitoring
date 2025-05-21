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
            <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                    <div className="w-16 h-16 flex items-center justify-center">
                        {loading ? (
                            <svg
                                className="w-10 h-10 text-blue-500 animate-spin"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                ></circle>
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                                ></path>
                            </svg>
                        ) : error ? (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-12 h-12 text-red-500"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        ) : status ? (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-12 h-12 text-yellow-400"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                            >
                                <path d="M12 2a7 7 0 0 0-4 12.73V18a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-3.27A7 7 0 0 0 12 2zm1 14h-2v-2h2v2zm-2-4v-4h2v4h-2z" />
                            </svg>
                        ) : (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-11 h-11 text-gray-400"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                            >
                                <path d="M12 2a7 7 0 0 0-4 12.73V18a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-3.27A7 7 0 0 0 12 2zm1 14h-2v-2h2v2zm-1-4a1 1 0 0 1-1-1V8a1 1 0 0 1 2 0v3a1 1 0 0 1-1 1z" />
                            </svg>
                        )}
                    </div>
                    <div>
                        <p className="text-lg font-semibold dark:text-gray-100">
                            {loading ? (
                                <span className="text-gray-500">Memuat...</span>
                            ) : error ? (
                                <span className="text-red-500">{error}</span>
                            ) : (
                                <span
                                    className={
                                        status
                                            ? "text-yellow-500"
                                            : "text-gray-400"
                                    }
                                >
                                    {status ? "ON" : "OFF"}
                                </span>
                            )}
                        </p>
                    </div>
                </div>
                <button
                    onClick={toggleLed}
                    disabled={loading}
                    className={`w-auto px-4 py-2 rounded text-white font-semibold transition ${
                        loading
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-blue-500 hover:bg-blue-600"
                    }`}
                >
                    {loading ? "Memproses..." : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 16 16"><path fill="currentColor" fillRule="evenodd" d="M7.25 7.25a.75.75 0 0 0 1.5 0V.75a.75.75 0 0 0-1.5 0v6.5Zm4.04 5.157A5.5 5.5 0 1 1 5 3.39a.75.75 0 1 0-.818-1.257a7 7 0 1 0 7.635 0A.75.75 0 0 0 11 3.39a5.5 5.5 0 0 1 .291 9.017Z" clipRule="evenodd"/></svg>
                    )}
                </button>
            </div>
        </DashboardCard>
    );
}
