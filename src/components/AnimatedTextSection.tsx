import React from 'react';
import type { Translation } from '../types';

interface AnimatedTextSectionProps {
    translations: Translation;
}

const AnimatedParagraph: React.FC<{ text: string }> = ({ text }) => {
    // --m is the mask length, determines the gradient transition width
    const maskLength = 5; 
    return (
        <p
            className="text-sm sm:text-base md:text-lg lg:text-xl"
            style={{
                // @ts-ignore
                '--n': text.length,
                '--m': maskLength,
            }}
        >
            <span>{text}</span>
        </p>
    );
};


const AnimatedTextSection: React.FC<AnimatedTextSectionProps> = ({ translations: t }) => {
    return (
        <div className="animated-text-container flex flex-col justify-center w-full h-full max-w-md mx-auto px-4 sm:px-6 md:px-8">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6 sm:mb-8">
                {t.joinUsTitle as string}
            </h2>
            <div className="space-y-6 sm:space-y-8">
                <AnimatedParagraph text={t.joinUsP1 as string} />
                <AnimatedParagraph text={t.joinUsP2 as string} />
            </div>
        </div>
    );
};

export default AnimatedTextSection;
