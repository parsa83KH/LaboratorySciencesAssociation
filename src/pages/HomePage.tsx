import React from 'react';
import { motion } from 'framer-motion';

// Import components that will be used
import Hero from '../components/Hero';
import IntroductionSection from '../components/IntroductionSection';
import NewsSection from '../components/NewsSection';
import PopularCoursesSection from '../components/PopularCoursesSection';


import type { Translation, PageKey, ContentItem } from '../types';

interface HomePageProps {
    translations: Translation;
    setCurrentPage: (page: PageKey) => void;
    openModal: (type: 'image' | 'video' | 'form', data?: { src?: string, title?: string, course?: ContentItem }) => void;
}

const HomePage: React.FC<HomePageProps> = ({ translations, setCurrentPage }) => {
    // #region agent log
    React.useEffect(() => {
        const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        fetch('http://127.0.0.1:7242/ingest/33b23cfa-c7a4-4dd9-b44a-3f684598eacc',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'HomePage.tsx:19',message:'HomePage mount',data:{isTouchDevice,windowWidth:window.innerWidth,windowHeight:window.innerHeight,userAgent:navigator.userAgent.substring(0,50)},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'C'})}).catch(()=>{});
    }, []);
    // #endregion

    return (
        <motion.div 
            key="home-content" 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
        >
            <Hero translations={translations} setCurrentPage={setCurrentPage} />
            <IntroductionSection translations={translations} />
            <section className="h-[70vh] sm:h-[80vh] md:h-screen relative min-h-[500px] touch-pan-y">
              <NewsSection translations={translations} />
            </section>
            <PopularCoursesSection translations={translations} setCurrentPage={setCurrentPage} />
        </motion.div>
    );
};

export default HomePage;