"use client";

import { ImageTagRecord } from '@/lib/types/image-tags';
import { Sparkles, Tag, Users, Palette, Heart, Lightbulb, Image as ImageIcon } from 'lucide-react';

interface ImageTagDisplayProps {
  tags: Partial<ImageTagRecord> | null;
  compact?: boolean;
}

const categoryIcons = {
  objects: Tag,
  people: Users,
  colors: Palette,
  emotions: Heart,
  concepts: Lightbulb,
  themes: Sparkles,
};

const categoryColors = {
  objects: 'from-blue-500/20 to-blue-600/20 border-blue-500/30 text-blue-400',
  people: 'from-green-500/20 to-green-600/20 border-green-500/30 text-green-400',
  colors: 'from-pink-500/20 to-pink-600/20 border-pink-500/30 text-pink-400',
  emotions: 'from-purple-500/20 to-purple-600/20 border-purple-500/30 text-purple-400',
  concepts: 'from-yellow-500/20 to-yellow-600/20 border-yellow-500/30 text-yellow-400',
  themes: 'from-indigo-500/20 to-indigo-600/20 border-indigo-500/30 text-indigo-400',
};

export default function ImageTagDisplay({ tags, compact = false }: ImageTagDisplayProps) {
  if (!tags) {
    return null;
  }

  const categories = ['objects', 'people', 'themes', 'emotions', 'colors', 'concepts'] as const;
  const hasAnyTags = categories.some(cat => tags[cat] && (tags[cat] as string[]).length > 0);

  if (!hasAnyTags) {
    return null;
  }

  if (compact) {
    // Compact view - just show first few tags
    const allTags = categories.flatMap(cat => tags[cat] as string[] || []).slice(0, 5);
    
    return (
      <div className="flex items-center gap-2 flex-wrap">
        <Sparkles className="h-3.5 w-3.5 text-purple-400" />
        {allTags.map((tag, index) => (
          <span
            key={index}
            className="rounded-md border border-[rgba(240,246,252,0.15)] bg-gradient-to-br from-purple-500/10 to-pink-500/10 px-2 py-0.5 text-xs text-[#8b949e] backdrop-blur-xl transition-all duration-300 hover:scale-105 hover:border-purple-500/30 hover:text-purple-400"
          >
            {tag}
          </span>
        ))}
      </div>
    );
  }

  // Full view - show all categories
  return (
    <div className="space-y-4">
      {/* AI Badge */}
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2 rounded-lg border border-purple-500/30 bg-gradient-to-br from-purple-500/10 to-pink-500/10 px-3 py-1.5 backdrop-blur-xl">
          <Sparkles className="h-4 w-4 text-purple-400 animate-pulse" />
          <span className="text-sm font-medium text-purple-400">AI-Tagged Image</span>
        </div>
      </div>

      {/* Description */}
      {tags.description && (
        <div className="rounded-lg border border-[rgba(240,246,252,0.1)] bg-[rgba(22,27,34,0.6)] p-4 backdrop-blur-xl">
          <div className="mb-2 flex items-center gap-2 text-sm font-medium text-white">
            <ImageIcon className="h-4 w-4 text-[#8b949e]" />
            Description
          </div>
          <p className="text-sm text-[#8b949e]">{tags.description}</p>
        </div>
      )}

      {/* Tag Categories */}
      <div className="grid gap-4 md:grid-cols-2">
        {categories.map((category) => {
          const categoryTags = tags[category] as string[] | undefined;
          if (!categoryTags || categoryTags.length === 0) return null;

          const Icon = categoryIcons[category];
          const colorClass = categoryColors[category];

          return (
            <div
              key={category}
              className="group rounded-lg border border-[rgba(240,246,252,0.1)] bg-[rgba(22,27,34,0.6)] p-4 backdrop-blur-xl transition-all duration-300 hover:border-purple-500/30 hover:shadow-[0_0_20px_rgba(163,113,247,0.2)]"
            >
              <div className="mb-3 flex items-center gap-2">
                <Icon className="h-4 w-4 text-[#8b949e] transition-colors duration-300 group-hover:text-purple-400" />
                <h3 className="text-sm font-semibold capitalize text-white transition-colors duration-300 group-hover:text-purple-400">
                  {category}
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {categoryTags.map((tag, index) => (
                  <span
                    key={index}
                    className={`rounded-md border bg-gradient-to-br px-2.5 py-1 text-xs font-medium backdrop-blur-xl transition-all duration-300 hover:scale-105 hover:shadow-[0_0_10px_rgba(163,113,247,0.3)] ${colorClass}`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
