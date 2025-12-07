"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const animationStyles = `
  @keyframes float {
    0%, 100% { transform: translateY(0px) rotate(-3deg); }
    50% { transform: translateY(-20px) rotate(3deg); }
  }
  .animate-float {
    animation: float 6s ease-in-out infinite;
  }
  @keyframes spin-slow {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  .animate-spin-slow {
    animation: spin-slow 25s linear infinite;
  }
`;

const HeroSection = () => {
    const [offsetY, setOffsetY] = useState(0);
    const handleScroll = () => {
        if (window.pageYOffset < 1000) {
            setOffsetY(window.pageYOffset);
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const Cloud = ({
        className,
        parallaxStrength,
    }: {
        className?: string;
        parallaxStrength: number;
    }) => (
        <div
            className={cn(
                "absolute bg-no-repeat opacity-40",
                className
            )}
            style={{
                transform: `translateY(${offsetY * parallaxStrength}px)`,
                backgroundImage: 'radial-gradient(50% 50% at 50% 50%, rgba(38, 49, 71, 0.8) 0%, rgba(13, 17, 23, 0) 100%)',
            }}
        />
    );

    return (
        <>
            <style>{animationStyles}</style>
            <div className="relative w-full bg-[#0d1117] pt-16 sm:pt-20 md:pt-24 lg:pt-32 pb-12 sm:pb-16 md:pb-20 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-b from-[#0d1117] to-[#010409]"></div>
                    <Image
                        priority
                        src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/392921de-92ce-4fbe-8f9c-33a0d59192bf-github-com/assets/images/hero-blur-bg-06a749e2054a-1.webp"
                        alt="Abstract background"
                        fill
                        sizes="100vw"
                        className="object-cover opacity-40"
                        quality={100}
                    />
                    
                    <Cloud className="w-[300px] h-[200px] sm:w-[400px] sm:h-[250px] md:w-[500px] md:h-[300px] -top-20 sm:-top-24 md:-top-32 -left-40 sm:-left-50 md:-left-60" parallaxStrength={0.1} />
                    <Cloud className="w-[400px] h-[250px] sm:w-[500px] sm:h-[300px] md:w-[600px] md:h-[350px] -top-32 sm:-top-40 md:-top-48 -right-40 sm:-right-50 md:-right-60" parallaxStrength={0.15} />

                    <div className="absolute inset-0 top-1/4 flex justify-center items-start pointer-events-none">
                        <div className="relative w-[200px] h-[200px] sm:w-[250px] sm:h-[250px] md:w-[300px] md:h-[300px] lg:w-[400px] lg:h-[400px] mt-8 sm:mt-12 md:mt-16">
                            <Image
                                src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/392921de-92ce-4fbe-8f9c-33a0d59192bf-github-com/assets/images/particles-de1dd20f3008-3.png"
                                fill
                                sizes="(max-width: 640px) 200px, (max-width: 768px) 250px, (max-width: 1024px) 300px, 400px"
                                className="object-contain absolute inset-0 animate-spin-slow opacity-70"
                                alt="Particles"
                            />
                            <Image
                                src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/392921de-92ce-4fbe-8f9c-33a0d59192bf-github-com/assets/images/mona-head-3887875b2d69-2.webp"
                                fill
                                sizes="(max-width: 640px) 200px, (max-width: 768px) 250px, (max-width: 1024px) 300px, 400px"
                                className="object-contain relative animate-float"
                                alt="Mona head illustration"
                            />
                        </div>
                    </div>
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center pt-6 sm:pt-8 md:pt-12 pb-8 sm:pb-12 md:pb-20">
                        <a href="#" className="inline-flex items-center justify-center px-1 py-1 pr-3 sm:pr-4 mb-5 sm:mb-7 text-xs sm:text-sm text-gray-300 bg-gray-800/80 rounded-full hover:bg-gray-700/80 transition-colors duration-300 backdrop-blur-sm border border-white/10">
                            <span className="flex items-center gap-1 sm:gap-2 text-xs bg-yellow-300 rounded-full text-black px-2 sm:px-3 py-1 sm:py-1.5 mr-2 sm:mr-3 font-semibold">
                                <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" className="text-black/70 w-3 h-3 sm:w-4 sm:h-4"><path d="M13.5 1a1.5 1.5 0 100 3 1.5 1.5 0 000-3zM11 2.5a2.5 2.5 0 11.603 4.938 7.502 7.502 0 01-4.122 4.122A2.5 2.5 0 112.5 11a7.502 7.502 0 014.122-4.122A2.5 2.5 0 0111 2.5zM3 11.5a1.5 1.5 0 100 3 1.5 1.5 0 000-3zM11.5 13a1.5 1.5 0 103 0 1.5 1.5 0 00-3 0z"></path></svg>
                                <span className="hidden xs:inline">Explore the latest tools from Universe '25</span>
                                <span className="xs:hidden">Universe '25</span>
                            </span>
                            <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 ml-1" />
                        </a>
                        
                        <h1 className="text-3xl leading-tight sm:text-4xl md:text-5xl lg:text-6xl xl:text-[72px] font-semibold text-white mb-4 sm:mb-6 tracking-tight px-4">
                            The future of building happens together
                        </h1>

                        <p className="max-w-3xl mx-auto text-base sm:text-lg md:text-xl text-muted mb-6 sm:mb-8 md:mb-10 px-4">
                            Tools and trends evolve, but collaboration endures. With GitHub, developers, agents, and code come together on one platform.
                        </p>

                        <div className="flex flex-col items-center justify-center gap-3 sm:gap-4 px-4">
                            <form className="w-full sm:w-auto flex flex-col sm:flex-row gap-2">
                                <label htmlFor="email-hero" className="sr-only">Email address</label>
                                <input id="email-hero" type="email" placeholder="Enter your email" className="w-full sm:w-64 md:w-72 rounded-md border border-white/20 bg-white/[.07] px-4 py-2.5 sm:py-3 text-sm sm:text-base text-white shadow-sm focus:border-white/50 focus:ring-2 focus:ring-accent" />
                                <button type="submit" className="w-full sm:w-auto rounded-md bg-primary px-4 sm:px-5 py-2.5 sm:py-3 text-sm sm:text-base font-semibold text-primary-foreground hover:bg-green-600 transition-colors">
                                    Sign up for GitHub
                                </button>
                            </form>
                            <a href="#" className="w-full sm:w-auto whitespace-nowrap rounded-md border border-white/40 px-4 sm:px-5 py-2.5 sm:py-3 text-center text-sm sm:text-base font-semibold text-white hover:border-white transition-colors">
                                Try GitHub Copilot free
                            </a>
                        </div>
                    </div>

                    <div className="relative z-0 max-w-6xl mx-auto -mt-8 sm:-mt-12 md:-mt-16 lg:-mt-24 px-4">
                        <div className="relative aspect-[16/9] rounded-xl sm:rounded-2xl bg-[#1b222c] p-1 sm:p-1.5 shadow-2xl" style={{ transform: 'perspective(1500px) rotateX(15deg)' }}>
                            <div className="absolute inset-0 bg-gradient-to-t from-transparent to-white/5 rounded-xl sm:rounded-2xl pointer-events-none"></div>
                            <div className="h-full w-full rounded-lg bg-[#0d1117] overflow-hidden">
                            </div>
                            <div className="absolute top-1.5 sm:top-2 left-1/2 -translate-x-1/2 w-16 sm:w-20 md:w-24 h-1 sm:h-1.5 bg-gray-700/50 rounded-b-md"></div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default HeroSection;