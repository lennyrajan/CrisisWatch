import React, { useEffect, useState } from "react";
import Status from "./components/Status";
import Timeline from "./components/Timeline";
import Explanation from "./components/Explanation";

export default function App() {
  const [status, setStatus] = useState(null);
  const [timeline, setTimeline] = useState([]);
  const [explanation, setExplanation] = useState("");

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

  return (
    <div style={{ maxWidth: 800, margin: "auto", padding: 20, fontFamily: "Arial, sans-serif" }}>
      <h1>CrisisWatch</h1>
      <Status status={status} />
      <Timeline events={timeline} />
      <Explanation markdown={explanation} />
      <footer style={{ marginTop: 40, fontSize: 12, color: "#666", textAlign: "center" }}>
        &copy; 2025 CrisisWatch
      </footer>
    </div>
  );
}
