import React from 'react';
import LogoAnimation from './LogoAnimation';
import type { Translation, PageKey } from '../types';

interface HeroProps {
    translations: Translation;
    setCurrentPage: (page: PageKey) => void;
}

const Hero: React.FC<HeroProps> = ({ translations, setCurrentPage }) => {

    const handleCTAClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setCurrentPage('coursesAndWorkshops');
    }
    
    const descriptionText = translations.heroDescription as string;
    const words = descriptionText.split(' ');

    return (
        <section className="relative h-screen min-h-[600px] flex items-start justify-center text-center text-foreground overflow-visible pt-24 md:pt-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <LogoAnimation />
                <h1 className="main-title-anim text-4xl md:text-6xl font-extrabold tracking-tight drop-shadow-lg" style={{textShadow: '0 0 30px hsla(var(--primary), 0.5)'}}>
                    {translations.heroTitle as string}
                </h1>
                
                <h2 className="subtitle-anim mt-4 text-xl md:text-2xl font-semibold text-primary drop-shadow-md" style={{textShadow: '0 0 20px hsla(var(--primary), 0.4)'}}>
                    {translations.heroSubtitle as string}
                </h2>

                <p className="description-anim mt-6 max-w-3xl mx-auto text-lg text-muted-foreground drop-shadow">
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

                <div className="mt-10 opacity-0" style={{ animation: 'fadeInUp 1.2s ease-out 2.5s forwards' }}>
                    <button
                        onClick={handleCTAClick}
                        className="bg-primary text-primary-foreground font-bold py-3 px-8 rounded-full text-lg hover:scale-105 transform transition-transform duration-300 shadow-xl"
                    >
                        {translations.heroButton as string}
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Hero;