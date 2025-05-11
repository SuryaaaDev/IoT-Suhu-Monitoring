import React, { useEffect, useState } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import "chart.js/auto";
import DashboardCard from "./DashboardCard";

export default function TemperatureChart() {
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get("/api/suhu/history");
                if (Array.isArray(res.data)) {
                    setData(res.data);
                }
            } catch (err) {
                console.error("Failed to fetch suhu history:", err);
                setData([]);
            }
        };

        fetchData();
        const interval = setInterval(fetchData, 5000);
        return () => clearInterval(interval);
    }, []);

    const chartData = {
        labels: data.map((d) => new Date(d.created_at).toLocaleTimeString()),
        datasets: [
            {
                label: "Temperature (°C)",
                data: data.map((d) => d.suhu),
                borderColor: "rgba(255, 99, 132, 1)",
                backgroundColor: "rgba(255, 99, 132, 0.2)",
                tension: 0.1,
                fill: true,
            },
            {
                label: "Humidity (%)",
                data: data.map((d) => d.kelembaban),
                borderColor: "rgba(54, 162, 235, 1)",
                backgroundColor: "rgba(54, 162, 235, 0.2)",
                tension: 0.1,
                fill: true,
            },
        ],
    };

    const totalPages = Math.ceil(data.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

    const handlePrevPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    return (
        <div className="space-y-6">
            <DashboardCard title="Grafik Suhu">
                {data.length > 0 ? (
                    <Line data={chartData} />
                ) : (
                    <span className="text-gray-500">Memuat...</span>
                )}
            </DashboardCard>

            <DashboardCard title="Tabel Data">
                {data.length > 0 ? (
                    <>
                        <div className="overflow-x-auto rounded border border-gray-300 shadow-sm dark:border-gray-600">
                            <table className="min-w-full divide-y-2 divide-gray-200 dark:divide-gray-700">
                                <thead className="ltr:text-left rtl:text-right">
                                    <tr className="*:font-medium *:text-gray-900 dark:*:text-white">
                                        <th className="px-3 py-2 whitespace-nowrap">
                                            No
                                        </th>
                                        <th className="px-3 py-2 whitespace-nowrap">
                                            Waktu
                                        </th>
                                        <th className="px-3 py-2 whitespace-nowrap">
                                            Suhu (°C)
                                        </th>
                                        <th className="px-3 py-2 whitespace-nowrap">
                                            Kelembaban (%)
                                        </th>
                                    </tr>
                                </thead>

                                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                    {currentItems.map((d, index) => (
                                        <tr
                                            key={d.id || index}
                                            className="*:text-gray-900 *:first:font-medium dark:*:text-white"
                                        >
                                            <td className="px-3 py-2 whitespace-nowrap">
                                                {indexOfFirstItem + index + 1}
                                            </td>
                                            <td className="px-3 py-2 whitespace-nowrap">
                                                {new Date(
                                                    d.created_at
                                                ).toLocaleTimeString([], {
                                                    hour: "2-digit",
                                                    minute: "2-digit",
                                                    second: "2-digit",
                                                })}
                                            </td>
                                            <td className="px-3 py-2 whitespace-nowrap">
                                                {d.suhu}
                                            </td>
                                            <td className="px-3 py-2 whitespace-nowrap">
                                                {d.kelembaban}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="flex justify-between items-center mt-4">
                            <button
                                onClick={handlePrevPage}
                                disabled={currentPage === 1}
                                className="px-3 py-1 cursor-pointer bg-blue-500 dark:text-white rounded disabled:opacity-50"
                            >
                                Prev
                            </button>
                            <span className="dark:text-white">
                                Page {currentPage} of {totalPages}
                            </span>
                            <button
                                onClick={handleNextPage}
                                disabled={currentPage === totalPages}
                                className="px-3 py-1 cursor-pointer bg-blue-500 dark:text-white rounded disabled:opacity-50"
                            >
                                Next
                            </button>
                        </div>
                    </>
                ) : (
                    <span className="text-gray-500">Memuat...</span>
                )}
            </DashboardCard>
        </div>
    );
}
