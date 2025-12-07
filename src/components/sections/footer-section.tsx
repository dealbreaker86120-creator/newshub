'use client';

import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Globe,
  Youtube,
  Twitter,
  Twitch,
  Github,
  Linkedin,
  Instagram,
  ChevronDown,
} from 'lucide-react';

const GitHubLogo = ({ className }: { className?: string }) => (
  <svg
    height="30"
    aria-hidden="true"
    viewBox="0 0 16 16"
    version="1.1"
    width="30"
    className={className}
    fill="currentColor"
  >
    <path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.19.01-.82.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.28.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21-.15.46-.55.38A8.013 8.013 0 0 1 0 8c0-4.42 3.58-8 8-8Z"></path>
  </svg>
);

const TikTokIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M16 8.1c-2.2 0-4-1.8-4-4V2a4 4 0 0 1 4 4h0Z" />
    <path d="M12 2v10c0 2.2-1.8 4-4 4H7" />
    <path d="M12 8H8a4 4 0 0 0-4 4v2a4 4 0 0 0 4 4h4c2.2 0 4-1.8 4-4v-1.9c0-1.2-.5-2.3-1.4-3.1Z" />
  </svg>
);

const linkColumns = [
  {
    title: 'Platform',
    links: ['Features', 'Enterprise', 'Copilot', 'AI', 'Security', 'Pricing', 'Team', 'Resources', 'Roadmap', 'Compare GitHub'],
  },
  {
    title: 'Ecosystem',
    links: ['Developer API', 'Partners', 'Education', 'GitHub CLI', 'GitHub Desktop', 'GitHub Mobile', 'GitHub Marketplace', 'MCP Registry'],
  },
  {
    title: 'Support',
    links: ['Docs', 'Community Forum', 'Professional Services', 'Premium Support', 'Skills', 'Status', 'Contact GitHub'],
  },
  {
    title: 'Company',
    links: ['About', 'Why GitHub', 'Customer stories', 'Blog', 'The ReadME Project', 'Careers', 'Newsroom', 'Inclusion', 'Social Impact', 'Shop'],
  },
];

const socialLinks = [
  { href: '#', icon: Linkedin, name: 'LinkedIn' },
  { href: '#', icon: Instagram, name: 'Instagram' },
  { href: '#', icon: Youtube, name: 'YouTube' },
  { href: '#', icon: Twitter, name: 'X/Twitter' },
  { href: '#', icon: TikTokIcon, name: 'TikTok' },
  { href: '#', icon: Twitch, name: 'Twitch' },
  { href: '#', icon: Github, name: 'GitHub' },
];

const legalLinks = [
  { href: '#', text: 'Terms' },
  { href: '#', text: 'Privacy' },
  { href: '#', text: 'Sitemap' },
  { href: '#', text: 'Manage cookies' },
  { href: '#', text: 'Do not share my personal information' },
];

const FooterSection = () => {
  return (
    <footer className="bg-[#0d1117] text-[#8b949e] pt-16 pb-8">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-[1.5fr_repeat(4,1fr)] gap-8 text-sm">
          <div className="md:col-span-2 lg:col-span-1">
            <h3 className="text-sm font-semibold text-white tracking-wider mb-4">
              Subscribe to our developer newsletter
            </h3>
            <p className="text-sm mb-4">
              Get tips, technical guides, and best practices. Twice a month.
            </p>
            <form action="#" method="POST" className="flex flex-col sm:flex-row gap-2">
              <Input
                type="email"
                name="email"
                placeholder="your-email@example.com"
                className="bg-input border-[rgba(240,246,252,0.1)] text-white placeholder:text-muted-foreground focus:ring-ring focus:border-ring flex-grow"
                required
              />
              <Button variant="outline" type="submit" className="border-[rgba(240,246,252,0.1)] text-white bg-transparent hover:bg-surface hover:text-white">
                Subscribe
              </Button>
            </form>
          </div>
          {linkColumns.map((column) => (
            <div key={column.title}>
              <h4 className="text-sm font-semibold text-white tracking-wider mb-4">
                {column.title}
              </h4>
              <ul className="space-y-3">
                {column.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm text-[#8b949e] hover:text-white hover:no-underline">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 pt-8 border-t border-[rgba(240,246,252,0.1)]">
          <div className="flex flex-col-reverse gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-x-4 gap-y-2 text-xs">
              <span className="flex items-center gap-2 text-[#8b949e] flex-shrink-0">
                <GitHubLogo className="h-5 w-5 fill-current text-[#8b949e]" />
                © 2025 GitHub, Inc.
              </span>
              {legalLinks.map((link, index) => (
                <a key={link.text} href={link.href} className="text-[#8b949e] hover:text-white hover:no-underline">
                  {link.text}{index === 1 && <span className="text-[#8b949e]"> (Updated 02/2024)</span>}
                </a>
              ))}
            </div>
            <div className="flex items-center justify-center gap-x-6">
              <ul className="flex items-center gap-4">
                {socialLinks.map(({ href, icon: Icon, name }) => (
                  <li key={name}>
                    <a href={href} aria-label={name} className="text-[#8b949e] hover:text-white">
                      <Icon className="h-4 w-4" />
                    </a>
                  </li>
                ))}
              </ul>
              <button type="button" className="flex items-center gap-1 text-[#8b949e] hover:text-white text-xs">
                <Globe size={16} />
                <span>English</span>
                <ChevronDown size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;