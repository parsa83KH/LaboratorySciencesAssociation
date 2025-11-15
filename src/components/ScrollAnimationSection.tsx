import React, { useEffect } from 'react';
import type { Translation } from '../types';

interface ScrollAnimationSectionProps {
    translations: Translation;
}

const ScrollAnimationSection: React.FC<ScrollAnimationSectionProps> = ({ translations: t }) => {
    useEffect(() => {
        // This script enables the animation if the browser supports CSS animation-timeline.
        if (window.CSS && CSS.supports('animation-timeline: scroll()')) {
            document.documentElement.dataset.enhanced = 'true';
        }
    }, []);

    return (
        <div className="scroll-animation-section">
            {/* The trigger element needs a large height to create the scroll area for the animation. */}
            <div className="trigger">
                {/* The content is sticky, so it stays in view while the trigger scrolls past it. */}
                <div className="content">
                    <div className="scroll-animation-text">
                        <h2 className="text-4xl md:text-5xl font-bold mb-4">{t.placeholderTitle as string}</h2>
                        <p className="text-lg md:text-xl max-w-2xl mx-auto">{t.placeholderDescription as string}</p>
                    </div>

                    <div className="grid">
                        <div className="layer">
                            <div><img src="https://picsum.photos/seed/science1/400/500" alt="Scientific research in a lab" /></div>
                            <div><img src="https://picsum.photos/seed/science2/400/500" alt="Close-up of a microscope" /></div>
                        </div>
                        <div className="layer">
                            <div><img src="https://picsum.photos/seed/genetics/400/500" alt="DNA helix structure" /></div>
                            <div><img src="https://picsum.photos/seed/chemistry/400/500" alt="Chemist working with beakers" /></div>
                        </div>
                        <div className="layer">
                            <div><img src="https://picsum.photos/seed/petri-dish/400/500" alt="Cultures growing in a petri dish" /></div>
                        </div>
                        {/* This is the central image that scales up */}
                        <div className="scaler">
                            <img src="https://picsum.photos/seed/mainlab/800/600" alt="Modern laboratory equipment" />
                        </div>
                    </div>
                </div>
            </div>
            
            {/* This is a special footer that animates based on the page scroll position. */}
            <div className="flipping-footer">
                <span>
                    <span className="static-text">From Data... </span>
                    <span className="arm" role="img" aria-label="microscope icon">🔬</span>{' '}
                    <span className="table">...to Discovery!</span>
                </span>
            </div>
            
             {/* This empty section provides space after the animation is complete. */}
            <section style={{ height: '50vh' }}></section>
        </div>
    );
};

export default ScrollAnimationSection;