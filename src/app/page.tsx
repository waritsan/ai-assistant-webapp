"use client";
import { useState } from "react";

function parseResponse(raw: string) {
  // Extract the value from Text(...value='...')
  const valueMatch = raw.match(/value='([^']+)'/);
  let text = valueMatch ? valueMatch[1] : raw;

  // Replace citation markers like 【4:1†source】 with a clickable link
  // Example: file_id='assistant-GLHbcZFMQGLuzpbL2btwdX'
  const fileIdMatch = raw.match(/file_id='([^']+)'/);
  const citationRegex = /【(\d+:\d+)†source】/g;
  text = text.replace(citationRegex, (match, p1) => {
    if (fileIdMatch) {
      // You may need to adjust the link format to match your backend's file download/view URL
      const url = `/api/files/${fileIdMatch[1]}`;
      return `<a href="${url}" target="_blank" class="text-blue-600 underline">${match}</a>`;
    }
    return match;
  });
  return text;
}

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResponse("");
    try {
      const endpoint = process.env.NEXT_PUBLIC_AZURE_FUNCTION_URL || "/api/openai-assistant";
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
      let data;
      const text = await res.text();
      try {
        data = JSON.parse(text);
      } catch {
        // Not JSON, treat as plain text
        setResponse(text);
        setLoading(false);
        return;
      }
      if (data.response) {
        setResponse(data.response);
      } else if (data.messages) {
        setResponse(JSON.stringify(data.messages, null, 2));
      } else if (data.error) {
        setError(data.error);
      } else {
        setError("No response from backend.");
      }
    } catch (err: any) {
      setError(err.message || "Unknown error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <h1 className="text-2xl font-bold mb-4">Azure OpenAI Assistant Demo</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-md">
        <input
          type="text"
          className="border rounded px-3 py-2"
          placeholder="Enter your prompt..."
          value={prompt}
          onChange={e => setPrompt(e.target.value)}
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Loading..." : "Send"}
        </button>
      </form>
      {response && (
        <div className="mt-6 p-4 bg-white rounded shadow w-full max-w-md">
          <h2 className="font-semibold mb-2">Response:</h2>
          <div
            className="whitespace-pre-wrap break-words text-gray-800"
            dangerouslySetInnerHTML={{ __html: parseResponse(response) }}
          />
        </div>
      )}
      {error && (
        <div className="mt-6 p-4 bg-red-100 text-red-700 rounded w-full max-w-md">
          <strong>Error:</strong> {error}
        </div>
      )}
    </div>
  );
}
