import React, { useEffect, useState } from "react";
import axios from "axios";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import DashboardCard from "./DashboardCard";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function PieTemperatureChart() {
    const [chartData, setChartData] = useState({
        over30: 0,
        underOrEqual30: 0,
    });

    useEffect(() => {
        const fetchSummary = async () => {
            try {
                const res = await axios.get("/api/suhu/summary");
                setChartData(res.data);
            } catch (error) {
                console.error("Gagal mengambil ringkasan suhu:", error);
            }
        };

        fetchSummary();
        const interval = setInterval(fetchSummary, 5000);
        return () => clearInterval(interval);
    }, []);

    const data = {
        labels: ["Suhu > 30°C", "Suhu ≤ 30°C"],
        datasets: [
            {
                label: "Jumlah",
                data: [chartData.over30, chartData.underOrEqual30],
                backgroundColor: ["#F43F5E", "#22C55E"],
                borderColor: ["#FB7185", "#4ADE80"], 
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "bottom",
            },
        },
    };

    return (
        <DashboardCard title="Rasio Data Suhu">
            {chartData.over30 + chartData.underOrEqual30 > 0 ? (
                <Pie data={data} options={options} />
            ) : (
                <span className="text-gray-500">Memuat grafik...</span>
            )}
        </DashboardCard>
    );
}
