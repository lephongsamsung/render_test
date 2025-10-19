import fetch from "node-fetch";

export async function safeFetch(url, options = {}) {
  try {
    const res = await fetch(url, options);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error("❌ Fetch error:", err.message);
    return { error: err.message };
  }
}
