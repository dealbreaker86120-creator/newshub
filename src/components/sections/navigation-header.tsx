"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Menu, X, Sparkles } from "lucide-react";

export default function NavigationHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b border-[rgba(240,246,252,0.1)] bg-[rgba(13,17,23,0.95)] backdrop-blur-xl">
      <div className="container mx-auto px-6">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link 
            href="/" 
            className="flex items-center gap-2 text-xl font-bold text-white transition-all duration-300 hover:scale-105"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-pink-500">
              <span className="text-sm font-bold">N</span>
            </div>
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              NewsHub
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-6 md:flex">
            <Link 
              href="/" 
              className="text-sm font-medium text-[#8b949e] transition-colors hover:text-white"
            >
              Home
            </Link>
            <Link 
              href="/image-search" 
              className="flex items-center gap-1.5 text-sm font-medium text-[#8b949e] transition-colors hover:text-white"
            >
              <Sparkles className="h-4 w-4 text-purple-400" />
              AI Image Search
            </Link>
          </nav>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="hidden flex-1 max-w-md mx-6 lg:block">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#7d8590]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search news..."
                className="w-full rounded-lg border border-[rgba(240,246,252,0.1)] bg-[#0d1117] py-2 pl-10 pr-4 text-sm text-white placeholder:text-[#7d8590] focus:border-purple-500/50 focus:outline-none focus:ring-2 focus:ring-purple-500/20"
              />
            </div>
          </form>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="border-t border-[rgba(240,246,252,0.1)] py-4 md:hidden">
            <nav className="flex flex-col gap-4">
              <Link
                href="/"
                className="text-sm font-medium text-[#8b949e] transition-colors hover:text-white"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/image-search"
                className="flex items-center gap-1.5 text-sm font-medium text-[#8b949e] transition-colors hover:text-white"
                onClick={() => setIsMenuOpen(false)}
              >
                <Sparkles className="h-4 w-4 text-purple-400" />
                AI Image Search
              </Link>
              <form onSubmit={handleSearch} className="mt-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#7d8590]" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search news..."
                    className="w-full rounded-lg border border-[rgba(240,246,252,0.1)] bg-[#0d1117] py-2 pl-10 pr-4 text-sm text-white placeholder:text-[#7d8590] focus:border-purple-500/50 focus:outline-none focus:ring-2 focus:ring-purple-500/20"
                  />
                </div>
              </form>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}