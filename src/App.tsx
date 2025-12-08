import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Lenis from 'lenis';

// Import components
import Header from './components/Header';
import HomePage from './pages/HomePage';
import Page from './components/Section';
import ContentCard from './components/ContentCard';
import Modal from './components/Modal';
import RegistrationForm from './components/RegistrationForm';
import Footer from './components/Footer';
import MembersPage from './pages/MembersPage';
import ParticleBackground from './components/ParticleBackground';

// Import data and types
import { mockData } from './lib/data';
import { translations } from './lib/i18n';
import type { ContentItem, PageKey } from './types';


const App: React.FC = () => {
    const [theme, setTheme] = useState<'light' | 'dark'>(() => {
        if (typeof window !== 'undefined') {
            const savedTheme = localStorage.getItem('theme');
            if (savedTheme) return savedTheme as 'light' | 'dark';
            return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        }
        return 'dark';
    });
    const [currentPage, setCurrentPage] = useState<PageKey>('home');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState<{ type: 'image' | 'video' | 'form'; src?: string; title?: string, course?: ContentItem }>({ type: 'form' });

    // State for filtering
    const [newsFilter, setNewsFilter] = useState<string>('all');

    const lenisRef = useRef<Lenis | null>(null);

    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
            wheelMultiplier: 1,
            smoothTouch: false,
            touchMultiplier: 2,
            infinite: false,
        });

        lenisRef.current = lenis;
        (window as any).lenis = lenis;

        document.documentElement.classList.add('lenis', 'lenis-smooth');

        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        return () => {
            lenis.destroy();
            document.documentElement.classList.remove('lenis', 'lenis-smooth');
            delete (window as any).lenis;
        };
    }, []);

    useEffect(() => {
        const root = window.document.documentElement;
        root.classList.remove(theme === 'light' ? 'dark' : 'light');
        root.classList.add(theme);
        localStorage.setItem('theme', theme);
    }, [theme]);
    
    const openModal = useCallback((type: 'image' | 'video' | 'form', data?: { src?: string, title?: string, course?: ContentItem }) => {
        setModalContent({ type, ...data });
        setIsModalOpen(true);
    }, []);

    const closeModal = useCallback(() => {
        setIsModalOpen(false);
    }, []);

    const t = translations;

    const newsFilters = [
        { key: 'all', label: t.filterAll },
        { key: 'news', label: t.filterNews },
        { key: 'announcement', label: t.filterAnnouncements },
    ];

    const filteredNews = mockData.newsAndAnnouncements.filter(item => newsFilter === 'all' || item.type === newsFilter);
    const filteredCourses = mockData.coursesAndWorkshops;


    const renderPageContent = () => {
        switch (currentPage) {
            case 'home':
                return <HomePage key="home" translations={t} setCurrentPage={setCurrentPage} openModal={openModal} />;
            case 'newsAndAnnouncements':
                return (
                    <Page key="newsAndAnnouncements" title={t.newsAndAnnouncements as string} isNewsPage={true} theme={theme}>
                    </Page>
                );
            case 'coursesAndWorkshops':
                 return (
                    <Page key="coursesAndWorkshops" title={t.coursesAndWorkshops as string} isNewsPage={true} theme={theme}>
                        <div className="courses-page-container">
                            <div className="courses-grid-container" role="region" aria-label="Courses list">
                                <ContentCard 
                                    cardType="database-workshop" 
                                    posterImage="/data_searching.jpg"
                                    price="رایگان"
                                    translations={t}
                                />
                                <ContentCard 
                                    price="500,000 تومان"
                                    translations={t}
                                />
                                <ContentCard 
                                    price="750,000 تومان"
                                    translations={t}
                                />
                                <ContentCard 
                                    price="1,000,000 تومان"
                                    translations={t}
                                />
                            </div>
                        </div>
                    </Page>
                );
            case 'members':
                return <MembersPage key="members" translations={t} />;
            default:
                return null;
        }
    }

    return (
        <div className={`text-foreground min-h-screen transition-colors duration-300 font-sans relative`}>
            <ParticleBackground theme={theme} />
            <div className="relative z-10 flex flex-col min-h-screen">
                <Header
                    translations={t}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />
                <main className="flex-grow">
                    <AnimatePresence mode="wait">
                        {renderPageContent()}
                    </AnimatePresence>
                </main>
                <Footer translations={t} />
            </div>

            <AnimatePresence>
                {isModalOpen && (
                    <Modal onClose={closeModal}>
                        {modalContent.type === 'image' && modalContent.src && (
                            <div className="p-2 sm:p-4">
                                <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-center px-2">{modalContent.title}</h3>
                                <img src={modalContent.src} alt={modalContent.title} className="max-w-full max-h-[70vh] sm:max-h-[80vh] mx-auto rounded-lg shadow-2xl" />
                            </div>
                        )}
                        {modalContent.type === 'video' && modalContent.src && (
                             <div className="p-2 sm:p-4 w-full">
                                <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-center px-2">{modalContent.title}</h3>
                                <div className="aspect-w-16 aspect-h-9">
                                    <iframe 
                                      className="w-full h-full rounded-lg shadow-2xl min-h-[250px] sm:min-h-[350px] md:min-h-[400px]"
                                      src={modalContent.src}
                                      title={modalContent.title}
                                      frameBorder="0" 
                                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                      allowFullScreen>
                                    </iframe>
                                </div>
                            </div>
                        )}
                        {modalContent.type === 'form' && modalContent.course && (
                            <RegistrationForm course={modalContent.course} translations={t} />
                        )}
                    </Modal>
                )}
            </AnimatePresence>
        </div>
    );
};

export default App;