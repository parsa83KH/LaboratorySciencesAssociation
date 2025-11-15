import React, { useEffect, useState, useRef, useCallback } from 'react';

import type { Translation, ContentItem, PageKey } from '../types';

import { mockData } from '../lib/data';

import SectionParticleBackground from './SectionParticleBackground';

interface PopularCoursesSectionProps {

    translations: Translation;

    setCurrentPage: (page: PageKey) => void;

}

const PopularCoursesSection: React.FC<PopularCoursesSectionProps> = ({ translations, setCurrentPage }) => {

    const [theme, setTheme] = useState<'light' | 'dark'>(() => {

        if (typeof window !== 'undefined') {

            const savedTheme = localStorage.getItem('theme');

            if (savedTheme) return savedTheme as 'light' | 'dark';

            return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

        }

        return 'dark';

    });

    useEffect(() => {

        const updateTheme = () => {

            const savedTheme = localStorage.getItem('theme');

            if (savedTheme) {

                setTheme(savedTheme as 'light' | 'dark');

            } else {

                setTheme(window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

            }

        };

        updateTheme();

        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

        mediaQuery.addEventListener('change', updateTheme);

        

        const handleStorageChange = () => updateTheme();

        window.addEventListener('storage', handleStorageChange);

        document.addEventListener('themechange', handleStorageChange);

        return () => {

            mediaQuery.removeEventListener('change', updateTheme);

            window.removeEventListener('storage', handleStorageChange);

            document.removeEventListener('themechange', handleStorageChange);

        };

    }, []);

    const popularItems = mockData.coursesAndWorkshops.slice(0, 6);

    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const isDraggingRef = useRef(false);
    const startXRef = useRef(0);
    const scrollLeftRef = useRef(0);
    const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
    const [tiltStyles, setTiltStyles] = useState<{[key: number]: React.CSSProperties}>({});

    useEffect(() => {
        const scrollContainer = scrollContainerRef.current;
        if (!scrollContainer) return;

        const handleMouseDown = (e: MouseEvent) => {
            // فقط کلیک چپ
            if (e.button !== 0) return;
            
            const target = e.target as HTMLElement;
            // اگر روی دکمه کلیک شده، drag نکن
            if (target.closest('button')) return;

            isDraggingRef.current = true;
            startXRef.current = e.pageX - scrollContainer.offsetLeft;
            scrollLeftRef.current = scrollContainer.scrollLeft;
            scrollContainer.style.cursor = 'grabbing';
            scrollContainer.style.userSelect = 'none';
            
            // جلوگیری از drag تصویر
            if (target.closest('img')) {
                e.preventDefault();
            }
        };

        const handleMouseMove = (e: MouseEvent) => {
            if (!isDraggingRef.current) return;
            e.preventDefault();
            
            const x = e.pageX - scrollContainer.offsetLeft;
            const walk = (x - startXRef.current) * 1.5; // ضریب سرعت
            scrollContainer.scrollLeft = scrollLeftRef.current - walk;
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

        scrollContainer.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);
        scrollContainer.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            scrollContainer.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
            scrollContainer.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, []);

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {

        e.preventDefault();

        setCurrentPage('coursesAndWorkshops');

    };

    const handleRegisterClick = (e: React.MouseEvent<HTMLButtonElement>, item: ContentItem) => {
        e.preventDefault();
        e.stopPropagation();
        setCurrentPage('coursesAndWorkshops');
    };

    const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
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
    };

    const handleCardMouseLeave = (index: number) => {
        setTiltStyles(prev => {
            const newStyles = {...prev};
            delete newStyles[index];
            return newStyles;
        });
    };


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

                        return (

                            <div 

                                key={item.id} 

                                className="course-card"
                                ref={(el) => {
                                    cardRefs.current[index] = el;
                                }}
                                onMouseMove={(e) => handleCardMouseMove(e, index)}
                                onMouseLeave={() => handleCardMouseLeave(index)}
                            >

                                <div 
                                    className="course-card-inner"
                                    style={tiltStyles[index]}
                                >

                                    <div className="course-image-wrapper">

                                        <a 

                                            href="#" 

                                            onClick={handleClick}

                                            title={item.title}

                                            className="course-image-link"

                                        >

                                            <img 
                                                src={item.image} 
                                                alt={item.title} 
                                                className="course-image"
                                                draggable="false"
                                                onDragStart={(e) => {
                                                    e.preventDefault();
                                                    e.stopPropagation();
                                                }}
                                            />

                                        </a>

                                    </div>

                                    <div className="course-text-content">

                                        <h3 className="course-title">{item.title}</h3>

                                        <p className="course-description">{item.description}</p>

                                        <div className="course-meta">

                                            <span className="course-type">

                                                {item.type === 'course' ? '📚 دوره' : '🔬 کارگاه'}

                                            </span>

                                            <span className="course-date">📅 {item.date}</span>

                                        </div>

                                        <button 

                                            className="course-register-btn"

                                            onClick={(e) => handleRegisterClick(e, item)}

                                        >

                                            مشاهده

                                        </button>

                                    </div>

                                </div>

                            </div>

                        );

                    })}

                </div>

            </div>

        </section>

    );

};

export default PopularCoursesSection;
