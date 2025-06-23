import React from "react";

export default function Status({ status }) {
  if (!status) return <p>Loading current status...</p>;

  return (
    <section>
      <h2>Current Status</h2>
      <p><strong>Last Updated:</strong> {new Date(status.lastUpdated).toLocaleString()}</p>
      <p><strong>Brent Oil Price:</strong> ${status.brentPrice?.toFixed(2)}</p>
      <p><strong>Alert Level:</strong> {status.alertLevel}</p>
      <h3>Top Headlines:</h3>
      <ul>
        {status.topHeadlines?.map((title, i) => (
          <li key={i}>{title}</li>
        ))}
      </ul>
    </section>
  );
}
