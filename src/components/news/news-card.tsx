"use client";

import { NewsArticle } from '@/lib/types/news';
import { Clock, ExternalLink, Sparkles } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import AutoTagButton from '@/components/image-tags/auto-tag-button';
import ImageTagDisplay from '@/components/image-tags/image-tag-display';

interface NewsCardProps {
  article: NewsArticle;
  featured?: boolean;
  index?: number;
}

export default function NewsCard({ article, featured = false, index = 0 }: NewsCardProps) {
  const [tags, setTags] = useState<any>(null);
  const [showTags, setShowTags] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Set mounted state after hydration
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Safely parse the date
  const getTimeAgo = () => {
    if (!isMounted) return 'Recently';
    
    try {
      const date = new Date(article.publishedAt);
      if (isNaN(date.getTime())) {
        return 'Recently';
      }
      return formatDistanceToNow(date, { addSuffix: true });
    } catch {
      return 'Recently';
    }
  };
  
  const timeAgo = getTimeAgo();

  const handleTagged = (newTags: any) => {
    setTags(newTags);
    setShowTags(true);
  };

  if (featured) {
    return (
      <div className="space-y-4">
        <div
          className="group relative block overflow-hidden rounded-xl border border-[rgba(240,246,252,0.1)] bg-[rgba(22,27,34,0.6)] backdrop-blur-xl transition-all duration-500 hover:border-purple-500/50 hover:shadow-[0_0_40px_rgba(163,113,247,0.4)] hover:scale-[1.02]"
          style={{
            animation: `fadeInScale 0.8s cubic-bezier(0.16, 1, 0.3, 1) backwards`
          }}
        >
          {/* Shimmer effect */}
          <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden rounded-xl opacity-0 transition-opacity duration-500 group-hover:opacity-100">
            <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_ease-in-out] bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:translate-x-full" />
          </div>

          {/* Liquid glass glow */}
          <div className="pointer-events-none absolute inset-0 z-10 rounded-xl bg-gradient-to-br from-purple-500/10 via-transparent to-pink-500/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

          {article.urlToImage && (
            <div className="relative h-48 sm:h-64 md:h-72 lg:h-80 w-full overflow-hidden bg-[#0d1117]">
              <Image
                src={article.urlToImage}
                alt={article.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 1200px"
                className="object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
                unoptimized
              />
              {/* Image overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d1117] via-transparent to-transparent opacity-60" />
              
              {/* AI Tag Button Overlay */}
              <div className="absolute top-4 right-4 z-20">
                <AutoTagButton
                  imageUrl={article.urlToImage}
                  articleTitle={article.title}
                  articleUrl={article.url}
                  onTagged={handleTagged}
                  compact
                />
              </div>
            </div>
          )}
          <div className="relative z-20 p-4 sm:p-5 md:p-6">
            <div className="mb-3 flex items-center gap-2 text-sm text-[#8b949e]">
              <span className="relative font-medium text-[#2da44e] transition-all duration-300 group-hover:scale-105">
                <span className="absolute inset-0 animate-pulse rounded bg-[#2da44e]/20 opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-100" />
                <span className="relative">{article.source.name}</span>
              </span>
              <span>•</span>
              <div className="flex items-center gap-1 transition-all duration-300 group-hover:translate-x-1">
                <Clock className="h-3.5 w-3.5" />
                <span>{timeAgo}</span>
              </div>
            </div>
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <h2 className="mb-3 text-xl sm:text-2xl font-semibold leading-tight text-white transition-all duration-300 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 group-hover:bg-clip-text">
                {article.title}
              </h2>
              {article.description && (
                <p className="line-clamp-3 text-sm sm:text-base text-[#7d8590] transition-colors duration-300 group-hover:text-[#8b949e]">{article.description}</p>
              )}
              <div className="mt-4 flex items-center gap-2 text-sm font-medium text-[#1f6feb] transition-all duration-300 group-hover:translate-x-2 group-hover:text-purple-400">
                Read more <ExternalLink className="h-4 w-4 transition-transform duration-300 group-hover:rotate-12" />
              </div>
            </a>
          </div>
        </div>

        {/* Show Tags Below Featured Card */}
        {showTags && tags && (
          <div 
            className="rounded-xl border border-[rgba(240,246,252,0.1)] bg-[rgba(22,27,34,0.6)] p-6 backdrop-blur-xl"
            style={{
              animation: 'fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) backwards'
            }}
          >
            <ImageTagDisplay tags={tags} />
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div
        className="group relative block overflow-hidden rounded-lg border border-[rgba(240,246,252,0.1)] bg-[rgba(22,27,34,0.6)] backdrop-blur-xl transition-all duration-500 hover:border-purple-500/50 hover:shadow-[0_0_30px_rgba(163,113,247,0.3)] hover:scale-[1.03] hover:-translate-y-1"
        style={{
          animation: `fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.08}s backwards`
        }}
      >
        {/* Liquid glass background on hover */}
        <div className="pointer-events-none absolute inset-0 scale-95 rounded-lg bg-gradient-to-br from-purple-500/10 via-transparent to-pink-500/10 opacity-0 backdrop-blur-xl transition-all duration-500 group-hover:scale-100 group-hover:opacity-100" />
        
        {/* Shimmer effect */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-lg opacity-0 transition-opacity duration-500 group-hover:opacity-100">
          <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
        </div>

        <div className="relative z-10">
          {article.urlToImage && (
            <div className="relative mb-4 h-40 sm:h-44 md:h-48 w-full overflow-hidden rounded-md bg-[#0d1117]">
              <Image
                src={article.urlToImage}
                alt={article.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                className="object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
                unoptimized
              />
              
              {/* AI Tag Button Overlay */}
              <div className="absolute top-2 right-2 z-20">
                <AutoTagButton
                  imageUrl={article.urlToImage}
                  articleTitle={article.title}
                  articleUrl={article.url}
                  onTagged={handleTagged}
                  compact
                />
              </div>
            </div>
          )}
          
          <div className="p-3 sm:p-4">
            <div className="mb-2 sm:mb-3 flex items-center gap-2 text-xs sm:text-sm text-[#8b949e] transition-all duration-300 group-hover:translate-x-1">
              <span className="relative font-medium text-[#2da44e] transition-all duration-300 group-hover:scale-105">
                <span className="absolute inset-0 animate-pulse rounded bg-[#2da44e]/20 opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-100" />
                <span className="relative">{article.source.name}</span>
              </span>
              <span>•</span>
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3 sm:h-3.5 sm:w-3.5 transition-transform duration-300 group-hover:rotate-12" />
                <span>{timeAgo}</span>
              </div>
            </div>
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <h3 className="mb-2 text-base sm:text-lg font-semibold leading-snug text-white transition-all duration-300 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 group-hover:bg-clip-text">
                {article.title}
              </h3>
              {article.description && (
                <p className="line-clamp-2 text-xs sm:text-sm text-[#7d8590] transition-colors duration-300 group-hover:text-[#8b949e]">{article.description}</p>
              )}
            </a>
          </div>
        </div>
      </div>

      {/* Show Compact Tags Below Regular Card */}
      {showTags && tags && (
        <div 
          className="rounded-lg border border-[rgba(240,246,252,0.1)] bg-[rgba(22,27,34,0.6)] p-3 backdrop-blur-xl"
          style={{
            animation: 'fadeInUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) backwards'
          }}
        >
          <ImageTagDisplay tags={tags} compact />
        </div>
      )}
    </div>
  );
}