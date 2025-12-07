"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronRight, Plus, Minus } from "lucide-react";

const mainFeature = {
  title: "Plan with clarity.",
  description: "Organize everything from high-level roadmaps to everyday tasks.",
  image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/392921de-92ce-4fbe-8f9c-33a0d59192bf-github-com/assets/images/pillar-1-dd667a921f55-9.webp",
  link: {
    text: "Explore GitHub Projects",
    href: "#",
  },
};

const testimonial = {
  quote: "It helps us onboard new software engineers and get them productive right away. We have all our source code, issues, and pull requests in one place. GitHub is a complete platform that frees us from menial tasks and enables us to do our best work.",
  author: "Fabian Faulhaber",
  role: "Application Manager at Mercedes-Benz",
};

const secondaryFeatures = [
  {
    title: "Keep track of your tasks",
    description: "Create issues and manage projects with tools that adapt to your code.",
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/392921de-92ce-4fbe-8f9c-33a0d59192bf-github-com/assets/images/pillar-2-ff69e872920a-10.webp",
    link: { text: "Explore GitHub Issues", href: "#"},
  },
  {
    title: "Share ideas and ask questions",
    description: "Create space for open-ended conversations alongside your project.",
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/392921de-92ce-4fbe-8f9c-33a0d59192bf-github-com/assets/images/pillar-3-0a063e2daae2-11.webp",
    link: { text: "Explore GitHub Discussions", href: "#"},
  },
  {
    title: "Review code changes together",
    description: "Assign initial reviews to Copilot for greater speed and quality.",
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/392921de-92ce-4fbe-8f9c-33a0d59192bf-github-com/assets/images/pillar-2-ff69e872920a-10.webp",
    link: { text: "Explore code review", href: "#"},
  },
  {
    title: "Fund open source projects",
    description: "Become an open source partner and support the tools and libraries that power your work.",
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/392921de-92ce-4fbe-8f9c-33a0d59192bf-github-com/assets/images/pillar-3-0a063e2daae2-11.webp",
    link: { text: "Explore GitHub Sponsors", href: "#"},
  },
];

const allFeatures = [mainFeature, ...secondaryFeatures];

const CollaborationSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [openAccordionIndex, setOpenAccordionIndex] = useState<number | null>(null);

  const handleFeatureClick = (index: number) => {
    setActiveIndex(index);
    if (index === 0) {
      setOpenAccordionIndex(null);
    } else {
      setOpenAccordionIndex(index - 1);
    }
  };

  const handleAccordionClick = (index: number) => {
    const newAccordionIndex = openAccordionIndex === index ? null : index;
    setOpenAccordionIndex(newAccordionIndex);
    
    if (newAccordionIndex !== null) {
      setActiveIndex(index + 1);
    } else if (activeIndex === index + 1) {
      // If closing the currently active accordion item, revert to the main feature
      setActiveIndex(0);
    }
  };

  const QuoteIcon = () => (
    <svg width="25" height="20" viewBox="0 0 25 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="text-primary mb-4">
        <path d="M9.28125 20C7.57812 20 6.07682 19.3906 4.77612 18.1719C3.47542 16.9531 2.82471 15.4688 2.82471 13.7188C2.82471 11.8906 3.48958 10.0234 4.81909 8.11719C6.14868 6.21094 7.91016 4.14062 10.0938 1.90625L12.0435 0L14.4961 2.53125L12.5464 4.85938C13.2512 5.53125 13.8242 6.25 14.2656 7.01562C14.707 7.78125 14.9277 8.57812 14.9277 9.40625C14.9277 11.3906 14.2083 13.0625 12.7695 14.4219C11.3308 15.7812 9.77881 16.7188 8.11328 17.2344C8.51562 16.5 8.78394 15.75 8.91797 14.9844L6.02734 14.0781C5.41406 15.8281 4.41895 17.2188 3.04102 18.25C4.78516 19.3125 6.84106 19.9844 9.20898 20H9.28125ZM24.2083 20C22.5052 20 20.9922 19.3906 19.6626 18.1719C18.3506 16.9531 17.6941 15.4688 17.6941 13.7188C17.6941 11.8906 18.3591 10.0234 19.6885 8.11719C21.0178 6.21094 22.7793 4.14062 24.9629 1.90625L24.9375 1.875L22.9878 0L25 2.53125L23.0508 4.85938C23.7556 5.53125 24.3286 6.25 24.77 7.01562C25.2114 7.78125 25.4321 8.57812 25.4321 9.40625C25.4321 11.3906 24.7126 13.0625 23.2734 14.4219C21.8347 15.7812 20.2827 16.7188 18.6172 17.2344C19.0195 16.5 19.2878 15.75 19.4219 14.9844L16.5312 14.0781C15.918 15.8281 14.9229 17.2188 13.5449 18.25C15.2891 19.3125 17.345 19.9844 19.7129 20H24.2083Z"></path>
    </svg>
  );

  return (
    <section className="bg-background text-foreground py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-semibold text-white tracking-tight">
            Work together, achieve more
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground mt-4">
            From planning and discussion to code review, GitHub keeps your team’s conversation and context next to your code.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 xl:gap-16 items-start">
          <div className="lg:sticky top-24">
            <div
              className={`cursor-pointer ${activeIndex === 0 ? 'active' : ''}`}
              onClick={() => handleFeatureClick(0)}
            >
              <h3 className="text-2xl font-semibold text-white">{mainFeature.title}</h3>
              <p className="mt-2 text-lg text-muted-foreground">{mainFeature.description}</p>
              <a href={mainFeature.link.href} className="inline-flex items-center text-accent-secondary hover:text-white mt-4 font-semibold text-lg">
                {mainFeature.link.text}
                <ChevronRight className="w-5 h-5 ml-1" />
              </a>
            </div>

            <div className="mt-8">
              <QuoteIcon />
              <p className="text-lg text-white font-medium">"{testimonial.quote}"</p>
              <p className="mt-4 text-sm text-muted-foreground">{testimonial.author}</p>
              <p className="text-sm text-muted-foreground">{testimonial.role}</p>
            </div>
            
            <div className="mt-8 border-t border-border">
              {secondaryFeatures.map((feature, index) => {
                const isAccordionOpen = openAccordionIndex === index;
                return (
                  <div key={index} className="border-b border-border" onClick={() => handleAccordionClick(index)}>
                    <div className="py-6 cursor-pointer flex justify-between items-center">
                      <h3 className="text-xl font-semibold text-white">{feature.title}</h3>
                      {isAccordionOpen ? <Minus className="w-6 h-6 text-muted-foreground"/> : <Plus className="w-6 h-6 text-muted-foreground" />}
                    </div>
                    {isAccordionOpen && (
                      <div className="pb-6 -mt-2">
                        <p className="text-muted-foreground text-lg">{feature.description}</p>
                        <a href={feature.link.href} className="inline-flex items-center text-accent-secondary hover:text-white mt-3 font-semibold text-lg">
                          {feature.link.text}
                          <ChevronRight className="w-5 h-5 ml-1" />
                        </a>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="relative w-full h-full">
            <div className="absolute inset-0.5 -m-8 bg-gradient-to-br from-[#a371f7] to-[#ff4bcd] opacity-15 blur-3xl"></div>
            <div className="relative p-px rounded-xl bg-gradient-to-br from-[#a371f7] via-[#7928ca] to-[#ff4bcd] shadow-[0_0_80px_rgba(163,113,247,0.3)]">
              <div className="bg-[#161b22] rounded-[11px] overflow-hidden">
                <div className="relative">
                  {allFeatures.map((feature, index) => (
                    <div
                      key={index}
                      className={`transition-opacity duration-500 ease-in-out ${
                        activeIndex === index ? 'opacity-100' : 'opacity-0 absolute inset-0'
                      }`}
                    >
                      <Image
                        src={feature.image}
                        alt={feature.title}
                        width={1200}
                        height={750}
                        className="w-full h-auto"
                        unoptimized
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CollaborationSection;