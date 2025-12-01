import React, { useState } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import type { Translation, PageKey } from '../types';

interface HeaderProps {
    translations: Translation;
    currentPage: PageKey;
    setCurrentPage: (page: PageKey) => void;
}

const Header: React.FC<HeaderProps> = ({ translations, currentPage, setCurrentPage }) => {
    
    const { scrollY } = useScroll();
    const [hidden, setHidden] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useMotionValueEvent(scrollY, "change", (latest) => {
        const previous = scrollY.getPrevious() || 0;
        // Hide header when scrolling down past a threshold, show when scrolling up
        // Don't hide if mobile menu is open
        if (!isMobileMenuOpen && latest > previous && latest > 150) {
            setHidden(true);
        } else {
            setHidden(false);
        }
    });

    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, page: PageKey) => {
        e.preventDefault();
        setCurrentPage(page);
        setIsMobileMenuOpen(false); // Close mobile menu when navigating
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(prev => !prev);
        // Prevent header from hiding when menu is toggled
        if (!isMobileMenuOpen) {
            setHidden(false);
        }
    };

    const navLinks = [
        { id: 'home', text: translations.navHome },
        { id: 'newsAndAnnouncements', text: translations.navNewsAndAnnouncements },
        { id: 'coursesAndWorkshops', text: translations.navCoursesAndWorkshops },
        { id: 'members', text: translations.navMembers },
    ];

    return (
        <motion.header
            variants={{
                visible: { y: 0 },
                hidden: { y: '-100%' },
            }}
            animate={hidden ? 'hidden' : 'visible'}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            className="w-full backdrop-blur-md bg-background/50 sticky top-0 z-50 border-b border-border"
        >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    <div className="flex-shrink-0 flex items-center gap-3 font-bold text-xl tracking-wider">
                        <img 
                            src={`${import.meta.env.BASE_URL || '/'}university.png`.replace(/\/\//g, '/')}
                            alt="University Logo" 
                            className="h-12 w-auto object-contain"
                        />
                        <span>{translations.appName as string}</span>
                    </div>
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
                    
                    {/* Mobile Menu Button */}
                    <button
                        onClick={toggleMobileMenu}
                        className="md:hidden p-2 rounded-md text-foreground hover:bg-muted transition-colors"
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
                            {isMobileMenuOpen ? (
                                <path d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>
                
                {/* Mobile Menu */}
                <motion.nav
                    initial={false}
                    animate={{
                        height: isMobileMenuOpen ? 'auto' : 0,
                        opacity: isMobileMenuOpen ? 1 : 0,
                    }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="md:hidden overflow-hidden"
                >
                    <div className="py-4 space-y-2">
                        {navLinks.map((link) => (
                            <a
                                key={link.id}
                                href="#"
                                onClick={(e) => handleNavClick(e, link.id as PageKey)}
                                className={`block px-4 py-2 rounded-md font-medium transition-colors duration-200 ${
                                    currentPage === link.id
                                        ? 'bg-primary text-primary-foreground'
                                        : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                                }`}
                            >
                                {link.text as string}
                            </a>
                        ))}
                    </div>
                </motion.nav>
                </div>
            </div>
        </motion.header>
    );
};

export default Header;