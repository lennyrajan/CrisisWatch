// scripts/updateStatus.js

const fs = require("fs");
const path = require("path");
const fetch = require("node-fetch");

// 🔑 Replace with your actual API keys (or use GitHub Secrets)
const ALPHA_VANTAGE_KEY = process.env.ALPHA_VANTAGE_KEY || "YOUR_ALPHA_KEY";
const NEWS_API_KEY = process.env.NEWS_API_KEY || "YOUR_NEWSAPI_KEY";

async function fetchBrentOilPrice() {
  const url = `https://www.alphavantage.co/query?function=BRENT&apikey=${ALPHA_VANTAGE_KEY}`;
  const res = await fetch(url);
  const data = await res.json();

  try {
    const latestDate = Object.keys(data["data"])[0];
    const price = parseFloat(data["data"][latestDate]["value"]);
    return price;
  } catch (err) {
    console.error("Error parsing oil data:", err);
    return null;
  }
}

async function fetchHeadlines() {
  const url = `https://newsapi.org/v2/everything?q=iran+war+OR+israel+OR+us+conflict&language=en&sortBy=publishedAt&pageSize=5&apiKey=${NEWS_API_KEY}`;
  const res = await fetch(url);
  const data = await res.json();

  try {
    return data.articles.slice(0, 3).map((a) => a.title);
  } catch (err) {
    console.error("Error parsing news data:", err);
    return [];
  }
}

async function updateStatusFile() {
  const brentPrice = await fetchBrentOilPrice();
  const headlines = await fetchHeadlines();

  const output = {
    lastUpdated: new Date().toISOString(),
    brentPrice: brentPrice,
    alertLevel: "Tense", // You can automate this later based on rules
    topHeadlines: headlines,
  };

  const filePath = path.join(__dirname, "../data/status.json");
  fs.writeFileSync(filePath, JSON.stringify(output, null, 2));
  console.log("✅ status.json updated");
}

updateStatusFile();
