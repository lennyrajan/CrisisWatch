import React from "react";

export default function Timeline({ events }) {
  if (!events.length) return <p>Loading timeline...</p>;

  return (
    <section style={{ marginTop: 30 }}>
      <h2>Timeline of Events</h2>
      <ul>
        {events.map(({ date, title, description }, i) => (
          <li key={i} style={{ marginBottom: 15 }}>
            <strong>{new Date(date).toLocaleString()}</strong>
            <br />
            <em>{title}</em>
            <p>{description}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
