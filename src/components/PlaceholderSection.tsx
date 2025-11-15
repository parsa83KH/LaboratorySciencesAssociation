import React from 'react';
import { motion } from 'framer-motion';
import type { Translation } from '../types';

interface PlaceholderSectionProps {
    translations: Translation;
}

const PlaceholderSection: React.FC<PlaceholderSectionProps> = ({ translations }) => {
    return (
        <section className="py-24 sm:py-32 bg-background text-foreground">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.5 }}
                    className="text-3xl md:text-4xl font-bold tracking-tight mb-6"
                >
                    {translations.placeholderTitle as string}
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="max-w-3xl mx-auto text-lg text-muted-foreground"
                >
                    {translations.placeholderDescription as string}
                </motion.p>
            </div>
        </section>
    );
};

export default PlaceholderSection;
