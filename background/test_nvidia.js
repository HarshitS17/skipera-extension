// Run: NVIDIA_API_KEY=... node background/test_nvidia.js
const apiKey = process.env.NVIDIA_API_KEY;

if (!apiKey) {
  throw new Error("NVIDIA_API_KEY is required");
}

async function test() {
  try {
    const res = await fetch("https://integrate.api.nvidia.com/v1/models", {
      headers: { Authorization: `Bearer ${apiKey}` },
    });
    if (!res.ok) {
      throw new Error(`NVIDIA API request failed: ${res.status} ${res.statusText}`);
    }
    const data = await res.json();
    console.log(`Success: received ${data.data?.length ?? 0} model(s)`);
  } catch (e) {
    console.error("Error:", e);
  }
}
test();
