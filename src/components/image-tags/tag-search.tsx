"use client";

import { useState } from 'react';
import { Search, Loader2, Sparkles, Filter, X } from 'lucide-react';
import Image from 'next/image';
import { TagCategory } from '@/lib/types/image-tags';

interface TagSearchResult {
  imageUrl: string;
  tags: {
    objects: string[];
    people: string[];
    themes: string[];
    emotions: string[];
    colors: string[];
    concepts: string[];
    description: string;
  };
  articleTitle: string | null;
  articleUrl: string | null;
}

export default function TagSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState<TagCategory | ''>('');
  const [results, setResults] = useState<TagSearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searched, setSearched] = useState(false);

  const categories: Array<{ value: TagCategory | ''; label: string }> = [
    { value: '', label: 'All Categories' },
    { value: 'objects', label: 'Objects' },
    { value: 'people', label: 'People' },
    { value: 'themes', label: 'Themes' },
    { value: 'emotions', label: 'Emotions' },
    { value: 'colors', label: 'Colors' },
    { value: 'concepts', label: 'Concepts' },
  ];

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!searchTerm.trim()) return;

    setIsSearching(true);
    setSearched(true);

    try {
      const params = new URLSearchParams({ q: searchTerm });
      if (category) params.set('category', category);

      const response = await fetch(`/api/image-tags/search?${params.toString()}`);
      const data = await response.json();

      if (data.success) {
        setResults(data.data.results);
      } else {
        console.error('Search failed:', data.error);
        setResults([]);
      }
    } catch (error) {
      console.error('Search error:', error);
      setResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  const clearSearch = () => {
    setSearchTerm('');
    setCategory('');
    setResults([]);
    setSearched(false);
  };

  return (
    <div className="w-full space-y-6">
      {/* Search Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-purple-500/30 bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-xl">
            <Sparkles className="h-6 w-6 text-purple-400" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">AI Image Search</h2>
            <p className="text-sm text-[#8b949e]">Search news images by AI-generated tags and keywords</p>
          </div>
        </div>

        {/* Search Form */}
        <form onSubmit={handleSearch} className="space-y-4">
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#8b949e]" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by objects, people, themes, emotions, colors, concepts..."
                className="w-full rounded-lg border border-[rgba(240,246,252,0.2)] bg-[#0d1117] py-3 pl-12 pr-4 text-white placeholder:text-[#7d8590] focus:border-purple-500/50 focus:outline-none focus:ring-2 focus:ring-purple-500/20"
              />
            </div>
            {searchTerm && (
              <button
                type="button"
                onClick={clearSearch}
                className="rounded-lg border border-[rgba(240,246,252,0.2)] bg-[#0d1117] px-4 text-[#8b949e] transition-colors hover:border-red-500/50 hover:text-red-400"
              >
                <X className="h-5 w-5" />
              </button>
            )}
            <button
              type="submit"
              disabled={isSearching || !searchTerm.trim()}
              className="flex items-center gap-2 rounded-lg border border-purple-500/30 bg-gradient-to-br from-purple-500/20 to-pink-500/20 px-6 py-3 font-medium text-white backdrop-blur-xl transition-all duration-300 hover:scale-105 hover:border-purple-500/50 hover:shadow-[0_0_20px_rgba(163,113,247,0.4)] disabled:opacity-50 disabled:hover:scale-100"
            >
              {isSearching ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Searching...
                </>
              ) : (
                <>
                  <Search className="h-5 w-5" />
                  Search
                </>
              )}
            </button>
          </div>

          {/* Category Filter */}
          <div className="flex items-center gap-3">
            <Filter className="h-4 w-4 text-[#8b949e]" />
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.value}
                  type="button"
                  onClick={() => setCategory(cat.value)}
                  className={`rounded-lg border px-3 py-1.5 text-sm font-medium transition-all duration-300 ${
                    category === cat.value
                      ? 'border-purple-500/50 bg-gradient-to-br from-purple-500/20 to-pink-500/20 text-purple-400 shadow-[0_0_15px_rgba(163,113,247,0.3)]'
                      : 'border-[rgba(240,246,252,0.15)] bg-[rgba(22,27,34,0.6)] text-[#8b949e] hover:border-purple-500/30 hover:text-white'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </form>
      </div>

      {/* Results */}
      {searched && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-white">
              {results.length > 0 ? `${results.length} Result${results.length === 1 ? '' : 's'} Found` : 'No Results Found'}
            </h3>
            {results.length > 0 && (
              <span className="text-sm text-[#8b949e]">
                Showing images tagged with "{searchTerm}"
                {category && ` in ${category}`}
              </span>
            )}
          </div>

          {results.length === 0 ? (
            <div className="flex min-h-[300px] flex-col items-center justify-center rounded-xl border border-[rgba(240,246,252,0.1)] bg-[rgba(22,27,34,0.6)] p-12 text-center backdrop-blur-xl">
              <Search className="mb-4 h-12 w-12 text-[#7d8590]" />
              <h4 className="mb-2 text-lg font-semibold text-white">No images found</h4>
              <p className="text-sm text-[#8b949e]">Try different keywords or remove category filters</p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {results.map((result, index) => (
                <a
                  key={index}
                  href={result.articleUrl || '#'}
                  target={result.articleUrl ? '_blank' : undefined}
                  rel={result.articleUrl ? 'noopener noreferrer' : undefined}
                  className="group relative overflow-hidden rounded-xl border border-[rgba(240,246,252,0.1)] bg-[rgba(22,27,34,0.6)] backdrop-blur-xl transition-all duration-500 hover:border-purple-500/50 hover:shadow-[0_0_30px_rgba(163,113,247,0.3)] hover:scale-[1.02]"
                >
                  {/* Image */}
                  <div className="relative h-48 w-full overflow-hidden bg-[#0d1117]">
                    <Image
                      src={result.imageUrl}
                      alt={result.tags.description}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
                      unoptimized
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0d1117] via-transparent to-transparent opacity-60" />
                  </div>

                  {/* Content */}
                  <div className="p-4 space-y-3">
                    {result.articleTitle && (
                      <h4 className="line-clamp-2 text-sm font-semibold text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 group-hover:bg-clip-text transition-all duration-300">
                        {result.articleTitle}
                      </h4>
                    )}
                    <p className="line-clamp-2 text-xs text-[#7d8590]">{result.tags.description}</p>
                    
                    {/* Top Tags */}
                    <div className="flex flex-wrap gap-1.5">
                      {Object.entries(result.tags)
                        .filter(([key]) => key !== 'description')
                        .flatMap(([_, values]) => values as string[])
                        .slice(0, 4)
                        .map((tag, i) => (
                          <span
                            key={i}
                            className="rounded-md border border-purple-500/30 bg-gradient-to-br from-purple-500/10 to-pink-500/10 px-2 py-0.5 text-xs text-purple-400 backdrop-blur-xl"
                          >
                            {tag}
                          </span>
                        ))}
                    </div>
                  </div>
                </a>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
