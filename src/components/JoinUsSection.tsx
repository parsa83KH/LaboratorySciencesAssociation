import React, { useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import type { Translation } from '../types';

// Let TypeScript know that Swiper is available on the global window object
declare const Swiper: any;

interface JoinUsSectionProps {
    translations: Translation;
}

const JoinUsSection: React.FC<JoinUsSectionProps> = ({ translations }) => {
    const swiperRef = useRef<any>(null);
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const inViewRef = useRef(false);

    const startAutoplay = useCallback(() => {
        if (timerRef.current) clearTimeout(timerRef.current);
        timerRef.current = setTimeout(() => {
            if (swiperRef.current) {
                swiperRef.current.slideNext();
            }
        }, 10000);
    }, []);

    const stopAutoplay = useCallback(() => {
        if (timerRef.current) {
            clearTimeout(timerRef.current);
            timerRef.current = null;
        }
    }, []);

    const handleNextClick = useCallback(() => {
        if (swiperRef.current) {
            swiperRef.current.slideNext();
        }
    }, []);

    useEffect(() => {
        const swiperInstance = new Swiper('#home-slider .swiper-container', {
            direction: 'vertical',
            loop: true,
            grabCursor: true,
            speed: 1000,
            parallax: true,
            autoplay: false,
            effect: 'slide',
            mousewheelControl: false,
            pagination: null,
            onSlideChangeEnd: () => {
                if (inViewRef.current) {
                    startAutoplay();
                }
            },
            onTouchEnd: () => {
                if (inViewRef.current) {
                    startAutoplay();
                }
            },
        });

        swiperRef.current = swiperInstance;

        return () => {
            if (swiperRef.current) {
                swiperRef.current.destroy(true, true);
                swiperRef.current = null;
            }
            stopAutoplay();
        };
    }, [startAutoplay, stopAutoplay]);

    const handlePrevClick = useCallback(() => {
        if (swiperRef.current) {
            swiperRef.current.slidePrev();
        }
    }, []);

    const t = translations;

    // Start autoplay when component mounts and keep it running while on page
    useEffect(() => {
        inViewRef.current = true;
        startAutoplay();
        
        return () => {
            inViewRef.current = false;
            stopAutoplay();
        };
    }, [startAutoplay, stopAutoplay]);

    return (
        <motion.div
            className="w-full h-full"
        >
            <div id="home-slider" className="w-full h-full relative">
                <div className="swiper-container">
                    <div className="swiper-wrapper">
                        {/* Slide 1 */}
                        <div className="swiper-slide">
                            <div className="swiper-image" data-swiper-parallax-y="-20%">
                                <div className="swiper-image-inner swiper-image-left swiper-image-one">
                                    <h1>{t.swiperTitle1a as string} <span className="emphasis">{t.swiperTitle1b as string}</span><br /><span>{t.swiperTitle1c as string}</span></h1>
                                    <p>{t.swiperMeta1 as string}</p>
                                </div>
                            </div>
                            <div className="swiper-image" data-swiper-parallax-y="35%">
                                <div className="swiper-image-inner swiper-image-right swiper-image-two">
                                    <p className="paragraph">{t.swiperDescription1 as string}</p>
                                </div>
                            </div>
                        </div>
                        {/* Slide 2 */}
                        <div className="swiper-slide">
                            <div className="swiper-image" data-swiper-parallax-y="-20%">
                                <div className="swiper-image-inner swiper-image-left swiper-image-three">
                                    <h1>{t.swiperTitle2a as string} <span className="emphasis">{t.swiperTitle2b as string}</span><br /><span>{t.swiperTitle2c as string}</span></h1>
                                    <p>{t.swiperMeta2 as string}</p>
                                </div>
                            </div>
                            <div className="swiper-image" data-swiper-parallax-y="35%">
                                <div className="swiper-image-inner swiper-image-right swiper-image-four">
                                    <p className="paragraph">{t.swiperDescription2 as string}</p>
                                </div>
                            </div>
                        </div>
                        {/* Slide 3 */}
                        <div className="swiper-slide">
                            <div className="swiper-image" data-swiper-parallax-y="-20%">
                                <div className="swiper-image-inner swiper-image-left swiper-image-five">
                                        <h1>{t.swiperTitle3a as string} <span className="emphasis">{t.swiperTitle3b as string}</span><br /><span>{t.swiperTitle3c as string}</span></h1>
                                        <p>{t.swiperMeta3 as string}</p>
                                    </div>
                                </div>
                            <div className="swiper-image" data-swiper-parallax-y="35%">
                                <div className="swiper-image-inner swiper-image-right swiper-image-six">
                                    <p className="paragraph">{t.swiperDescription3 as string}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Navigation Buttons Container - Centered */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex items-center gap-1 sm:gap-2">
                    <motion.button
                        onClick={handlePrevClick}
                        className="group w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 flex items-center justify-center bg-background/50 backdrop-blur-xl rounded-full text-primary border-2 border-primary/30 shadow-2xl transition-all duration-300 ease-in-out hover:scale-110 hover:bg-background/70 hover:border-primary/60"
                        aria-label="Previous slide"
                        whileTap={{ scale: 0.95 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8 transition-transform duration-300 group-hover:translate-x-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                        </svg>
                    </motion.button>

                    <motion.button
                        onClick={handleNextClick}
                        className="group w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 flex items-center justify-center bg-background/50 backdrop-blur-xl rounded-full text-primary border-2 border-primary/30 shadow-2xl transition-all duration-300 ease-in-out hover:scale-110 hover:bg-background/70 hover:border-primary/60"
                        aria-label="Next slide"
                        whileTap={{ scale: 0.95 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8 transition-transform duration-300 group-hover:-translate-x-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                        </svg>
                    </motion.button>
                </div>
            </div>
        </motion.div>
    );
};

export default JoinUsSection;