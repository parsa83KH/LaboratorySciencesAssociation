import React from 'react';
import { motion } from 'framer-motion';

// Import components that will be used
import Hero from '../components/Hero';
import InnovationSection from '../components/InnovationSection';
import PlaceholderSection from '../components/PlaceholderSection';
import JoinUsSection from '../components/JoinUsSection';


import type { Translation, PageKey, ContentItem } from '../types';

interface HomePageProps {
    translations: Translation;
    setCurrentPage: (page: PageKey) => void;
    openModal: (type: 'image' | 'video' | 'form', data?: { src?: string, title?: string, course?: ContentItem }) => void;
}

const HomePage: React.FC<HomePageProps> = ({ translations, setCurrentPage }) => {

    return (
        <motion.div 
            key="home-content" 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
        >
            <Hero translations={translations} setCurrentPage={setCurrentPage} />
            <InnovationSection translations={translations} />
            <PlaceholderSection translations={translations} />
            <section className="h-screen relative">
              <JoinUsSection translations={translations} />
            </section>
        </motion.div>
    );
};

export default HomePage;