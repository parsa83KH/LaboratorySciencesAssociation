import React from 'react';
import LogoAnimation from './LogoAnimation';
import Button from './Button';
import type { Translation, PageKey } from '../types';

interface HeroProps {
    translations: Translation;
    setCurrentPage: (page: PageKey) => void;
}

const Hero: React.FC<HeroProps> = ({ translations, setCurrentPage }) => {
    const descriptionText = translations.heroDescription as string;
    const words = descriptionText.split(' ');

    return (
        <section className="relative h-screen min-h-[500px] md:min-h-[600px] flex items-start justify-center text-center text-foreground overflow-visible pt-4 md:pt-8 px-4">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 w-full">
                <LogoAnimation />
                <h1 className="main-title-anim text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tight drop-shadow-lg mt-2 px-2" style={{textShadow: '0 0 30px hsla(var(--primary), 0.5)'}}>
                    {translations.heroTitle as string}
                </h1>
                
                <h2 className="subtitle-anim mt-4 md:mt-6 text-base sm:text-lg md:text-xl lg:text-2xl font-semibold text-primary drop-shadow-md px-2" style={{textShadow: '0 0 20px hsla(var(--primary), 0.4)'}}>
                    {translations.heroSubtitle as string}
                </h2>

                <p className="description-anim mt-4 md:mt-6 max-w-3xl mx-auto text-sm sm:text-base md:text-lg text-muted-foreground drop-shadow px-4 leading-relaxed">
                    {words.map((word, index) => (
                        <span 
                            key={index} 
                            style={{ 
                                animationDelay: `${1.8 + index * 0.1}s`,
                                // Using margin to create space between words, which is more reliable for inline-block elements in RTL.
                                marginLeft: '0.4em'
                            }}
                        >
                            {word}
                        </span>
                    ))}
                </p>

                <div className="mt-6 md:mt-10 opacity-0 flex flex-col items-center gap-3 md:gap-4 px-4" style={{ animation: 'fadeInUp 1.2s ease-out 2.5s forwards' }}>
                    <Button
                        variant="primary"
                        className="w-full sm:w-auto py-2.5 md:py-3 px-5 md:px-6 text-sm md:text-base max-w-xs"
                        onClick={() => {
                            const footer = document.querySelector('footer');
                            if (footer) {
                                const lenis = (window as any).lenis;
                                if (lenis) {
                                    lenis.scrollTo(footer, { offset: 0, duration: 1.5 });
                                } else {
                                    footer.scrollIntoView({ behavior: 'smooth' });
                                }
                            }
                        }}
                    >
                        ارتباط با ما
                    </Button>
                    <div className="flex flex-col gap-3 w-full justify-center items-center md:hidden">
                        <Button
                            variant="primary"
                            className="w-full py-2.5 px-5 text-sm max-w-xs"
                            onClick={() => setCurrentPage('coursesAndWorkshops')}
                        >
                            دوره‌ها
                        </Button>
                        <Button
                            variant="primary"
                            className="w-full py-2.5 px-5 text-sm max-w-xs"
                            onClick={() => setCurrentPage('newsAndAnnouncements')}
                        >
                            اخبار
                        </Button>
                    </div>
                    <p className="text-xs sm:text-sm md:text-lg font-medium mt-2 md:mt-4" style={{ color: '#2563eb' }}>حرکت کنید</p>
                    <div className="scroll-indicator">
                        <div className="scroll-arrow"></div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;