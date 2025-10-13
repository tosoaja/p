import { useState } from "react";

export default function Home() {
  const [file, setFile] = useState(null);
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return alert("Pilih file dulu");

    setLoading(true);
    setResponse("Mengupload...");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const text = await res.text();
      setResponse(text);
    } catch (err) {
      setResponse("Gagal: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-6 rounded-2xl shadow-md w-full max-w-md text-center">
        <h1 className="text-2xl font-bold mb-4">File Uploader — Catbox.moe</h1>

        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          className="border p-2 w-full rounded mb-3"
        />
        <button
          onClick={handleUpload}
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded w-full"
        >
          {loading ? "Uploading..." : "Upload"}
        </button>

        <p className="mt-4 text-left text-sm font-mono break-all bg-gray-50 p-3 rounded">
          {response}
        </p>
      </div>
    </div>
  );
  }
