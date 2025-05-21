import { useState, useEffect } from "react";

export default function DarkModeToggle() {
    const [isDark, setIsDark] = useState(() => {
        const theme = localStorage.getItem("theme");
        if (theme === "dark") return true;
        if (theme === "light") return false;
        return window.matchMedia("(prefers-color-scheme: dark)").matches;
    });

    useEffect(() => {
        const root = document.documentElement;
        if (isDark) {
            root.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            root.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    }, [isDark]);

    return (
        <button
            onClick={() => setIsDark(!isDark)}
            className="absolute top-4 left-4 p-2 rounded-full bg-white dark:bg-gray-800 text-black dark:text-white shadow-md transition-colors duration-500"
            aria-label="Toggle Dark Mode"
        >
            {isDark ? (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-moon-icon lucide-moon"
                >
                    <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
                </svg>
            ) : (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-sun-medium-icon lucide-sun-medium"
                >
                    <circle cx="12" cy="12" r="4" />
                    <path d="M12 3v1" />
                    <path d="M12 20v1" />
                    <path d="M3 12h1" />
                    <path d="M20 12h1" />
                    <path d="m18.364 5.636-.707.707" />
                    <path d="m6.343 17.657-.707.707" />
                    <path d="m5.636 5.636.707.707" />
                    <path d="m17.657 17.657.707.707" />
                </svg>
            )}
        </button>
    );
}
