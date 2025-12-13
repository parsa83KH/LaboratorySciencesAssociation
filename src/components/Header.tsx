import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Translation, PageKey } from '../types';

interface HeaderProps {
    translations: Translation;
    currentPage: PageKey;
    setCurrentPage: (page: PageKey) => void;
}

const Header: React.FC<HeaderProps> = ({ translations, currentPage, setCurrentPage }) => {

    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, page: PageKey) => {
        e.preventDefault();
        setCurrentPage(page);
        setMobileMenuOpen(false);
    };

    const navLinks = [
        { id: 'home', text: translations.navHome },
        { id: 'newsAndAnnouncements', text: translations.navNewsAndAnnouncements },
        { id: 'coursesAndWorkshops', text: translations.navCoursesAndWorkshops },
        { id: 'members', text: translations.navMembers },
    ];

    return (
        <motion.header
            initial={{ y: 0 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.2 }}
            className="w-full backdrop-blur-md bg-background/60 fixed top-0 left-0 right-0 z-50 border-b border-border shadow-sm"
        >
            <div className="w-full">
                <div className="flex items-center h-20 gap-2 sm:gap-0">
                    <div className="flex-shrink flex items-center min-w-0 pl-2 sm:pl-4 md:pl-6 lg:pl-8 flex-1">
                        <img 
                            src={`${import.meta.env.BASE_URL || '/'}university.png`.replace(/\/\//g, '/')}
                            alt="University Logo" 
                            className="h-16 w-16 flex-shrink-0 object-contain"
                            loading="eager"
                            fetchPriority="high"
                        />
                        <img 
                            src={`${import.meta.env.BASE_URL || '/'}club.png`.replace(/\/\//g, '/')}
                            alt="Club Logo" 
                            className="h-12 w-12 flex-shrink-0 object-contain ml-0.5 sm:ml-4 md:ml-5"
                            loading="eager"
                            fetchPriority="high"
                        />
                        <span className="header-app-name font-bold tracking-wider mr-2 sm:mr-0 rtl:ml-2 rtl:sm:ml-0" style={{ whiteSpace: 'nowrap' }}>
                            {translations.appName as string}
                        </span>
                    </div>
                    
                    {/* Desktop Navigation */}
                    <nav className="header-desktop-nav hidden md:flex md:items-center md:space-x-4 lg:space-x-6 xl:space-x-8 rtl:space-x-reverse pl-2 md:pl-3 lg:pl-4">
                        {navLinks.map((link) => (
                            <a
                                key={link.id}
                                href="#"
                                onClick={(e) => handleNavClick(e, link.id as PageKey)}
                                className={`relative font-medium text-sm md:text-base text-muted-foreground hover:text-foreground transition-colors duration-200 whitespace-nowrap ${currentPage === link.id ? 'text-foreground' : ''}`}
                            >
                                {link.text as string}
                                {currentPage === link.id && (
                                    <motion.div
                                        layoutId="underline"
                                        className="absolute bottom-[-4px] left-0 w-full h-0.5 bg-primary"
                                    />
                                )}
                            </a>
                        ))}
                    </nav>

                    {/* Mobile Hamburger Menu Button */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="header-mobile-menu md:hidden flex items-center justify-center w-10 h-10 rounded-lg text-foreground hover:bg-muted/50 transition-colors pl-4 sm:pl-5"
                        aria-label="Toggle menu"
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            {mobileMenuOpen ? (
                                <path d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>
            </div>

            {/* Mobile Navigation Menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.nav
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="lg:hidden border-t border-border overflow-hidden"
                    >
                        <div className="container mx-auto pl-5 pr-4 py-4 space-y-2">
                            {navLinks.map((link) => (
                                <a
                                    key={link.id}
                                    href="#"
                                    onClick={(e) => handleNavClick(e, link.id as PageKey)}
                                    className={`block py-3 px-4 rounded-lg font-medium transition-colors duration-200 ${
                                        currentPage === link.id
                                            ? 'bg-primary/10 text-primary'
                                            : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                                    }`}
                                >
                                    {link.text as string}
                                </a>
                            ))}
                        </div>
                    </motion.nav>
                )}
            </AnimatePresence>
        </motion.header>
    );
};

export default Header;