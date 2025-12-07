'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

const duckyImg = "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/392921de-92ce-4fbe-8f9c-33a0d59192bf-github-com/assets/images/cta-universe-ducky-e1504390abff-20.webp";
const monaImg = "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/392921de-92ce-4fbe-8f9c-33a0d59192bf-github-com/assets/images/cta-universe-mona-c50f77efd58b-21.webp";
const copilotImg = "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/392921de-92ce-4fbe-8f9c-33a0d59192bf-github-com/assets/images/cta-universe-copilot-7e0793a4b686-22.webp";

const FinalCtaSection = () => {
    const fadeInProps = (delay = 0) => ({
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: '-100px' },
        transition: { duration: 0.5, delay },
    });

    return (
        <section className="bg-secondary-background relative overflow-hidden">
            <div className="relative z-10 mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
                <div className="mx-auto max-w-4xl text-center">
                    <motion.h2
                        {...fadeInProps()}
                        className="text-5xl font-semibold tracking-[-0.025em] text-white mx-auto max-w-3xl"
                    >
                        Millions of developers and businesses call GitHub home
                    </motion.h2>
                    <motion.p
                        {...fadeInProps(0.1)}
                        className="mt-6 text-xl leading-8 text-muted"
                    >
                        Whether you’re scaling your development process or just learning how to code, GitHub is where you belong. Join the world’s most widely adopted developer platform to build the technologies that shape what’s next.
                    </motion.p>
                    <motion.div
                        {...fadeInProps(0.2)}
                        className="mt-10 flex flex-col items-stretch justify-center gap-4 sm:flex-row"
                    >
                        <form className="flex w-full gap-x-2 sm:max-w-md">
                            <label htmlFor="email-address" className="sr-only">
                                Enter your email
                            </label>
                            <input
                                id="email-address"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="w-full flex-auto rounded-md border border-border bg-input px-4 py-3 text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                                placeholder="Enter your email"
                            />
                            <button
                                type="submit"
                                className="inline-flex flex-shrink-0 items-center justify-center whitespace-nowrap rounded-md bg-primary px-5 py-3 text-base font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                            >
                                Sign up for GitHub
                            </button>
                        </form>
                        <a
                            href="#"
                            className="inline-flex w-full items-center justify-center whitespace-nowrap rounded-md border border-border px-5 py-3 text-base font-semibold text-foreground shadow-sm hover:bg-surface focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:w-auto"
                        >
                            Try GitHub Copilot free
                        </a>
                    </motion.div>
                </div>
                <motion.p
                    {...fadeInProps(0.3)}
                    className="mt-24 text-center text-xs text-muted-foreground"
                >
                    <sup>1</sup> GitHub internal customer data, 2025.
                </motion.p>
            </div>

            <div className="absolute inset-x-0 bottom-0 z-0 h-[250px] pointer-events-none">
                <div className="relative h-full w-full">
                    <motion.div
                        {...fadeInProps(0.5)}
                        className="absolute bottom-0 left-[5%] md:left-[10%] xl:left-[15%] hidden md:block"
                    >
                        <Image src={duckyImg} alt="Ducky character illustration" width={150} height={136} unoptimized />
                    </motion.div>

                    <motion.div
                        {...fadeInProps(0.4)}
                        className="absolute bottom-0 left-1/2 -translate-x-1/2 hidden md:block"
                    >
                        <Image src={monaImg} alt="Mona character illustration" width={180} height={212} unoptimized />
                    </motion.div>

                    <motion.div
                        {...fadeInProps(0.6)}
                        className="absolute bottom-0 right-[5%] md:right-[10%] xl:right-[15%] hidden md:block"
                    >
                        <Image src={copilotImg} alt="Copilot character illustration" width={150} height={147} unoptimized />
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default FinalCtaSection;