"use client";

import { useState, useEffect } from 'react';
import NewsCard from './news-card';
import { NewsArticle, NewsCategory } from '@/lib/types/news';
import { RefreshCw, Loader2 } from 'lucide-react';

interface NewsGridProps {
  initialArticles: NewsArticle[];
  category?: NewsCategory;
}

export default function NewsGrid({ initialArticles, category }: NewsGridProps) {
  const [articles, setArticles] = useState<NewsArticle[]>(initialArticles);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [countdown, setCountdown] = useState(60);

  const fetchNews = async () => {
    setIsRefreshing(true);
    try {
      const params = new URLSearchParams();
      if (category) params.set('category', category);
      
      const response = await fetch(`/api/news?${params.toString()}`);
      const data = await response.json();
      
      if (data.articles) {
        setArticles(data.articles);
        setLastUpdated(new Date());
        setCountdown(60);
      }
    } catch (error) {
      console.error('Failed to fetch news:', error);
    } finally {
      setIsRefreshing(false);
    }
  };

  // Auto-refresh every 1 minute for latest news
  useEffect(() => {
    const refreshInterval = setInterval(() => {
      fetchNews();
    }, 60000);

    return () => clearInterval(refreshInterval);
  }, [category]);

  // Countdown timer
  useEffect(() => {
    const countdownInterval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) return 60;
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(countdownInterval);
  }, []);

  const formatCountdown = (seconds: number) => {
    return `${seconds}s`;
  };

  if (articles.length === 0) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="text-center">
          <Loader2 className="mx-auto h-12 w-12 animate-spin text-purple-500" />
          <p className="mt-4 text-[#8b949e]">Loading news...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Refresh Bar with Liquid Glass */}
      <div className="group relative mb-6 overflow-hidden rounded-xl border border-[rgba(240,246,252,0.15)] bg-gradient-to-br from-[rgba(22,27,34,0.8)] via-[rgba(22,27,34,0.7)] to-[rgba(22,27,34,0.8)] px-6 py-4 shadow-[0_8px_32px_rgba(0,0,0,0.3)] backdrop-blur-xl transition-all duration-500 hover:shadow-[0_8px_40px_rgba(163,113,247,0.2)]">
        {/* Animated gradient overlay */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-purple-500/5 via-pink-500/5 to-purple-500/5 opacity-50" />
        
        {/* Shimmer effect */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-xl opacity-0 transition-opacity duration-500 group-hover:opacity-100">
          <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_ease-in-out] bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:translate-x-full" />
        </div>

        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-sm font-medium text-white">Live Updates</span>
            </div>
            <div className="h-4 w-px bg-[rgba(240,246,252,0.1)]" />
            <div className="text-sm text-[#8b949e] transition-all duration-300 group-hover:translate-x-1">
              Last updated: <span className="font-medium text-white">{lastUpdated.toLocaleTimeString()}</span>
            </div>
            <div className="h-4 w-px bg-[rgba(240,246,252,0.1)]" />
            <div className="text-sm text-[#8b949e]">
              Next update in: <span className="font-medium text-purple-400 transition-all duration-300 group-hover:scale-110 inline-block">{formatCountdown(countdown)}</span>
            </div>
          </div>
          <button
            onClick={fetchNews}
            disabled={isRefreshing}
            className="group/btn relative overflow-hidden flex items-center gap-2 rounded-lg border border-[rgba(240,246,252,0.2)] bg-gradient-to-br from-white/5 to-purple-500/5 px-4 py-2 text-sm font-medium text-white backdrop-blur-xl transition-all duration-500 hover:scale-105 hover:border-purple-500/50 hover:shadow-[0_0_20px_rgba(163,113,247,0.4)] disabled:opacity-50 disabled:hover:scale-100"
          >
            {/* Button shimmer */}
            <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 transition-all duration-700 group-hover/btn:translate-x-full group-hover/btn:opacity-100" />
            
            <RefreshCw className={`relative z-10 h-4 w-4 transition-all duration-500 ${isRefreshing ? 'animate-spin' : 'group-hover/btn:rotate-180'}`} />
            <span className="relative z-10">{isRefreshing ? 'Refreshing...' : 'Refresh Now'}</span>
          </button>
        </div>
      </div>

      {/* Featured Article */}
      {articles[0] && (
        <div className="mb-8">
          <NewsCard article={articles[0]} featured />
        </div>
      )}

      {/* News Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {articles.slice(1).map((article, index) => (
          <NewsCard key={`${article.link}-${index}`} article={article} index={index} />
        ))}
      </div>
    </div>
  );
}