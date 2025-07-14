"use client";
import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import {
  LinkIcon,
  ClipboardDocumentIcon,
  ChartBarIcon,
  ArrowTopRightOnSquareIcon,
  GlobeAltIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";

export default function Home() {
  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);
  const [analytics, setAnalytics] = useState({});

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("shortHistory")) || [];
    setHistory(stored);
    stored.forEach((item) => fetchAnalytics(item.code, false));
  }, []);

  const isValidUrl = (string) => {
    try {
      new URL(string);
      return true;
    } catch {
      return false;
    }
  };

  const handleShorten = async () => {
    if (!longUrl || !isValidUrl(longUrl)) {
      toast.error("Please enter a valid URL.");
      return;
    }
    setLoading(true);
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/shorten`,
        { url: longUrl }
      );
      const { short_url, original_url, code } = res.data;
      setShortUrl(short_url);
      toast.success("Short URL generated successfully!");

      const newEntry = { original: original_url, short: short_url, code };
      const updatedHistory = [newEntry, ...history].slice(0, 5);
      setHistory(updatedHistory);
      localStorage.setItem("shortHistory", JSON.stringify(updatedHistory));
      fetchAnalytics(code, true);
      setLongUrl("");
    } catch (err) {
      console.error("Shorten error:", err);
      toast.error("Failed to shorten URL. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const fetchAnalytics = async (code, overwrite = false) => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/analytics/${code}`
      );
      const count = res.data.click_count;
      setAnalytics((prev) =>
        overwrite || prev[code] === undefined || prev[code] !== count
          ? { ...prev, [code]: count }
          : prev
      );
    } catch (error) {
      console.error(`Analytics fetch failed for code: ${code}`, error);
      setAnalytics((prev) => ({ ...prev, [code]: "Error" }));
    }
  };

  const handleLinkClick = (code) => {
    setTimeout(() => fetchAnalytics(code, true), 3000);
  };

  const handleCopy = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Copied to clipboard!");
    } catch {
      toast.error("Failed to copy");
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex flex-col items-center px-4 py-12 font-sans">
      <div className="w-full max-w-7xl bg-gray-800 shadow-xl rounded-3xl p-6 sm:p-10 space-y-8 border border-gray-700">
        <h1 className="text-4xl md:text-5xl font-extrabold text-center text-gray-50 leading-tight">
          <LinkIcon className="inline-block w-10 h-10 text-blue-500 mr-2 -mt-1" />
          QuickURL<span className="text-blue-500">.io</span>
        </h1>
        <p className="text-center text-gray-300 text-lg md:text-xl">
          Shorten long links with ease and track their performance.
        </p>

        {/* Input + Button */}
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            value={longUrl}
            onChange={(e) => setLongUrl(e.target.value)}
            placeholder="Paste your long URL here..."
            className="flex-grow px-5 py-3 text-lg text-gray-100 bg-gray-700 border border-gray-600 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-400 focus:border-blue-500 placeholder-gray-400"
          />
          <button
            onClick={handleShorten}
            disabled={loading}
            className="w-full sm:w-auto px-8 py-3 text-lg font-bold text-white bg-blue-600 rounded-xl hover:bg-blue-700 focus:ring-4 focus:ring-blue-500 transition shadow-md disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "Shortening..." : "Shorten It!"}
          </button>
        </div>

        {/* Short URL Box */}
        {shortUrl && (
          <div className="bg-blue-900 bg-opacity-30 border border-blue-700 rounded-xl p-5 text-center shadow-inner flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xl text-blue-300 font-medium break-all flex-grow">
              <LinkIcon className="inline-block w-6 h-6 mr-2 text-blue-400" />
              <a
                href={shortUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
                onClick={() => handleLinkClick(shortUrl.split("/").pop())}
              >
                {shortUrl}
              </a>
            </p>
            <button
              onClick={() => handleCopy(shortUrl)}
              className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center justify-center text-base"
            >
              <ClipboardDocumentIcon className="w-5 h-5 mr-2" />
              Copy
            </button>
          </div>
        )}

        {/* History */}
        {history.length > 0 && (
          <div className="pt-8 border-t border-gray-700 mt-8">
            <h2 className="text-2xl font-bold text-gray-50 mb-5 flex items-center">
              <ClockIcon className="w-7 h-7 text-gray-400 mr-2" />
              Recent Shortened URLs
            </h2>

            {/* Desktop */}
            <div className="hidden md:block overflow-x-auto shadow-md rounded-xl border border-gray-700">
              <table className="min-w-full divide-y divide-gray-700">
                <thead className="bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">
                      Original URL
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">
                      Short URL
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-300 uppercase">
                      Clicks
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-300 uppercase">
                      Copy
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-gray-800 divide-y divide-gray-700">
                  {history.map((item, idx) => (
                    <tr key={idx} className="hover:bg-gray-700">
                      <td className="px-6 py-4 text-sm text-gray-200 truncate">
                        <GlobeAltIcon className="inline-block w-5 h-5 text-gray-500 mr-2" />
                        {item.original}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <a
                          href={item.short}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => handleLinkClick(item.code)}
                          className="text-blue-400 hover:underline flex items-center"
                        >
                          {item.short}
                          <ArrowTopRightOnSquareIcon className="w-4 h-4 ml-1" />
                        </a>
                      </td>
                      <td className="px-6 py-4 text-sm text-center text-blue-300 font-semibold">
                        <ChartBarIcon className="inline-block w-5 h-5 text-blue-500 mr-1" />
                        {analytics[item.code] ?? "Loading..."}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <button
                          onClick={() => handleCopy(item.short)}
                          className="text-indigo-400 hover:text-indigo-300 p-2 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                          <ClipboardDocumentIcon className="w-5 h-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="space-y-5 md:hidden">
              {history.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-gray-800 border border-gray-700 rounded-2xl px-5 py-4 space-y-4 shadow-sm"
                >
                  <div className="text-sm text-gray-400 font-semibold flex items-center">
                    <GlobeAltIcon className="w-4 h-4 mr-2 text-gray-500" />
                    Original URL
                  </div>
                  <p className="text-sm text-gray-200 break-words">{item.original}</p>

                  <div className="text-sm text-gray-400 font-semibold flex items-center mb-1">
                    <LinkIcon className="w-4 h-4 mr-2 text-gray-500" />
                    Short URL
                  </div>
                  <div className="flex justify-between items-center">
                    <a
                      href={item.short}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => handleLinkClick(item.code)}
                      className="text-blue-400 text-sm break-all hover:underline flex items-center"
                    >
                      {item.short}
                      <ArrowTopRightOnSquareIcon className="w-4 h-4 ml-1" />
                    </a>
                  </div>

                  <div className="flex justify-between items-center mt-2">
                    <div className="flex items-center bg-blue-900 text-blue-300 text-xs font-medium px-3 py-1 rounded-full">
                      <ChartBarIcon className="w-4 h-4 mr-1" />
                      {analytics[item.code] ?? "Loading..."} clicks
                    </div>
                    <button
                      onClick={() => handleCopy(item.short)}
                      className="flex items-center text-xs px-3 py-1.5 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500"
                    >
                      <ClipboardDocumentIcon className="w-4 h-4 mr-1" /> Copy
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <footer className="text-md text-gray-400 mt-12 text-center">
        &copy; {new Date().getFullYear()} QuickURL.io. Built with ❤️ using Next.js, Express, and MongoDB.
      </footer>
    </main>
  );
}
