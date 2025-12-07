"use client";

import { NewsCategory } from '@/lib/types/news';
import { useRouter, useSearchParams } from 'next/navigation';
import { useRef, useEffect, useState } from 'react';

const categories: { id: NewsCategory | 'TOP'; label: string }[] = [
  { id: 'TOP', label: 'Top Stories' },
  { id: 'WORLD', label: 'World' },
  { id: 'NATION', label: 'Nation' },
  { id: 'BUSINESS', label: 'Business' },
  { id: 'TECHNOLOGY', label: 'Technology' },
  { id: 'ENTERTAINMENT', label: 'Entertainment' },
  { id: 'SPORTS', label: 'Sports' },
  { id: 'SCIENCE', label: 'Science' },
  { id: 'HEALTH', label: 'Health' },
];

export default function CategoryTabs() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get('category') || 'TOP';
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    const activeIndex = categories.findIndex(cat => cat.id === activeCategory);
    const activeButton = buttonRefs.current[activeIndex];
    const container = containerRef.current;

    if (activeButton && container) {
      const containerRect = container.getBoundingClientRect();
      const buttonRect = activeButton.getBoundingClientRect();
      
      setIndicatorStyle({
        left: buttonRect.left - containerRect.left,
        width: buttonRect.width,
      });
    }
  }, [activeCategory]);

  const handleCategoryChange = (categoryId: string) => {
    if (categoryId === 'TOP') {
      router.push('/');
    } else {
      router.push(`/?category=${categoryId}`);
    }
  };

  return (
    <div className="mb-8 overflow-x-auto pb-2">
      {/* Liquid glass container with shimmer */}
      <div 
        ref={containerRef}
        className="relative inline-flex gap-2 rounded-xl border border-[rgba(240,246,252,0.15)] bg-gradient-to-br from-[rgba(22,27,34,0.8)] via-[rgba(22,27,34,0.7)] to-[rgba(22,27,34,0.8)] p-1.5 shadow-[0_8px_32px_rgba(0,0,0,0.4)] backdrop-blur-xl"
      >
        {/* Animated gradient overlay */}
        <div className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/5 via-pink-500/5 to-purple-500/5 opacity-50" />
        
        {/* Shimmer effect on container */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-xl">
          <div className="absolute inset-0 translate-x-[-100%] animate-[shimmer_3s_ease-in-out_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </div>

        {/* Sliding active indicator */}
        <div
          className="pointer-events-none absolute top-1.5 h-[calc(100%-12px)] rounded-full transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
          style={{
            left: `${indicatorStyle.left}px`,
            width: `${indicatorStyle.width}px`,
          }}
        >
          {/* Main gradient background */}
          <span className="absolute inset-0 animate-[pulse_3s_ease-in-out_infinite] rounded-full bg-gradient-to-br from-purple-600 via-pink-600 to-purple-600 opacity-90" />
          
          {/* Glass overlay */}
          <span className="absolute inset-0 rounded-full bg-gradient-to-t from-white/10 to-transparent backdrop-blur-sm" />
          
          {/* Glowing border */}
          <span className="absolute inset-0 rounded-full border border-white/20 shadow-[0_0_30px_rgba(163,113,247,0.6),inset_0_1px_1px_rgba(255,255,255,0.2)]" />
          
          {/* Shimmer effect */}
          <span className="absolute inset-0 animate-[shimmer_2s_ease-in-out_infinite] rounded-full bg-gradient-to-r from-transparent via-white/30 to-transparent" />
        </div>

        {categories.map((category, index) => {
          const isActive = activeCategory === category.id;
          
          return (
            <button
              key={category.id}
              ref={(el) => { buttonRefs.current[index] = el; }}
              onClick={() => handleCategoryChange(category.id)}
              className="group relative overflow-hidden rounded-lg px-4 py-2.5 text-sm font-medium transition-all duration-500 ease-out hover:scale-105"
              style={{
                animation: `slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.1}s backwards`
              }}
            >
              {isActive ? (
                <span className="relative z-10 text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.3)] transition-colors duration-300">
                  {category.label}
                </span>
              ) : (
                <>
                  {/* Inactive state - subtle liquid glass on hover */}
                  <span className="absolute inset-0 scale-95 rounded-lg bg-gradient-to-br from-white/5 via-purple-500/5 to-pink-500/5 opacity-0 backdrop-blur-xl transition-all duration-500 ease-out group-hover:scale-100 group-hover:opacity-100" />
                  
                  {/* Shimmer on hover */}
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 transition-all duration-700 group-hover:animate-[shimmer_2s_ease-in-out_infinite] group-hover:opacity-100" />
                  
                  {/* Glow border on hover */}
                  <span className="absolute inset-0 scale-95 rounded-lg border border-white/10 opacity-0 shadow-[0_0_20px_rgba(168,85,247,0.3)] transition-all duration-500 group-hover:scale-100 group-hover:opacity-100" />
                  
                  {/* Fluid gradient slide effect */}
                  <span className="absolute inset-0 -translate-x-full rounded-lg bg-gradient-to-r from-transparent via-purple-500/10 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />
                  
                  {/* Text */}
                  <span className="relative z-10 text-[#8b949e] transition-all duration-300 group-hover:scale-105 group-hover:text-white">
                    {category.label}
                  </span>
                </>
              )}
            </button>
          );
        })}
      </div>
      
      <style jsx>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(10px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </div>
  );
}