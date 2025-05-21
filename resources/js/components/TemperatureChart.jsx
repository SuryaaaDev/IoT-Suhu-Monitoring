import React, { useEffect, useState } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import "chart.js/auto";
import DashboardCard from "./DashboardCard";

export default function TemperatureChart() {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get("/api/suhu/chart");
                if (Array.isArray(res.data)) {
                    setData(res.data);
                }
            } catch (err) {
                console.error("Gagal mengambil data suhu:", err);
                setData([]);
            }
        };

        fetchData();
        const interval = setInterval(fetchData, 5000);
        return () => clearInterval(interval);
    }, []);

    const labels = data.map((d) =>
        new Date(d.created_at).toLocaleTimeString("id-ID", {
            hour: "2-digit",
            hour12: false,
            minute: "2-digit",
        })
    );

    const chartData = {
        labels,
        datasets: [
            {
                label: "Suhu (°C)",
                data: data.map((d) => d.suhu),
                borderColor: "#ef4444",
                backgroundColor: "rgba(239, 68, 68, 0.1)",
                tension: 0.3,
                pointRadius: 2,
                fill: true,
            },
            {
                label: "Kelembaban (%)",
                data: data.map((d) => d.kelembaban),
                borderColor: "#3b82f6",
                backgroundColor: "rgba(59, 130, 246, 0.1)",
                tension: 0.3,
                pointRadius: 2,
                fill: true,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: "top",
                labels: {
                    color: "#374151",
                    font: {
                        size: 12,
                        weight: "bold",
                    },
                },
            },
            tooltip: {
                mode: "index",
                intersect: false,
                backgroundColor: "#111827",
                titleColor: "#fff",
                bodyColor: "#f3f4f6",
            },
        },
    };

    return (
        <DashboardCard title="Grafik Suhu & Kelembaban">
            <div className="h-96 md:h-[30rem]">
                {data.length > 0 ? (
                    <Line data={chartData} options={chartOptions} />
                ) : (
                    <span className="text-gray-500">Memuat grafik...</span>
                )}
            </div>
        </DashboardCard>
    );
}
