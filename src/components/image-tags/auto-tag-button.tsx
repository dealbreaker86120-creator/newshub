"use client";

import { useState } from 'react';
import { Sparkles, Loader2, Check, AlertCircle } from 'lucide-react';

interface AutoTagButtonProps {
  imageUrl: string;
  articleTitle?: string;
  articleUrl?: string;
  onTagged?: (tags: any) => void;
  compact?: boolean;
}

export default function AutoTagButton({ 
  imageUrl, 
  articleTitle, 
  articleUrl, 
  onTagged,
  compact = false 
}: AutoTagButtonProps) {
  const [isTagging, setIsTagging] = useState(false);
  const [isTagged, setIsTagged] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAutoTag = async () => {
    setIsTagging(true);
    setError(null);

    try {
      const response = await fetch('/api/image-tags/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imageUrl,
          articleTitle,
          articleUrl,
          skipCache: false,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setIsTagged(true);
        if (onTagged) {
          onTagged(data.data.tags);
        }
        
        // Reset success state after 3 seconds
        setTimeout(() => {
          setIsTagged(false);
        }, 3000);
      } else {
        setError(data.error || 'Failed to tag image');
      }
    } catch (err) {
      setError('Network error occurred');
      console.error('Auto-tag error:', err);
    } finally {
      setIsTagging(false);
    }
  };

  if (compact) {
    return (
      <button
        onClick={handleAutoTag}
        disabled={isTagging || isTagged}
        className="group relative flex items-center gap-1.5 rounded-md border border-purple-500/30 bg-gradient-to-br from-purple-500/10 to-pink-500/10 px-2 py-1 text-xs font-medium text-purple-400 backdrop-blur-xl transition-all duration-300 hover:scale-105 hover:border-purple-500/50 hover:shadow-[0_0_15px_rgba(163,113,247,0.4)] disabled:opacity-50 disabled:hover:scale-100"
      >
        {isTagging ? (
          <Loader2 className="h-3 w-3 animate-spin" />
        ) : isTagged ? (
          <Check className="h-3 w-3" />
        ) : (
          <Sparkles className="h-3 w-3" />
        )}
        <span>{isTagging ? 'Tagging...' : isTagged ? 'Tagged!' : 'AI Tag'}</span>
      </button>
    );
  }

  return (
    <div className="space-y-2">
      <button
        onClick={handleAutoTag}
        disabled={isTagging || isTagged}
        className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-lg border border-purple-500/30 bg-gradient-to-br from-purple-500/20 to-pink-500/20 px-4 py-3 font-medium text-white backdrop-blur-xl transition-all duration-300 hover:scale-105 hover:border-purple-500/50 hover:shadow-[0_0_20px_rgba(163,113,247,0.4)] disabled:opacity-50 disabled:hover:scale-100"
      >
        {/* Shimmer effect */}
        <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 transition-all duration-700 group-hover:translate-x-full group-hover:opacity-100" />
        
        {isTagging ? (
          <>
            <Loader2 className="relative z-10 h-5 w-5 animate-spin" />
            <span className="relative z-10">Analyzing with AI...</span>
          </>
        ) : isTagged ? (
          <>
            <Check className="relative z-10 h-5 w-5" />
            <span className="relative z-10">Image Tagged Successfully!</span>
          </>
        ) : (
          <>
            <Sparkles className="relative z-10 h-5 w-5" />
            <span className="relative z-10">Auto-Tag Image with AI</span>
          </>
        )}
      </button>

      {error && (
        <div className="flex items-center gap-2 rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-400">
          <AlertCircle className="h-4 w-4" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}
