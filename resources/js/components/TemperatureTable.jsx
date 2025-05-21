import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import DashboardCard from "./DashboardCard";

export default function TemperatureTable() {
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const itemsPerPage = 10;
    const intervalRef = useRef(null);

    const fetchData = async (page = currentPage, replace = false) => {
        try {
            const res = await axios.get("/api/suhu/history", {
                params: {
                    page,
                    per_page: itemsPerPage,
                },
            });

            const newData = res.data.data;
            const uniqueNewData = newData.filter(
                (newItem) => !data.some((existing) => existing.id === newItem.id)
            );

            setLastPage(res.data.last_page);

            if (replace || page !== 1) {
                setData(newData);
            } else if (uniqueNewData.length > 0) {
                setData((prev) => [...uniqueNewData, ...prev].slice(0, itemsPerPage));
            }
        } catch (err) {
            console.error("Gagal mengambil data suhu:", err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        setIsLoading(true);
        fetchData(currentPage, true);

        if (intervalRef.current) clearInterval(intervalRef.current);

        intervalRef.current = setInterval(() => fetchData(1, false), 5000);
        return () => clearInterval(intervalRef.current);
    }, [currentPage]);

    return (
        <DashboardCard title="Tabel Data Sensor">
            {!isLoading && data.length > 0 ? (
                <>
                    <div className="overflow-x-auto rounded-lg border-2 border-gray-300 shadow-sm dark:border-gray-600">
                        <table className="min-w-full divide-y-2 divide-gray-200 dark:divide-gray-600">
                            <thead className="ltr:text-left rtl:text-right">
                                <tr className="*:font-medium *:text-gray-900 dark:*:text-white">
                                    <th className="px-3 py-2 whitespace-nowrap">No</th>
                                    <th className="px-3 py-2 whitespace-nowrap">Waktu</th>
                                    <th className="px-3 py-2 whitespace-nowrap">Suhu (°C)</th>
                                    <th className="px-3 py-2 whitespace-nowrap">Kelembaban (%)</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                {data.map((d, index) => (
                                    <tr
                                        key={d.id || index}
                                        className="*:text-gray-900 *:first:font-medium dark:*:text-white text-center hover:bg-gray-50/10 transition-all duration-300"
                                    >
                                        <td className="px-3 py-2 whitespace-nowrap">
                                            {(currentPage - 1) * itemsPerPage + index + 1}
                                        </td>
                                        <td className="px-3 py-2 whitespace-nowrap">
                                            {new Date(d.created_at).toLocaleTimeString("id-ID", {
                                                hour: "2-digit",
                                                hour12: false,
                                                minute: "2-digit",
                                            })}
                                        </td>
                                        <td className="px-3 py-2 whitespace-nowrap">{d.suhu}</td>
                                        <td className="px-3 py-2 whitespace-nowrap">{d.kelembaban}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="flex justify-end items-center mt-4 flex-wrap gap-1">
                        <button
                            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                            className="px-3 py-1 bg-blue-700 text-white rounded disabled:opacity-50"
                            disabled={currentPage === 1}
                        >
                            &lt;
                        </button>

                        <button
                            onClick={() => setCurrentPage(1)}
                            className={`px-3 py-1 rounded ${currentPage === 1
                                ? "bg-blue-700 text-white"
                                : "bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
                                }`}
                        >
                            1
                        </button>

                        {currentPage > 3 && <span className="px-2">...</span>}

                        {currentPage !== 1 && currentPage !== lastPage && (
                            <button
                                className="px-3 py-1 rounded bg-blue-700 text-white"
                                disabled
                            >
                                {currentPage}
                            </button>
                        )}

                        {currentPage < lastPage - 2 && <span className="px-2">...</span>}

                        {lastPage > 1 && (
                            <button
                                onClick={() => setCurrentPage(lastPage)}
                                className={`px-3 py-1 rounded ${currentPage === lastPage
                                    ? "bg-blue-700 text-white"
                                    : "bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
                                    }`}
                            >
                                {lastPage}
                            </button>
                        )}

                        <button
                            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, lastPage))}
                            className="px-3 py-1 bg-blue-700 text-white rounded disabled:opacity-50"
                            disabled={currentPage === lastPage}
                        >
                            &gt;
                        </button>
                    </div>
                </>
            ) : (
                <span className="text-gray-500">Memuat tabel...</span>
            )}
        </DashboardCard>
    );
}
