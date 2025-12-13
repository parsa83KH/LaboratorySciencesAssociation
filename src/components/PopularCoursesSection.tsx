import React, { useEffect, useState, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import type { Translation, ContentItem, PageKey } from '../types';

import { mockData } from '../lib/data';

import SectionParticleBackground from './SectionParticleBackground';
import Button from './Button';
import Modal from './Modal';

interface PopularCoursesSectionProps {

    translations: Translation;

    setCurrentPage: (page: PageKey) => void;

}

const PopularCoursesSection: React.FC<PopularCoursesSectionProps> = ({ translations, setCurrentPage }) => {

    // Always use dark theme, ignore system preference
    const theme: 'light' | 'dark' = 'dark';

    // Detect touch device to disable hover animations for better performance
    const isTouchDevice = useMemo(() => {
        return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    }, []);

    // Memoize popular items to avoid recalculation on every render
    const popularItems = useMemo(() => mockData.coursesAndWorkshops.slice(0, 6), []);

    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const isDraggingRef = useRef(false);
    const startXRef = useRef(0);
    const scrollLeftRef = useRef(0);
    const dragStartTimeRef = useRef(0);
    const dragStartPosRef = useRef({ x: 0, y: 0 });
    const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
    const [tiltStyles, setTiltStyles] = useState<{[key: number]: React.CSSProperties}>({});
    const [selectedImage, setSelectedImage] = useState<{ src: string; title: string } | null>(null);

    useEffect(() => {
        const scrollContainer = scrollContainerRef.current;
        if (!scrollContainer) return;

        const handleMouseDown = (e: MouseEvent) => {
            // Only left click
            if (e.button !== 0) return;
            
            const target = e.target as HTMLElement;
            // If clicking on button or image, don't drag
            if (target.closest('button') || target.closest('.course-image-clickable')) {
                return;
            }

            isDraggingRef.current = true;
            startXRef.current = e.pageX - scrollContainer.offsetLeft;
            scrollLeftRef.current = scrollContainer.scrollLeft;
            dragStartTimeRef.current = Date.now();
            dragStartPosRef.current = { x: e.pageX, y: e.pageY };
            scrollContainer.style.cursor = 'grabbing';
            scrollContainer.style.userSelect = 'none';
        };

        const handleMouseMove = (e: MouseEvent) => {
            if (!isDraggingRef.current) return;
            
            const x = e.pageX - scrollContainer.offsetLeft;
            const walk = (x - startXRef.current) * 1.5; // Speed multiplier
            
            // Only start dragging if mouse moved significantly
            const moveDistance = Math.abs(e.pageX - dragStartPosRef.current.x);
            if (moveDistance > 5) {
                e.preventDefault();
                scrollContainer.scrollLeft = scrollLeftRef.current - walk;
            }
        };

        const handleMouseUp = () => {
            isDraggingRef.current = false;
            if (scrollContainer) {
                scrollContainer.style.cursor = 'grab';
                scrollContainer.style.userSelect = '';
            }
        };

        const handleMouseLeave = () => {
            isDraggingRef.current = false;
            if (scrollContainer) {
                scrollContainer.style.cursor = 'grab';
                scrollContainer.style.userSelect = '';
            }
        };

        // Touch events for mobile
        const handleTouchStart = (e: TouchEvent) => {
            const target = e.target as HTMLElement;
            if (target.closest('button') || target.closest('.course-image-clickable')) {
                return;
            }
            
            isDraggingRef.current = true;
            startXRef.current = e.touches[0].pageX - scrollContainer.offsetLeft;
            scrollLeftRef.current = scrollContainer.scrollLeft;
            dragStartTimeRef.current = Date.now();
            dragStartPosRef.current = { x: e.touches[0].pageX, y: e.touches[0].pageY };
        };

        const handleTouchMove = (e: TouchEvent) => {
            if (!isDraggingRef.current) return;
            const target = e.target as HTMLElement;
            if (target.closest('button') || target.closest('.course-image-clickable')) {
                isDraggingRef.current = false;
                return;
            }
            
            const x = e.touches[0].pageX - scrollContainer.offsetLeft;
            const walk = (x - startXRef.current) * 1.5;
            
            // Only start dragging if touch moved significantly
            const moveDistance = Math.abs(e.touches[0].pageX - dragStartPosRef.current.x);
            if (moveDistance > 5) {
                scrollContainer.scrollLeft = scrollLeftRef.current - walk;
            }
        };

        const handleTouchEnd = () => {
            isDraggingRef.current = false;
        };

        scrollContainer.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);
        scrollContainer.addEventListener('mouseleave', handleMouseLeave);
        
        // Touch events
        scrollContainer.addEventListener('touchstart', handleTouchStart, { passive: true });
        scrollContainer.addEventListener('touchmove', handleTouchMove, { passive: false });
        scrollContainer.addEventListener('touchend', handleTouchEnd);

        return () => {
            scrollContainer.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
            scrollContainer.removeEventListener('mouseleave', handleMouseLeave);
            scrollContainer.removeEventListener('touchstart', handleTouchStart);
            scrollContainer.removeEventListener('touchmove', handleTouchMove);
            scrollContainer.removeEventListener('touchend', handleTouchEnd);
        };
    }, []);

    // Memoize handlers to prevent unnecessary re-renders
    const handleClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        setCurrentPage('coursesAndWorkshops');
    }, [setCurrentPage]);

    const handleRegisterClick = useCallback((e: React.MouseEvent<HTMLButtonElement>, item: ContentItem) => {
        e.preventDefault();
        e.stopPropagation();
        setCurrentPage('coursesAndWorkshops');
    }, [setCurrentPage]);

    const handleImageClick = useCallback((e: React.MouseEvent<HTMLImageElement>, item: ContentItem) => {
        e.preventDefault();
        e.stopPropagation();
        // Prevent opening modal if user was dragging
        const timeSinceDragStart = Date.now() - dragStartTimeRef.current;
        const wasDragging = isDraggingRef.current && timeSinceDragStart > 100;
        
        if (wasDragging) {
            isDraggingRef.current = false;
            return;
        }
        setSelectedImage({ src: item.image, title: item.title });
    }, []);

    const handleImageTouchStart = useCallback((e: React.TouchEvent<HTMLImageElement>, item: ContentItem) => {
        // Store touch start time to detect tap vs drag
        const touchStartTime = Date.now();
        const touchStartX = e.touches[0].clientX;
        const touchStartY = e.touches[0].clientY;
        
        const handleTouchEnd = (e: TouchEvent) => {
            const touchEndTime = Date.now();
            const touchEndX = e.changedTouches[0].clientX;
            const touchEndY = e.changedTouches[0].clientY;
            
            const timeDiff = touchEndTime - touchStartTime;
            const xDiff = Math.abs(touchEndX - touchStartX);
            const yDiff = Math.abs(touchEndY - touchStartY);
            
            // If it's a quick tap (not a drag), open modal
            if (timeDiff < 300 && xDiff < 10 && yDiff < 10 && !isDraggingRef.current) {
                setSelectedImage({ src: item.image, title: item.title });
            }
            
            document.removeEventListener('touchend', handleTouchEnd);
        };
        
        document.addEventListener('touchend', handleTouchEnd, { once: true });
    }, []);

    const handleCloseImageModal = useCallback(() => {
        setSelectedImage(null);
    }, []);

    // Memoize mouse handlers to prevent unnecessary re-renders
    // Only enable hover animations on non-touch devices
    const handleCardMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>, index: number) => {
        if (isTouchDevice) return; // Skip hover animations on touch devices
        
        const card = cardRefs.current[index];
        if (!card) return;

        const rect = card.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        
        // Calculate offset from center (-1 to 1)
        const offsetX = (mouseX - centerX) / (rect.width / 2);
        const offsetY = (mouseY - centerY) / (rect.height / 2);
        
        // Calculate rotation (max 10 degrees)
        const rotateY = offsetX * 10;
        const rotateX = -offsetY * 10;
        
        // Calculate depth based on distance from center
        // Parts closer to mouse go inward, parts further go outward
        const distanceFromCenter = Math.sqrt(offsetX * offsetX + offsetY * offsetY);
        const maxDepth = 30;
        const translateZ = (1 - distanceFromCenter) * maxDepth;
        
        setTiltStyles(prev => ({
            ...prev,
            [index]: {
                transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(${translateZ}px) scale3d(1.05, 1.05, 1.05)`,
            }
        }));
    }, [isTouchDevice]);

    const handleCardMouseLeave = useCallback((index: number) => {
        setTiltStyles(prev => {
            const newStyles = {...prev};
            delete newStyles[index];
            return newStyles;
        });
    }, []);

    const handleGlowMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>, index: number) => {
        if (isTouchDevice) return; // Skip hover animations on touch devices
        
        const el = e.currentTarget;
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        el.style.setProperty('--mouse-x', `${x}px`);
        el.style.setProperty('--mouse-y', `${y}px`);
    }, [isTouchDevice]);

    const handleGlowMouseEnter = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        if (isTouchDevice) return; // Skip hover animations on touch devices
        e.currentTarget.classList.add('is-hovering');
    }, [isTouchDevice]);

    const handleGlowMouseLeave = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        if (isTouchDevice) return; // Skip hover animations on touch devices
        e.currentTarget.classList.remove('is-hovering');
    }, [isTouchDevice]);

    // Memoize date formatter to avoid recreating on every render
    const formatToJalali = useCallback((dateString: string) => {
        try {
            const date = new Date(dateString);
            if (Number.isNaN(date.getTime())) return dateString;
            return new Intl.DateTimeFormat('fa-IR-u-ca-persian', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
            }).format(date);
        } catch {
            return dateString;
        }
    }, []);


    return (

        <section className="popular-courses-horizontal-section">

            <div className="particles-container">

                <SectionParticleBackground theme={theme} />

            </div>

            <div 

                ref={scrollContainerRef}

                className="courses-scroll-container"

            >

                <div className="courses-scroll-wrapper">

                    {popularItems.map((item, index) => {
                        const price = item.price ?? (translations.priceUnknown as string);
                        // Use date directly if it's already in Persian format (contains Persian digits or /), otherwise convert
                        const jalaliDate = item.date.includes('۱۴') || item.date.includes('۱۳') || item.date.includes('۱۴۰') 
                            ? item.date 
                            : formatToJalali(item.date);

                        return (

                            <div 

                                key={item.id} 

                                className={`course-card ${isTouchDevice ? 'no-hover-animations' : ''}`}
                                ref={(el) => {
                                    cardRefs.current[index] = el;
                                }}
                                onMouseMove={!isTouchDevice ? (e) => handleCardMouseMove(e, index) : undefined}
                                onMouseLeave={!isTouchDevice ? () => handleCardMouseLeave(index) : undefined}
                            >

                                <div 
                                    className="course-card-inner"
                                    style={!isTouchDevice ? tiltStyles[index] : undefined}
                                    onMouseMove={!isTouchDevice ? (e) => handleGlowMouseMove(e, index) : undefined}
                                    onMouseEnter={!isTouchDevice ? handleGlowMouseEnter : undefined}
                                    onMouseLeave={!isTouchDevice ? handleGlowMouseLeave : undefined}
                                >

                                    <div className="course-image-wrapper">

                                        <img 
                                            src={item.image} 
                                            alt={item.title} 
                                            className="course-image course-image-clickable"
                                            draggable="false"
                                            loading="lazy"
                                            onClick={(e) => handleImageClick(e, item)}
                                            onTouchStart={(e) => handleImageTouchStart(e, item)}
                                            onLoad={() => {
                                                // #region agent log
                                                fetch('http://127.0.0.1:7242/ingest/33b23cfa-c7a4-4dd9-b44a-3f684598eacc',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'PopularCoursesSection.tsx:292',message:'Image loaded',data:{imageSrc:item.image,title:item.title},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'B'})}).catch(()=>{});
                                                // #endregion
                                            }}
                                            onError={() => {
                                                // #region agent log
                                                fetch('http://127.0.0.1:7242/ingest/33b23cfa-c7a4-4dd9-b44a-3f684598eacc',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'PopularCoursesSection.tsx:292',message:'Image load error',data:{imageSrc:item.image,title:item.title},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'B'})}).catch(()=>{});
                                                // #endregion
                                            }}
                                            onDragStart={(e) => {
                                                e.preventDefault();
                                                e.stopPropagation();
                                            }}
                                        />

                                    </div>

                                    <div className="course-text-content">

                                        <h3 className="course-title">{item.title}</h3>

                                        <div className="course-meta">

                                            <span className="course-price">

                                                💰 {price}

                                            </span>

                                            <span className="course-date">📅 {jalaliDate}</span>

                                            {item.time && (
                                                <span className="course-time">🕐 {item.time}</span>
                                            )}

                                            {item.location && (
                                                <span className="course-location">📍 {item.location}</span>
                                            )}

                                        </div>

                                        <Button 

                                            variant="primary"

                                            className="w-full py-3 px-6 text-base"

                                            onClick={(e) => handleRegisterClick(e, item)}

                                        >

                                            {translations.popularCoursesView as string}

                                        </Button>

                                    </div>

                                </div>

                            </div>

                        );

                    })}

                </div>

            </div>

            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm"
                        onClick={handleCloseImageModal}
                    >
                        <button
                            onClick={handleCloseImageModal}
                            className="absolute top-4 right-4 rtl:left-4 rtl:right-auto text-white hover:text-gray-300 transition-colors p-2 rounded-full z-10 bg-black/50 hover:bg-black/70 backdrop-blur-sm"
                            aria-label="Close modal"
                        >
                            <svg className="w-7 h-7 sm:w-8 sm:h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                        </button>
                        <motion.img
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            transition={{ type: "spring", stiffness: 300, damping: 25 }}
                            src={selectedImage.src} 
                            alt={selectedImage.title}
                            className="max-w-full max-h-[90vh] object-contain"
                            onClick={(e) => e.stopPropagation()}
                        />
                    </motion.div>
                )}
            </AnimatePresence>

        </section>

    );

};

export default PopularCoursesSection;
