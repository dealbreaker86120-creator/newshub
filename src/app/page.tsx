import NavigationHeader from "@/components/sections/navigation-header";
import NewsGrid from "@/components/news/news-grid";
import CategoryTabs from "@/components/news/category-tabs";
import { NewsCategory } from "@/lib/types/news";
import { Suspense } from "react";

async function getNews(category?: NewsCategory, query?: string) {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
  const params = new URLSearchParams();
  
  if (category) params.set('category', category);
  if (query) params.set('q', query);
  
  try {
    const response = await fetch(`${baseUrl}/api/news?${params.toString()}`, {
      next: { revalidate: 60 },
    });
    
    if (!response.ok) {
      console.error('Failed to fetch news:', response.status);
      return [];
    }
    
    const data = await response.json();
    return data.articles || [];
  } catch (error) {
    console.error('Error fetching news:', error);
    return [];
  }
}

// Skeleton loader component
function NewsGridSkeleton() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
        <div
          key={i}
          className="group relative overflow-hidden rounded-xl border border-[rgba(240,246,252,0.1)] bg-[#161b22] p-4"
        >
          <div className="mb-4 h-48 w-full rounded-lg bg-[#0d1117] animate-pulse" />
          <div className="mb-3 h-5 w-20 rounded bg-[#0d1117] animate-pulse" />
          <div className="mb-2 h-6 w-full rounded bg-[#0d1117] animate-pulse" />
          <div className="mb-3 h-6 w-3/4 rounded bg-[#0d1117] animate-pulse" />
          <div className="mb-2 h-4 w-full rounded bg-[#0d1117] animate-pulse" />
          <div className="mb-4 h-4 w-5/6 rounded bg-[#0d1117] animate-pulse" />
          <div className="flex items-center justify-between">
            <div className="h-4 w-24 rounded bg-[#0d1117] animate-pulse" />
            <div className="h-4 w-16 rounded bg-[#0d1117] animate-pulse" />
          </div>
        </div>
      ))}
    </div>
  );
}

// Async component for news content
async function NewsContent({ category, query }: { category?: NewsCategory; query?: string }) {
  const articles = await getNews(category, query);
  return <NewsGrid initialArticles={articles} category={category} />;
}

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ category?: NewsCategory; q?: string }>;
}) {
  const params = await searchParams;

  return (
    <main className="min-h-screen bg-[#0d1117]">
      <NavigationHeader />
      
      {/* Hero Section with Enhanced Animations */}
      <section className="relative border-b border-[rgba(240,246,252,0.1)] bg-gradient-to-b from-[#0d1117] to-[#010409] py-16 overflow-hidden">
        {/* Animated background blobs */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-600/20 blur-[120px] animate-[pulse_8s_ease-in-out_infinite]" />
          <div className="absolute left-1/4 top-1/3 h-[400px] w-[400px] rounded-full bg-pink-600/15 blur-[100px] animate-[float_10s_ease-in-out_infinite]" />
          <div className="absolute right-1/4 bottom-1/3 h-[500px] w-[500px] rounded-full bg-blue-600/15 blur-[110px] animate-[float_12s_ease-in-out_infinite_2s]" />
        </div>
        
        <div className="container relative mx-auto px-6">
          <div className="mx-auto max-w-4xl text-center">
            <h1 
              className="mb-4 text-5xl font-bold text-white md:text-6xl lg:text-7xl"
              style={{
                animation: 'fadeInScale 1s cubic-bezier(0.16, 1, 0.3, 1) backwards'
              }}
            >
              Stay Informed with{' '}
              <span className="relative inline-block bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600 bg-clip-text text-transparent animate-[shimmer_3s_ease-in-out_infinite]">
                <span className="absolute inset-0 blur-2xl bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600 opacity-30" />
                <span className="relative">Real-Time News</span>
              </span>
            </h1>
            <p 
              className="mb-8 text-xl text-[#7d8590] transition-all duration-500 hover:text-[#8b949e]"
              style={{
                animation: 'fadeInUp 1s cubic-bezier(0.16, 1, 0.3, 1) 0.2s backwards'
              }}
            >
              Breaking news from Reuters, AP, BBC, CNN, and major news agencies worldwide — updated every minute
            </p>
            {params.q && (
              <div 
                className="mb-6 inline-block rounded-lg border border-purple-500/30 bg-purple-950/30 px-4 py-2 backdrop-blur-xl transition-all duration-300 hover:scale-105 hover:border-purple-500/50 hover:shadow-[0_0_20px_rgba(163,113,247,0.3)]"
                style={{
                  animation: 'fadeInScale 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.4s backwards'
                }}
              >
                <span className="text-sm text-[#8b949e]">Search results for: </span>
                <span className="font-semibold text-purple-400">{params.q}</span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* News Content with Suspense Streaming */}
      <section 
        className="container mx-auto px-6 py-12"
        style={{
          animation: 'fadeIn 1s ease-out 0.3s backwards'
        }}
      >
        <CategoryTabs />
        <Suspense fallback={<NewsGridSkeleton />}>
          <NewsContent category={params.category} query={params.q} />
        </Suspense>
      </section>

      {/* Footer with Liquid Glass */}
      <footer className="relative border-t border-[rgba(240,246,252,0.1)] bg-[#010409] py-12 overflow-hidden">
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-t from-purple-900/5 via-transparent to-transparent" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-purple-500/5 to-transparent animate-[shimmer_4s_ease-in-out_infinite]" />
        
        <div className="container relative mx-auto px-6">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div 
              className="flex items-center gap-2 transition-all duration-300 hover:scale-105"
              style={{
                animation: 'fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) backwards'
              }}
            >
              <span className="text-[#8b949e]">© 2025 NewsHub. Powered by Google News</span>
            </div>
            <div 
              className="flex gap-6 text-sm text-[#8b949e]"
              style={{
                animation: 'fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s backwards'
              }}
            >
              <a 
                href="#" 
                className="group relative overflow-hidden rounded px-2 py-1 transition-all duration-300 hover:text-white hover:scale-110"
              >
                <span className="absolute inset-0 scale-0 rounded bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-xl transition-transform duration-300 group-hover:scale-100" />
                <span className="relative">About</span>
              </a>
              <a 
                href="#" 
                className="group relative overflow-hidden rounded px-2 py-1 transition-all duration-300 hover:text-white hover:scale-110"
              >
                <span className="absolute inset-0 scale-0 rounded bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-xl transition-transform duration-300 group-hover:scale-100" />
                <span className="relative">Privacy</span>
              </a>
              <a 
                href="#" 
                className="group relative overflow-hidden rounded px-2 py-1 transition-all duration-300 hover:text-white hover:scale-110"
              >
                <span className="absolute inset-0 scale-0 rounded bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-xl transition-transform duration-300 group-hover:scale-100" />
                <span className="relative">Terms</span>
              </a>
              <a 
                href="#" 
                className="group relative overflow-hidden rounded px-2 py-1 transition-all duration-300 hover:text-white hover:scale-110"
              >
                <span className="absolute inset-0 scale-0 rounded bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-xl transition-transform duration-300 group-hover:scale-100" />
                <span className="relative">Contact</span>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}