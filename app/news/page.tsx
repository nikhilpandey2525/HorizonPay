"use client";

import { useEffect, useState } from "react";
import { fetchFinancialNews } from "../../lib/api"; // API function to fetch news
import Sidebar from "../../components/Sidebar"; // Left Sidebar

const NewsPage = () => {
  interface NewsArticle {
    url?: string;
    headline?: string;
    source?: string;
    datetime?: number;
    summary?: string;
  }
  
  const [news, setNews] = useState<NewsArticle[]>([]);

  useEffect(() => {
    const getNews = async () => {
      const articles = await fetchFinancialNews();
      setNews(articles || []);
    };
    getNews();
  }, []);

  return (
    <div className="flex flex-col md:flex-row gap-6 p-6 bg-gray-100 min-h-screen">
      {/* Left Sidebar */}
      <aside className="hidden md:block md:w-1/4 bg-white p-4 rounded-lg shadow-md">
        <Sidebar />
      </aside>

      {/* Main News Section (Now Wider) */}
      <main className="w-full md:w-3/4 bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-gray-900">📈 Latest Financial News</h1>
        {news.length > 0 ? (
          <ul className="space-y-6">
            {news.map((article, index) => (
              <li key={index} className="border-b pb-4">
                <a
                  href={article?.url ?? "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg text-blue-600 font-semibold hover:underline"
                >
                  {article?.headline ?? "No Title Available"}
                </a>
                <p className="text-sm text-gray-500 mt-1">
                  {article?.source ?? "Unknown Source"} -{" "}
                  {article?.datetime
                    ? new Date(article.datetime * 1000).toLocaleDateString()
                    : "Unknown Date"}
                </p>
                <p className="text-gray-700">{article?.summary ?? "No summary available."}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">Loading news...</p>
        )}
      </main>
    </div>
  );
};

export default NewsPage;
