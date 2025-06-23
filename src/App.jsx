import React, { useEffect, useState } from "react";
import Status from "./components/Status";
import Timeline from "./components/Timeline";
import Explanation from "./components/Explanation";

export default function App() {
  const [status, setStatus] = useState(null);
  const [timeline, setTimeline] = useState([]);
  const [explanation, setExplanation] = useState("");
  const [time, setTime] = useState(new Date());
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("darkMode");
    return saved ? JSON.parse(saved) : true;
  });

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    fetch("/data/status.json")
      .then((res) => res.json())
      .then(setStatus)
      .catch(() => setStatus(null));

    fetch("/data/timeline.json")
      .then((res) => res.json())
      .then(setTimeline)
      .catch(() => setTimeline([]));

    fetch("/data/explanation.md")
      .then((res) => res.text())
      .then(setExplanation)
      .catch(() => setExplanation(""));
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  return (
    <div className="max-w-xl mx-auto p-5 font-sans bg-white dark:bg-black dark:text-white min-h-screen transition-colors duration-300">
      <div className="flex justify-between items-center mb-6">
        <div className="font-mono text-sm">{time.toLocaleTimeString()}</div>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="px-3 py-1 border rounded border-gray-600 dark:border-gray-300"
          aria-label="Toggle Dark Mode"
        >
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </div>

      <h1 className="text-3xl font-bold mb-6">CrisisWatch</h1>

      <Status status={status} />
      <Timeline events={timeline} />
      <Explanation markdown={explanation} />

      <footer className="mt-12 text-center text-xs text-gray-500 dark:text-gray-400">
        Made with <span role="img" aria-label="coffee">☕️</span> by Lenny Rajan
      </footer>
    </div>
  );
}
