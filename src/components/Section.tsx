import React from 'react';
import { motion } from 'framer-motion';
import SectionParticleBackground from './SectionParticleBackground';

interface PageProps {
    title: string;
    children: React.ReactNode;
    isNewsPage?: boolean;
    theme?: 'light' | 'dark';
}

const containerTransition = { duration: 0.4, ease: 'easeInOut' as const };
const titleTransition = { duration: 0.5 };

const Page: React.FC<PageProps> = ({ title, children, isNewsPage = false, theme = 'dark' }) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={containerTransition}
        >
            {isNewsPage ? (
                <div className="news-page-container relative">
                    <SectionParticleBackground theme={theme} />
                    <div className="relative z-10">
                        <h1 className="l-heading">
                            {title}
                        </h1>
                        {children}
                    </div>
                </div>
            ) : (
                <section className="py-8 sm:py-12 md:py-16 lg:py-24">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.5 }}
                            transition={titleTransition}
                            className="text-center mb-6 sm:mb-8 md:mb-12"
                        >
                            <h2 
                                className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight inline-block relative pb-2 px-2"
                            >
                                {title}
                                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2/3 h-1 bg-primary rounded-full"></span>
                            </h2>
                        </motion.div>
                        {children}
                    </div>
                </section>
            )}
        </motion.div>
    );
};

export default Page;