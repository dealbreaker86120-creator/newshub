"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Plus, Minus, ArrowRight } from "lucide-react";

type AutomationFeature = {
  value: string;
  title: string;
  description: string;
  link?: {
    href: string;
    text: string;
  };
};

const features: AutomationFeature[] = [
  {
    value: "item-1",
    title: "Automate your path to production",
    description: "Ship faster with secure, reliable CI/CD.",
    link: {
      href: "#", // Placeholder link
      text: "Explore GitHub Actions",
    },
  },
  {
    value: "item-2",
    title: "Code instantly from anywhere",
    description:
      "Launch a full, cloud-based development environment in seconds.",
  },
  {
    value: "item-3",
    title: "Keep momentum on the go",
    description:
      "Manage projects and assign tasks to Copilot, all from your mobile device.",
  },
  {
    value: "item-4",
    title: "Shape your toolchain",
    description: "Extend your stack with apps, actions, and AI models.",
  },
];

const AutomationAccordion = () => {
  const [value, setValue] = React.useState<string[]>(["item-1"]);

  return (
    <Accordion
      type="multiple"
      value={value}
      onValueChange={setValue}
      className="w-full"
    >
      {features.map((feature) => (
        <AccordionItem
          key={feature.value}
          value={feature.value}
          className="border-b border-border-subtle py-2"
        >
          <AccordionTrigger className="group py-4 text-left font-semibold text-2xl text-foreground hover:no-underline">
            <span className="flex-1 pr-6">{feature.title}</span>
            <Plus className="h-8 w-8 shrink-0 text-muted-foreground transition-transform duration-300 group-data-[state=open]:hidden" />
            <Minus className="h-8 w-8 shrink-0 text-muted-foreground transition-transform duration-300 group-data-[state=closed]:hidden" />
          </AccordionTrigger>
          <AccordionContent className="pt-2 pb-4 pr-12">
            <p className="text-base text-muted">{feature.description}</p>
            {feature.link && (
              <a
                href={feature.link.href}
                className="mt-4 inline-flex items-center font-semibold text-accent hover:text-accent-foreground hover:no-underline"
              >
                {feature.link.text}
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            )}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

const AutomationFeaturesSection = () => {
  return (
    <section className="bg-background py-16 sm:py-24 lg:py-32 overflow-hidden">
      <div className="container">
        <div className="grid grid-cols-1 items-center gap-x-12 gap-y-16 lg:grid-cols-2">
          <div className="max-w-lg">
            <AutomationAccordion />
          </div>
          <div className="relative">
            <div
              className="absolute -inset-x-8 -inset-y-12 bottom-0 bg-[radial-gradient(ellipse_at_50%_100%,var(--color-glow-purple),transparent_70%)] opacity-60 -z-10"
              aria-hidden="true"
            />
            <div className="relative rounded-xl bg-gradient-to-b from-border to-transparent p-px">
              <div className="rounded-[11px] bg-card">
                <Image
                  src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/392921de-92ce-4fbe-8f9c-33a0d59192bf-github-com/assets/images/accordion-1-ce487d44c0bf-4.webp"
                  alt="A user interface showing workflow runs in GitHub Actions, with details like status, duration, and person who triggered the action."
                  width={1050}
                  height={638}
                  className="w-full h-auto rounded-[11px]"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AutomationFeaturesSection;