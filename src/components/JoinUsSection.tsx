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
            swiperRef.current.slidePrev(); // Reversed functionality
        }
    }, []);

    useEffect(() => {
        const isMobile = window.innerWidth < 768;
        const swiperInstance = new Swiper('#home-slider .swiper-container', {
            direction: 'vertical',
            loop: true,
            grabCursor: false,
            speed: 1000,
            parallax: true,
            autoplay: false,
            effect: 'slide',
            mousewheelControl: false,
            touchRatio: 0, // Disable touch/swipe on all devices
            allowTouchMove: false, // Disable touch movement
            simulateTouch: false, // Disable touch simulation
            preventClicks: false,
            preventClicksPropagation: false,
            pagination: null,
            onSlideChangeEnd: () => {
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
            swiperRef.current.slideNext(); // Reversed functionality
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

    // Allow vertical scroll on mobile when touching the slider
    useEffect(() => {
        if (window.innerWidth >= 768) return; // Only for mobile
        
        const sliderElement = document.getElementById('home-slider');
        if (!sliderElement) return;

        let touchStartY = 0;
        let touchStartX = 0;
        let isVerticalScroll = false;

        const handleTouchStart = (e: TouchEvent) => {
            // Don't interfere with button clicks
            const target = e.target as HTMLElement;
            if (target.closest('button')) return;
            
            touchStartY = e.touches[0].clientY;
            touchStartX = e.touches[0].clientX;
            isVerticalScroll = false;
        };

        const handleTouchMove = (e: TouchEvent) => {
            // Don't interfere with button clicks
            const target = e.target as HTMLElement;
            if (target.closest('button')) return;
            
            if (!touchStartY || !touchStartX) return;
            
            const touchCurrentY = e.touches[0].clientY;
            const touchCurrentX = e.touches[0].clientX;
            const deltaY = touchCurrentY - touchStartY;
            const deltaX = touchCurrentX - touchStartX;
            const absDeltaY = Math.abs(deltaY);
            const absDeltaX = Math.abs(deltaX);

            // Determine if this is a vertical scroll gesture
            if (absDeltaY > absDeltaX && absDeltaY > 10) {
                isVerticalScroll = true;
                // Disable swiper to allow page scroll
                if (swiperRef.current) {
                    swiperRef.current.disable();
                }
                // Don't prevent default - let browser handle vertical scroll naturally
                return;
            } else if (absDeltaX > absDeltaY && absDeltaX > 10) {
                // Horizontal swipe - keep swiper enabled
                isVerticalScroll = false;
            }
        };

        const handleTouchEnd = () => {
            if (swiperRef.current) {
                swiperRef.current.enable();
            }
            touchStartY = 0;
            touchStartX = 0;
            isVerticalScroll = false;
        };

        // Use passive listeners to allow native scrolling
        sliderElement.addEventListener('touchstart', handleTouchStart, { passive: true });
        sliderElement.addEventListener('touchmove', handleTouchMove, { passive: true });
        sliderElement.addEventListener('touchend', handleTouchEnd, { passive: true });

        return () => {
            sliderElement.removeEventListener('touchstart', handleTouchStart);
            sliderElement.removeEventListener('touchmove', handleTouchMove);
            sliderElement.removeEventListener('touchend', handleTouchEnd);
        };
    }, []);

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
                        className="group w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 flex items-center justify-center bg-background/50 backdrop-blur-xl rounded-full text-[#F37021] border-2 border-[#F37021]/30 shadow-2xl transition-all duration-300 ease-in-out hover:scale-110 hover:bg-background/70 hover:border-[#F37021]/60"
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
                        className="group w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 flex items-center justify-center bg-background/50 backdrop-blur-xl rounded-full text-[#F37021] border-2 border-[#F37021]/30 shadow-2xl transition-all duration-300 ease-in-out hover:scale-110 hover:bg-background/70 hover:border-[#F37021]/60"
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