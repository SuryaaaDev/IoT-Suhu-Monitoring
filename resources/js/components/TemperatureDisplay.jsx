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
            <DashboardCard title="Suhu">
                <div className="space-y-2 flex">
                    <p
                        className={`text-3xl font-bold ${
                            suhu < 30 ? "text-green-500 dark:text-green-400" : "text-red-500 dark:text-red-400"
                        }`}
                    >
                        {suhu !== null ? (
                            `${suhu}°C`
                        ) : (
                            <span className="text-gray-500 text-sm font-medium">
                                Memuat...
                            </span>
                        )}
                    </p>
                </div>
            </DashboardCard>
            <DashboardCard title="Kelembaban">
                <div className="space-y-2">
                    <p className="text-3xl font-bold text-blue-500 dark:text-blue-300">
                        {humidity !== null ? (
                            `${humidity}%`
                        ) : (
                            <span className="text-gray-500 text-sm">
                                Memuat...
                            </span>
                        )}
                    </p>
                </div>
            </DashboardCard>
        </>
    );
}
