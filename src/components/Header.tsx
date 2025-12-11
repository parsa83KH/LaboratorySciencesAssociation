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
            <div className="container mx-auto pl-4 sm:pl-6 lg:pl-8 pr-0 sm:pr-1 lg:pr-2">
                <div className="flex items-center justify-between h-20">
                    <div className="flex-shrink-0 flex items-center gap-4 sm:gap-5 min-w-0">
                        <img 
                            src={`${import.meta.env.BASE_URL || '/'}university.png`.replace(/\/\//g, '/')}
                            alt="University Logo" 
                            className="h-14 w-14 sm:h-16 sm:w-16 flex-shrink-0 object-contain"
                        />
                        <img 
                            src={`${import.meta.env.BASE_URL || '/'}club.png`.replace(/\/\//g, '/')}
                            alt="Club Logo" 
                            className="h-10 w-10 sm:h-12 sm:w-12 flex-shrink-0 object-contain"
                        />
                        <span className="font-bold text-base sm:text-xl md:text-2xl tracking-wider truncate overflow-hidden">
                            {translations.appName as string}
                        </span>
                    </div>
                    
                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex md:items-center md:space-x-8 rtl:space-x-reverse">
                        {navLinks.map((link) => (
                            <a
                                key={link.id}
                                href="#"
                                onClick={(e) => handleNavClick(e, link.id as PageKey)}
                                className={`relative font-medium text-muted-foreground hover:text-foreground transition-colors duration-200 ${currentPage === link.id ? 'text-foreground' : ''}`}
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
                        className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg text-foreground hover:bg-muted/50 transition-colors"
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
                        className="md:hidden border-t border-border overflow-hidden"
                    >
                        <div className="container mx-auto px-4 py-4 space-y-2">
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