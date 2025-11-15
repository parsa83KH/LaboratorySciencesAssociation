import React from 'react';
import { motion } from 'framer-motion';

interface PageProps {
    title: string;
    children: React.ReactNode;
}

const Page: React.FC<PageProps> = ({ title, children }) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
        >
            <section className="py-16 sm:py-24">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 0.5 }}
                        className="text-center mb-12"
                    >
                        <h2 
                            className="text-3xl md:text-4xl font-bold tracking-tight inline-block relative pb-2"
                        >
                            {title}
                            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2/3 h-1 bg-primary rounded-full"></span>
                        </h2>
                    </motion.div>
                    {children}
                </div>
            </section>
        </motion.div>
    );
};

export default Page;