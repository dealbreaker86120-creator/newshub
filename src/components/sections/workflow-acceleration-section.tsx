"use client";

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

const useInView = (options: IntersectionObserverInit = { threshold: 0.1 }) => {
  const [isInView, setIsInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsInView(true);
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      }
    }, { ...options, rootMargin: options.rootMargin || "0px 0px -50px 0px" });

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [options]);

  return [ref, isInView] as const;
};

const Starfield = () => (
  <div className="absolute inset-0 -z-10 overflow-hidden">
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(163,113,247,0.15)_0%,transparent_60%)]" />
    <div
      className="absolute inset-0 opacity-30"
      style={{
        backgroundImage: 'radial-gradient(1px 1px at 25% 25%, white, transparent), radial-gradient(1px 1px at 75% 75%, white, transparent)',
        backgroundSize: '150px 150px',
      }}
    />
    <div
      className="absolute inset-0 opacity-10"
      style={{
        backgroundImage: 'radial-gradient(1.5px 1.5px at 50% 50%, white, transparent), radial-gradient(1.5px 1.5px at 0% 100%, white, transparent)',
        backgroundSize: '300px 300px',
      }}
    />
  </div>
);

const DuolingoCard = ({ isInView }: { isInView: boolean }) => (
  <div className={`transition-all duration-700 ease-out delay-[400ms] ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
    <div className="group relative overflow-hidden rounded-xl bg-white p-6 transition-transform duration-300 hover:-translate-y-1">
      <div className="flex items-center gap-4">
        <Image
          src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/392921de-92ce-4fbe-8f9c-33a0d59192bf-github-com/assets/svgs/logo-duolingo-14477f9e54a6-1.svg"
          alt="Duolingo logo"
          width={40}
          height={37}
          className="h-9 w-auto"
        />
        <span className="font-semibold text-xl text-black">duolingo</span>
      </div>
      <p className="mt-4 text-lg/relaxed text-neutral-700">Duolingo boosts developer speed by 25% with GitHub Copilot</p>
      <a href="#" className="mt-4 inline-flex items-center gap-1.5 text-base font-medium text-blue-600 transition-colors group-hover:text-blue-700">
        Read customer story
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </a>
    </div>
  </div>
);

const GartnerCard = ({ isInView }: { isInView: boolean }) => (
  <div className={`transition-all duration-700 ease-out delay-[500ms] ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
    <div className="group relative overflow-hidden rounded-xl border border-border bg-card p-6 transition-transform duration-300 hover:-translate-y-1">
      <Image
        src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/392921de-92ce-4fbe-8f9c-33a0d59192bf-github-com/assets/svgs/logo-gartner-aa8c2e452b64-2.svg"
        alt="Gartner logo"
        width={100}
        height={29}
        className="h-7 w-auto"
      />
      <p className="mt-4 text-lg/relaxed text-text-primary">
        2025 Gartner&reg; Magic Quadrant&trade; for AI Code Assistants
      </p>
      <a href="#" className="mt-4 inline-flex items-center gap-1.5 text-base font-medium text-accent-secondary transition-colors group-hover:text-white">
        Read industry report
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </a>
    </div>
  </div>
);

const WorkflowAccelerationSection = () => {
  const [ref, isInView] = useInView({ threshold: 0.2 });

  return (
    <div className="relative py-24 sm:py-32 bg-background overflow-hidden">
      <div
        className="absolute inset-x-0 top-1/2 -translate-y-1/2 -z-20"
        aria-hidden="true"
      >
        <div className="mx-auto aspect-[1.5/1] w-[70rem] max-w-full bg-[radial-gradient(ellipse_at_center,var(--color-glow-purple)_0%,transparent_70%)] opacity-40 blur-3xl" />
      </div>
      <div className="container mx-auto px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            Accelerate your entire workflow
          </h2>
          <p className="mt-6 text-xl leading-relaxed text-text-secondary">
            From your first line of code to final deployment, GitHub provides AI and automation tools to help you build and ship better software faster.
          </p>
        </div>
        <div ref={ref} className="mt-16 sm:mt-20">
          <div className={`relative overflow-hidden rounded-2xl border border-border p-[1px] transition-all duration-1000 ease-out ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            <Starfield />
            <div className="relative z-10 rounded-2xl bg-gradient-to-b from-card/30 to-background/30 backdrop-blur-md">
              <div className="h-48 sm:h-56 md:h-64" aria-hidden="true"></div>
              <div className="relative border-t border-white/10 p-8 sm:p-12">
                <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2 lg:gap-16">
                  <div className={`max-w-lg transition-all duration-700 ease-out delay-200 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <h3 className="text-3xl font-semibold text-white">
                      Your AI partner everywhere. Copilot is ready to work with you at each step of the software development lifecycle.
                    </h3>
                    <a href="#" className="group mt-8 inline-flex items-center gap-2 text-lg font-medium text-accent-secondary transition-colors hover:text-white">
                      Explore GitHub Copilot
                      <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                    </a>
                  </div>
                  <div className="space-y-6">
                    <DuolingoCard isInView={isInView} />
                    <GartnerCard isInView={isInView} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkflowAccelerationSection;