import NavigationHeader from "@/components/sections/navigation-header";

export default function Loading() {
  return (
    <main className="min-h-screen bg-[#0d1117]">
      <NavigationHeader />
      
      {/* Hero Section */}
      <section className="relative border-b border-[rgba(240,246,252,0.1)] bg-gradient-to-b from-[#0d1117] to-[#010409] py-16 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-600/20 blur-[120px] animate-pulse" />
        </div>
        
        <div className="container relative mx-auto px-6">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="mb-4 text-5xl font-bold text-white md:text-6xl lg:text-7xl">
              Stay Informed with{' '}
              <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600 bg-clip-text text-transparent">
                Real-Time News
              </span>
            </h1>
            <p className="mb-8 text-xl text-[#7d8590]">
              Breaking news from Reuters, AP, BBC, CNN, and major news agencies worldwide — updated every minute
            </p>
          </div>
        </div>
      </section>

      {/* Loading Content */}
      <section className="container mx-auto px-6 py-12">
        {/* Category tabs skeleton */}
        <div className="mb-8 flex flex-wrap gap-2">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="h-10 w-24 rounded-lg bg-[#161b22] animate-pulse"
            />
          ))}
        </div>

        {/* News grid skeleton */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
            <div
              key={i}
              className="group relative overflow-hidden rounded-xl border border-[rgba(240,246,252,0.1)] bg-[#161b22] p-4"
            >
              {/* Image skeleton */}
              <div className="mb-4 h-48 w-full rounded-lg bg-[#0d1117] animate-pulse" />
              
              {/* Category skeleton */}
              <div className="mb-3 h-5 w-20 rounded bg-[#0d1117] animate-pulse" />
              
              {/* Title skeleton */}
              <div className="mb-2 h-6 w-full rounded bg-[#0d1117] animate-pulse" />
              <div className="mb-3 h-6 w-3/4 rounded bg-[#0d1117] animate-pulse" />
              
              {/* Description skeleton */}
              <div className="mb-2 h-4 w-full rounded bg-[#0d1117] animate-pulse" />
              <div className="mb-4 h-4 w-5/6 rounded bg-[#0d1117] animate-pulse" />
              
              {/* Footer skeleton */}
              <div className="flex items-center justify-between">
                <div className="h-4 w-24 rounded bg-[#0d1117] animate-pulse" />
                <div className="h-4 w-16 rounded bg-[#0d1117] animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="relative border-t border-[rgba(240,246,252,0.1)] bg-[#010409] py-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div className="flex items-center gap-2">
              <span className="text-[#8b949e]">© 2025 NewsHub. Powered by Google News</span>
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
