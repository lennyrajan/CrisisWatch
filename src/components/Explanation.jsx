import React from "react";
import ReactMarkdown from "react-markdown";

export default function Explanation({ markdown }) {
  if (!markdown) return <p>Loading explanation...</p>;

  return (
    <section style={{ marginTop: 30 }}>
      <h2>What’s Happening?</h2>
      <ReactMarkdown>{markdown}</ReactMarkdown>
    </section>
  );
}
