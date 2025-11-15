import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Import components
import Header from './components/Header';
import HomePage from './pages/HomePage';
import Page from './components/Section';
import ContentCard from './components/ContentCard';
import Modal from './components/Modal';
import RegistrationForm from './components/RegistrationForm';
import Footer from './components/Footer';
import MembersPage from './pages/MembersPage';
import FilterControls from './components/FilterControls';
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
    const [coursesFilter, setCoursesFilter] = useState<string>('all');

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

    const coursesFilters = [
        { key: 'all', label: t.filterAll },
        { key: 'course', label: t.filterCourses },
        { key: 'workshop', label: t.filterWorkshops },
    ];

    const filteredNews = mockData.newsAndAnnouncements.filter(item => newsFilter === 'all' || item.type === newsFilter);
    const filteredCourses = mockData.coursesAndWorkshops.filter(item => coursesFilter === 'all' || item.type === coursesFilter);


    const renderPageContent = () => {
        switch (currentPage) {
            case 'home':
                return <HomePage key="home" translations={t} setCurrentPage={setCurrentPage} openModal={openModal} />;
            case 'newsAndAnnouncements':
                return (
                    <Page key="newsAndAnnouncements" title={t.newsAndAnnouncements as string}>
                        <FilterControls filters={newsFilters as {key: string, label: string}[]} activeFilter={newsFilter} setActiveFilter={setNewsFilter} />
                        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                           <AnimatePresence>
                               {filteredNews.map(item => (
                                    <ContentCard 
                                        key={item.id} 
                                        item={item} 
                                        onImageClick={() => openModal('image', { src: item.image, title: item.title })}
                                        onVideoClick={item.video ? () => openModal('video', { src: item.video, title: item.title }) : undefined}
                                        translations={t}
                                    />
                                ))}
                           </AnimatePresence>
                        </motion.div>
                    </Page>
                );
            case 'coursesAndWorkshops':
                 return (
                    <Page key="coursesAndWorkshops" title={t.coursesAndWorkshops as string}>
                         <FilterControls filters={coursesFilters as {key: string, label: string}[]} activeFilter={coursesFilter} setActiveFilter={setCoursesFilter} />
                        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            <AnimatePresence>
                                {filteredCourses.map(item => (
                                    <ContentCard 
                                        key={item.id} 
                                        item={item} 
                                        onImageClick={() => openModal('image', { src: item.image, title: item.title })}
                                        onVideoClick={item.video ? () => openModal('video', { src: item.video, title: item.title }) : undefined}
                                        onRegisterClick={() => openModal('form', { course: item })}
                                        translations={t}
                                    />
                                ))}
                            </AnimatePresence>
                        </motion.div>
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
                            <div className="p-4">
                                <h3 className="text-xl font-bold mb-4 text-center">{modalContent.title}</h3>
                                <img src={modalContent.src} alt={modalContent.title} className="max-w-full max-h-[80vh] mx-auto rounded-lg shadow-2xl" />
                            </div>
                        )}
                        {modalContent.type === 'video' && modalContent.src && (
                             <div className="p-4 w-full">
                                <h3 className="text-xl font-bold mb-4 text-center">{modalContent.title}</h3>
                                <div className="aspect-w-16 aspect-h-9">
                                    <iframe 
                                      className="w-full h-full rounded-lg shadow-2xl min-h-[400px]"
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