import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

const customerStories = [
  {
    logo: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/392921de-92ce-4fbe-8f9c-33a0d59192bf-github-com/assets/svgs/figma-3.svg",
    alt: "Figma",
    industry: "Technology",
    headline: "Figma streamlines development and strengthens security",
    href: "#",
    logoWidth: 95,
  },
  {
    logo: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/392921de-92ce-4fbe-8f9c-33a0d59192bf-github-com/assets/svgs/mercedes-benz-4.svg",
    alt: "Mercedes-Benz",
    industry: "Automotive",
    headline: "Mercedes-Benz standardizes source code and automates onboarding",
    href: "#",
    logoWidth: 170,
  },
  {
    logo: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/392921de-92ce-4fbe-8f9c-33a0d59192bf-github-com/assets/svgs/mercado-libre-5.svg",
    alt: "Mercado Libre",
    industry: "Financial services",
    headline: "Mercado Libre cuts coding time by 50%",
    href: "#",
    logoWidth: 150,
  },
];

const logoHeight = 32;

export default function CustomerStoriesSection() {
  return (
    <section className="bg-secondary text-secondary-foreground py-16 md:py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-medium text-white leading-tight">
            From startups to enterprises, GitHub scales with teams of any size in any industry.
          </h2>
        </div>

        <div className="mt-12 mb-8 flex justify-center items-center">
          <div className="inline-flex items-center p-1 rounded-full border border-border">
            <button className="px-4 py-1.5 text-sm leading-5 font-medium rounded-full bg-white text-black">
              By industry
            </button>
            <button className="px-4 py-1.5 text-sm leading-5 font-medium rounded-full text-text-secondary hover:text-white transition-colors">
              By size
            </button>
            <button className="px-4 py-1.5 text-sm leading-5 font-medium rounded-full text-text-secondary hover:text-white transition-colors">
              By use case
            </button>
          </div>
        </div>

        <div className="border-y border-border">
          <div className="grid grid-cols-1 lg:grid-cols-3">
            <Link
              href={customerStories[0].href}
              className="group block p-8 md:p-12 hover:bg-surface transition-colors border-b lg:border-b-0 lg:border-r border-border"
            >
              <div className="flex flex-col justify-between min-h-[280px] md:min-h-[320px]">
                <div>
                  <Image
                    src={customerStories[0].logo}
                    alt={customerStories[0].alt}
                    width={customerStories[0].logoWidth}
                    height={logoHeight}
                    className="h-8 w-auto brightness-0 invert"
                  />
                </div>
                <div className="mt-4">
                  <p className="text-text-secondary text-base mb-2">{customerStories[0].industry}</p>
                  <h3 className="text-2xl font-medium text-white leading-tight">
                    {customerStories[0].headline}
                  </h3>
                </div>
              </div>
            </Link>
            <Link
              href={customerStories[1].href}
              className="group block p-8 md:p-12 hover:bg-surface transition-colors border-b lg:border-b-0 lg:border-r border-border"
            >
              <div className="flex flex-col justify-between min-h-[280px] md:min-h-[320px]">
                <div>
                  <Image
                    src={customerStories[1].logo}
                    alt={customerStories[1].alt}
                    width={customerStories[1].logoWidth}
                    height={logoHeight}
                    className="h-8 w-auto brightness-0 invert"
                  />
                </div>
                <div className="mt-4">
                  <p className="text-text-secondary text-base mb-2">{customerStories[1].industry}</p>
                  <h3 className="text-2xl font-medium text-white leading-tight">
                    {customerStories[1].headline}
                  </h3>
                </div>
              </div>
            </Link>
            <Link
              href={customerStories[2].href}
              className="group block p-8 md:p-12 hover:bg-surface transition-colors"
            >
              <div className="flex flex-col justify-between min-h-[280px] md:min-h-[320px]">
                <div>
                  <Image
                    src={customerStories[2].logo}
                    alt={customerStories[2].alt}
                    width={customerStories[2].logoWidth}
                    height={logoHeight}
                    className="h-8 w-auto brightness-0 invert"
                  />
                </div>
                <div className="mt-4">
                  <p className="text-text-secondary text-base mb-2">{customerStories[2].industry}</p>
                  <h3 className="text-2xl font-medium text-white leading-tight">
                    {customerStories[2].headline}
                  </h3>
                </div>
              </div>
            </Link>
          </div>
        </div>
        
        <div className="mt-12 flex flex-col sm:flex-row justify-center items-center gap-6 sm:gap-10">
          <Link href="#" className="group flex items-center gap-2 text-xl text-accent hover:underline">
            Explore customer stories
            <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link href="#" className="group flex items-center gap-2 text-xl text-accent hover:underline">
            View all solutions
            <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}