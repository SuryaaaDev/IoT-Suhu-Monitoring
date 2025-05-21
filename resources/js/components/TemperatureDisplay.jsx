import React, { useEffect, useState } from "react";
import axios from "axios";
import DashboardCard from "./DashboardCard";

export default function TemperatureDisplay({ onHighTemp }) {
    const [suhu, setSuhu] = useState(null);
    const [humidity, setHumidity] = useState(null);

    useEffect(() => {
        const fetchSuhu = async () => {
            try {
                const res = await axios.get("/api/suhu/latest");
                setSuhu(res.data?.suhu);
                setHumidity(res.data?.kelembaban);

                if (res.data?.suhu > 30) {
                    onHighTemp(true);
                } else {
                    onHighTemp(false);
                }
            } catch (err) {
                console.error(err);
            }
        };

        fetchSuhu();
        const interval = setInterval(fetchSuhu, 1000);
        return () => clearInterval(interval);
    }, [onHighTemp]);

    return (
        <>
            <DashboardCard>
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
                    <div className={`flex items-center justify-center w-20 h-20 sm:w-16 sm:h-16 rounded-full ${
                                suhu < 30
                                    ? "bg-green-100 dark:bg-green-900"
                                    : "bg-red-100 dark:bg-red-900"
                            }`}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className={`w-10 h-10 sm:w-8 sm:h-8 ${
                                suhu < 30
                                    ? "text-green-500 dark:text-green-400"
                                    : "text-red-500 dark:text-red-400"
                            }`}
                            viewBox="0 0 16 16"
                            fill="currentColor"
                        >
                            <path d="M8.5 15a3.5 3.5 0 0 1-1.75-6.532L7 8.324V2.5A1.496 1.496 0 0 1 9.908 2H8.5v1H10v1H8.5v1H10v1H8.5v1H10v1.324l.25.144A3.5 3.5 0 0 1 8.5 15M11 7.758V2.5a2.5 2.5 0 1 0-5 0v5.258a4.5 4.5 0 1 0 5 0" />
                            <path d="M8.5 9a2.5 2.5 0 1 1 0 5a2.5 2.5 0 0 1 0-5" />
                        </svg>
                    </div>

                    <div className="text-center sm:text-left">
                        <p className="text-base text-gray-600 dark:text-gray-300">
                            Suhu
                        </p>
                        <p
                            className={`text-4xl sm:text-3xl font-bold ${
                                suhu < 30
                                    ? "text-green-500 dark:text-green-400"
                                    : "text-red-500 dark:text-red-400"
                            }`}
                        >
                            {suhu !== null ? (
                                `${suhu}°C`
                            ) : (
                                <span className="text-gray-400 text-sm">
                                    ---
                                </span>
                            )}
                        </p>
                    </div>
                </div>
            </DashboardCard>

            <DashboardCard>
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
                    <div className="flex items-center justify-center w-20 h-20 sm:w-16 sm:h-16 rounded-full bg-blue-100 dark:bg-blue-900">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-10 h-10 sm:w-8 sm:h-8 text-blue-500 dark:text-blue-300"
                            viewBox="0 0 32 32"
                        >
                            <path
                                fill="currentColor"
                                d="M23.476 13.993L16.847 3.437a1.04 1.04 0 0 0-1.694 0L8.494 14.043A9.986 9.986 0 0 0 7 19a9 9 0 0 0 18 0a10.063 10.063 0 0 0-1.524-5.007ZM16 26a7.009 7.009 0 0 1-7-7a7.978 7.978 0 0 1 1.218-3.943l.935-1.49l10.074 10.074A6.977 6.977 0 0 1 16 26.001Z"
                            />
                        </svg>
                    </div>

                    <div className="text-center sm:text-left">
                        <p className="text-base text-gray-600 dark:text-gray-300">
                            Kelembaban
                        </p>
                        <p className="text-4xl sm:text-3xl font-bold text-blue-500 dark:text-blue-300">
                            {humidity !== null ? (
                                `${humidity}%`
                            ) : (
                                <span className="text-gray-400 text-sm">
                                    ---
                                </span>
                            )}
                        </p>
                    </div>
                </div>
            </DashboardCard>
        </>
    );
}
