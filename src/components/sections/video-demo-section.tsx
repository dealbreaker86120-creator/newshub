"use client";

import React, { useState, useRef, useEffect, FC } from "react";
import { Play, Pause } from "lucide-react";

const VideoPlayer: FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);

  const togglePlay = () => {
    const video = videoRef.current;
    if (video) {
      if (video.paused) {
        video.play();
        setIsPlaying(true);
      } else {
        video.pause();
        setIsPlaying(false);
      }
    }
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);

    // This attempts to deal with browsers that block autoplay
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => setIsPlaying(false));
    }

    return () => {
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
    };
  }, []);

  return (
    <div className="relative max-w-6xl w-full mx-auto">
      <div className="absolute -inset-2.5 sm:-inset-4 rounded-[1.8rem] bg-gradient-to-b from-[#1f6feb]/30 to-[#a371f7]/30 blur-2xl opacity-60"></div>
      <div className="relative p-1.5 sm:p-2.5 bg-[#010409] rounded-[1.375rem] border border-white/10">
        <div className="aspect-video overflow-hidden rounded-lg bg-black">
          <video
            ref={videoRef}
            src="https://github.githubassets.com/assets/code-1_desktop-7ab52aea3358.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          />
        </div>
        <button
          onClick={togglePlay}
          aria-label={isPlaying ? "Pause video" : "Play video"}
          className="absolute bottom-4 right-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm transition-opacity hover:bg-black/75"
        >
          {isPlaying ? (
            <Pause className="h-4 w-4" />
          ) : (
            <Play className="ml-0.5 h-4 w-4 fill-current" />
          )}
        </button>
      </div>
    </div>
  );
};

const FeatureTabs: FC = () => {
  const tabs = ["Code", "Plan", "Collaborate", "Automate", "Secure"];
  return (
    <div role="tablist" className="mt-12 flex flex-wrap justify-center gap-2 px-4">
      {tabs.map((tab, index) => (
        <button
          key={tab}
          role="tab"
          aria-selected={index === 0}
          className={`rounded-full px-5 py-2 text-base font-medium transition-colors duration-200 ${
            index === 0
              ? "bg-white text-black"
              : "bg-transparent text-[#7d8590] border border-white/10 hover:bg-white/10 hover:text-white"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

const LogoCarousel: FC = () => {
    const logos = ["Duolingo", "EY", "Ford", "Infosys", "Mercado Libre", "Mercedes-Benz", "Shopify", "PHILIPS"];
  
    const LogoPlaceholder = ({ name }: { name: string }) => (
      <span className="whitespace-nowrap mx-12 text-center text-3xl font-medium text-gray-500 opacity-60 transition-opacity hover:opacity-100">
        {name}
      </span>
    );
  
    return (
      <>
        <style>
          {`
            @keyframes scrollLeft {
              from { transform: translateX(0); }
              to { transform: translateX(-100%); }
            }
            .animate-scroll-left {
              animation: scrollLeft 40s linear infinite;
            }
          `}
        </style>
        <div className="mt-24 w-full overflow-hidden" style={{ maskImage: "linear-gradient(to right, transparent, black 15%, black 85%, transparent)" }}>
          <div className="flex w-max hover:[animation-play-state:paused]">
            <div className="flex-shrink-0 flex items-center justify-around animate-scroll-left">
              {logos.map((logo, index) => <LogoPlaceholder key={index} name={logo} />)}
            </div>
            <div className="flex-shrink-0 flex items-center justify-around animate-scroll-left" aria-hidden="true">
              {logos.map((logo, index) => <LogoPlaceholder key={index + logos.length} name={logo} />)}
            </div>
          </div>
        </div>
      </>
    );
  };
  

const VideoDemoSection: FC = () => {
  return (
    <section className="relative bg-background py-16 sm:py-20 lg:py-24">
      <h2 className="sr-only">GitHub features</h2>
      <div className="container mx-auto">
        <div className="w-full flex flex-col items-center">
          <VideoPlayer />
          <FeatureTabs />
          <p className="mt-8 max-w-3xl text-center text-xl text-text-secondary leading-relaxed">
            Write, test, and fix code quickly with GitHub Copilot, from simple boilerplate to complex features.
          </p>
          <LogoCarousel />
        </div>
      </div>
    </section>
  );
};

export default VideoDemoSection;