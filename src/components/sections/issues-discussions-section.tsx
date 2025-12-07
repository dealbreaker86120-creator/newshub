'use client';

import * as React from 'react';
import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { Plus, ChevronRight, CircleDot, GitMerge, CheckSquare, Square, MoreHorizontal } from 'lucide-react';
import { cn } from '@/lib/utils'; // Assuming this utility exists for classname merging

// Self-contained Accordion components based on Shadcn/UI structure
const Accordion = AccordionPrimitive.Root;

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn('border-b border-white/10', className)}
    {...props}
  />
));
AccordionItem.displayName = 'AccordionItem';

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        'group flex flex-1 items-center justify-between py-6 font-medium transition-all',
        className
      )}
      {...props}
    >
      {children}
      <Plus className="h-7 w-7 shrink-0 text-white/50 transition-transform duration-200 group-data-[state=open]:rotate-45" />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
));
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className="overflow-hidden text-lg data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
    {...props}
  >
    <div className={cn('pb-6 pt-0', className)}>{children}</div>
  </AccordionPrimitive.Content>
));
AccordionContent.displayName = AccordionPrimitive.Content.displayName;

const IssuesDiscussionsSection = () => {
    const [subIssuesOpen, setSubIssuesOpen] = React.useState(true);

    const accordionItems = [
        {
            value: 'item-1',
            title: 'Keep track of your tasks',
            description: 'Create issues and manage projects with tools that adapt to your code.',
            linkText: 'Explore GitHub Issues',
            linkHref: '/features/issues',
        },
        {
            value: 'item-2',
            title: 'Share ideas and ask questions',
            description: 'Create space for open-ended conversations alongside your project.',
            linkText: 'Explore GitHub Discussions',
            linkHref: '/features/discussions',
        },
        {
            value: 'item-3',
            title: 'Review code changes together',
            description: 'Assign initial reviews to Copilot for greater speed and quality.',
            linkText: 'Explore code review',
            linkHref: '/features/code-review',
        },
        {
            value: 'item-4',
            title: 'Fund open source projects',
            description: 'Become an open source partner and support the tools and libraries that power your work.',
            linkText: 'Explore GitHub Sponsors',
            linkHref: '/sponsors',
        },
    ];

    return (
        <div className="overflow-hidden bg-background py-16 sm:py-24 lg:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-3xl text-center">
                    <h2 className="text-[32px] font-semibold leading-tight tracking-tight text-white md:text-[40px]">
                        Work together, achieve more
                    </h2>
                    <p className="mt-4 text-lg leading-8 text-text-secondary">
                        From planning and discussion to code review, GitHub keeps your team’s conversation and context next to your code.
                    </p>
                </div>

                <div className="relative mt-16 grid items-start lg:grid-cols-2 lg:gap-x-24">
                    <div className="lg:max-w-lg">
                        <Accordion type="single" defaultValue="item-1" collapsible className="w-full">
                            {accordionItems.map((item) => (
                                <AccordionItem value={item.value} key={item.value}>
                                    <AccordionTrigger>
                                        <h3 className="text-2xl font-semibold text-white text-left">{item.title}</h3>
                                    </AccordionTrigger>
                                    <AccordionContent>
                                        <p className="text-text-secondary">{item.description}</p>
                                        <a href={item.linkHref} className="mt-4 inline-flex items-center gap-1 font-semibold text-accent-secondary transition-colors hover:text-accent-secondary/80">
                                            {item.linkText}
                                            <ChevronRight className="h-4 w-4" />
                                        </a>
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </div>

                    <div className="relative mt-16 self-stretch lg:mt-0">
                        <div className="absolute -inset-2.5 rounded-2xl bg-gradient-to-tr from-[#a371f7] to-[#ff4bcd] opacity-20 blur-3xl lg:-inset-4"></div>
                        <div className="relative rounded-xl border border-white/10 bg-[#161b22] px-6 py-6 lg:px-8 lg:py-8">
                            <div className="flex items-start justify-between gap-4">
                                <h3 className="text-xl font-semibold text-white">
                                    New rendering engine <span className="text-text-secondary">#920</span>
                                </h3>
                                <button className="flex-shrink-0 text-text-secondary hover:text-white">
                                    <MoreHorizontal className="h-5 w-5" />
                                </button>
                            </div>
                            <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2">
                                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#238636]/20 px-2 py-0.5 text-xs font-medium text-[#3fb950]">
                                    <CircleDot className="h-3.5 w-3.5" />
                                    Open
                                </span>
                                <div className="flex items-center gap-2 text-xs text-text-secondary">
                                    <div className="h-5 w-5 rounded-full bg-gray-700"></div>
                                    <span>
                                        <strong className="font-semibold text-text-secondary">exactlymyra</strong> commented 5 days ago
                                    </span>
                                </div>
                            </div>

                            <div className="mt-6 border-l-2 border-purple-400/50 pl-4 text-sm text-text-secondary">
                                <p><strong className="font-medium text-white">Epic description</strong></p>
                                <p className="mt-1">
                                    Now that we've decided on our new rendering engine (see <a href="#" className="text-accent-secondary hover:underline">#824</a>), we have some follow-up work to do. Use this issue for tracking. I've done a first pass of sub-tasks for us here.
                                </p>
                            </div>

                            <div className="mt-6">
                                <div onClick={() => setSubIssuesOpen(!subIssuesOpen)} className="group flex cursor-pointer items-center gap-2">
                                    <ChevronRight className={cn('h-4 w-4 text-text-secondary transition-transform duration-200 group-hover:text-white', { 'rotate-90': subIssuesOpen })} />
                                    <h4 className="text-sm font-medium text-white">Sub-issues</h4>
                                    <span className="text-sm text-text-secondary">· 1/3</span>
                                </div>
                                {subIssuesOpen && (
                                    <ul className="mt-3 space-y-2.5 pl-6 animate-in fade-in duration-300">
                                        <li className="flex items-center gap-3">
                                            <GitMerge className="h-4 w-4 flex-shrink-0 text-text-secondary" />
                                            <CheckSquare className="h-5 w-5 flex-shrink-0 text-[#3fb950]" />
                                            <span className="text-sm text-text-secondary line-through">Update collision logic</span>
                                        </li>
                                        <li className="flex items-center gap-3">
                                            <GitMerge className="h-4 w-4 flex-shrink-0 text-text-secondary" />
                                            <CheckSquare className="h-5 w-5 flex-shrink-0 text-[#3fb950]" />
                                            <span className="text-sm text-text-secondary line-through">Engine prototype</span>
                                        </li>
                                        <li className="flex items-center gap-3">
                                            <GitMerge className="h-4 w-4 flex-shrink-0 text-text-secondary" />
                                            <Square className="h-5 w-5 flex-shrink-0 text-text-secondary" />
                                            <span className="text-sm text-white">Updates to aliens</span>
                                        </li>
                                    </ul>
                                )}
                            </div>

                            <button className="mt-6 flex w-full items-center justify-center gap-2 rounded-md border border-white/10 py-1.5 text-sm text-text-secondary transition-colors hover:bg-white/5">
                                <Plus className="h-4 w-4" />
                                Create sub-issue
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default IssuesDiscussionsSection;