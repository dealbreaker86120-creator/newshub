import NavigationHeader from "@/components/sections/navigation-header";
import TagSearch from "@/components/image-tags/tag-search";

export default function ImageSearchPage() {
  return (
    <main className="min-h-screen bg-[#0d1117]">
      <NavigationHeader />
      
      {/* Hero Section */}
      <section className="relative border-b border-[rgba(240,246,252,0.1)] bg-gradient-to-b from-[#0d1117] to-[#010409] py-12 overflow-hidden">
        {/* Animated background blobs */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-600/20 blur-[120px] animate-[pulse_8s_ease-in-out_infinite]" />
          <div className="absolute right-1/4 bottom-1/3 h-[300px] w-[300px] rounded-full bg-pink-600/15 blur-[100px] animate-[float_10s_ease-in-out_infinite]" />
        </div>
        
        <div className="container relative mx-auto px-6">
          <div className="mx-auto max-w-4xl text-center">
            <div 
              className="mb-4 inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-950/30 px-4 py-2 backdrop-blur-xl"
              style={{
                animation: 'fadeInScale 0.8s cubic-bezier(0.16, 1, 0.3, 1) backwards'
              }}
            >
              <div className="h-2 w-2 rounded-full bg-purple-500 animate-pulse" />
              <span className="text-sm font-medium text-purple-400">AI-Powered Image Analysis</span>
            </div>
            
            <h1 
              className="mb-4 text-4xl font-bold text-white md:text-5xl lg:text-6xl"
              style={{
                animation: 'fadeInScale 1s cubic-bezier(0.16, 1, 0.3, 1) backwards'
              }}
            >
              Search News Images by{' '}
              <span className="relative inline-block bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600 bg-clip-text text-transparent animate-[shimmer_3s_ease-in-out_infinite]">
                <span className="absolute inset-0 blur-2xl bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600 opacity-30" />
                <span className="relative">AI Tags</span>
              </span>
            </h1>
            <p 
              className="mb-6 text-lg text-[#7d8590] transition-all duration-500 hover:text-[#8b949e]"
              style={{
                animation: 'fadeInUp 1s cubic-bezier(0.16, 1, 0.3, 1) 0.2s backwards'
              }}
            >
              Discover news images through intelligent categorization — objects, people, themes, emotions, colors, and concepts automatically detected by AI
            </p>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section 
        className="container mx-auto px-6 py-12"
        style={{
          animation: 'fadeIn 1s ease-out 0.3s backwards'
        }}
      >
        <TagSearch />
      </section>

      {/* Footer */}
      <footer className="relative border-t border-[rgba(240,246,252,0.1)] bg-[#010409] py-12 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-purple-900/5 via-transparent to-transparent" />
        
        <div className="container relative mx-auto px-6">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div className="flex items-center gap-2">
              <span className="text-[#8b949e]">© 2025 NewsHub. Powered by NewsAPI.org & OpenAI</span>
            </div>
            <div className="flex gap-6 text-sm text-[#8b949e]">
              <a href="#" className="transition-colors hover:text-white">About</a>
              <a href="#" className="transition-colors hover:text-white">Privacy</a>
              <a href="#" className="transition-colors hover:text-white">Terms</a>
              <a href="#" className="transition-colors hover:text-white">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
