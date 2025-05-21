import React from "react";

export default function DashboardCard({ title, children }) {
    return (
        <div className="bg-white shadow rounded-xl p-4 dark:bg-gray-800 transition-colors duration-500 flex flex-col justify-center">
            {title && (
                <h3 className="text-lg font-semibold mb-2 dark:text-gray-200">
                    {title}
                </h3>
            )}
            {children}
        </div>
    );
}
