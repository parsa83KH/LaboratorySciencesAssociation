import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import type { ContentItem, Translation } from '../types';
import Button from './Button';
import Modal from './Modal';
import RegistrationForm from './RegistrationForm';

interface ContentCardProps {
    item?: ContentItem;
    onImageClick?: () => void;
    onVideoClick?: () => void;
    onRegisterClick?: () => void;
    translations?: Translation;
    cardType?: 'default' | 'database-workshop';
    posterImage?: string;
    price?: string;
}

const ContentCard: React.FC<ContentCardProps> = ({ 
    item, 
    onImageClick, 
    onVideoClick, 
    onRegisterClick,
    translations,
    cardType = 'default',
    posterImage,
    price
}) => {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [isRegistrationModalOpen, setIsRegistrationModalOpen] = useState(false);
    const scrollAnimationRef = useRef<number | null>(null);
    const queuedDeltaRef = useRef<number>(0);

    // Smooth, self-contained scrolling that yields to the main page at bounds
    useEffect(() => {
        const scrollElement = scrollRef.current;
        if (!scrollElement) return;

        const stepScroll = () => {
            const element = scrollRef.current;
            if (!element) return;

            const delta = queuedDeltaRef.current * 0.2;
            if (Math.abs(delta) < 0.5) {
                element.scrollTop += queuedDeltaRef.current;
                queuedDeltaRef.current = 0;
                scrollAnimationRef.current = null;
                return;
            }

            element.scrollTop += delta;
            queuedDeltaRef.current -= delta;
            scrollAnimationRef.current = requestAnimationFrame(stepScroll);
        };

        const scheduleScroll = (delta: number) => {
            queuedDeltaRef.current += delta;
            if (scrollAnimationRef.current === null) {
                scrollAnimationRef.current = requestAnimationFrame(stepScroll);
            }
        };

        const handleWheel = (e: WheelEvent) => {
            const { scrollTop, scrollHeight, clientHeight } = scrollElement;
            const maxScroll = scrollHeight - clientHeight;
            const isAtTop = scrollTop <= 0;
            const isAtBottom = scrollTop >= maxScroll;
            const deltaY = e.deltaY;

            // If content cannot scroll, give control to the page
            if (maxScroll <= 0) {
                return;
            }

            // At boundary and moving outward: let the main page handle it
            if ((deltaY < 0 && isAtTop) || (deltaY > 0 && isAtBottom)) {
                return;
            }

            e.preventDefault();
            e.stopPropagation();

            const nextScrollTop = Math.max(0, Math.min(maxScroll, scrollTop + deltaY));
            const clampedDelta = nextScrollTop - scrollTop;
            if (clampedDelta !== 0) {
                scheduleScroll(clampedDelta);
            }
        };

        scrollElement.addEventListener('wheel', handleWheel, { passive: false });

        return () => {
            scrollElement.removeEventListener('wheel', handleWheel);
            if (scrollAnimationRef.current !== null) {
                cancelAnimationFrame(scrollAnimationRef.current);
            }
            scrollAnimationRef.current = null;
            queuedDeltaRef.current = 0;
        };
    }, []);

    const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
        const target = e.currentTarget;
        const touch = e.touches[0];
        (target as any).touchStartY = touch.clientY;
        (target as any).touchStartScrollTop = target.scrollTop;
    };

    const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
        const target = e.currentTarget;
        const touch = e.touches[0];
        const touchStartY = (target as any).touchStartY;
        const touchStartScrollTop = (target as any).touchStartScrollTop;
        
        if (touchStartY === undefined) return;
        
        const deltaY = touchStartY - touch.clientY;
        const { scrollTop, scrollHeight, clientHeight } = target;
        const isAtTop = scrollTop <= 0;
        const isAtBottom = scrollTop + clientHeight >= scrollHeight - 1;
        
        // If at boundaries and trying to scroll further, allow page scroll
        if ((deltaY < 0 && isAtTop) || (deltaY > 0 && isAtBottom)) {
            return;
        }
        
        // Otherwise, prevent page scroll
        e.stopPropagation();
        e.preventDefault();
        
        // Manually scroll the element
        target.scrollTop = touchStartScrollTop + deltaY;
    };

    // If no item provided, render the course card
    if (!item) {
        const mockCourse: ContentItem = {
            id: 1,
            type: cardType === 'database-workshop' ? 'workshop' : 'course',
            title: cardType === 'database-workshop' ? 'جستجوی پیشرفته در پایگاه های داده' : 'به سوی آینده',
            description: '',
            date: cardType === 'database-workshop' ? '1404/09/10' : '1403/05/15',
            image: cardType === 'database-workshop' ? '/data_searching.jpg' : '/immagration_2.png'
        };

        if (cardType === 'database-workshop') {
            return (
                <>
                    <div className="course-card-wrap">
                        <div className="course-card-image">
                            <img src="/data_searching.jpg" alt="Database Search Workshop" />
                        </div>
                        <div className="course-card-info">
                            <h2 className="course-card-title">جستجوی پیشرفته در پایگاه های داده</h2>
                            <div className="course-card-meta">
                                <div className="course-meta-item">
                                    <span className="course-meta-icon">👤</span>
                                    <span className="course-meta-text">مبینا باقریان</span>
                                </div>
                                <div className="course-meta-item">
                                    <span className="course-meta-icon">📅</span>
                                    <span className="course-meta-text">دوشنبه ۱۰ آذر ۱۴۰۴</span>
                                </div>
                                <div className="course-meta-item">
                                    <span className="course-meta-icon">🕐</span>
                                    <span className="course-meta-text">18:00 - 20:00</span>
                                </div>
                                <div className="course-meta-item">
                                    <svg className="course-meta-icon location-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2ZM12 11.5C10.62 11.5 9.5 10.38 9.5 9C9.5 7.62 10.62 6.5 12 6.5C13.38 6.5 14.5 7.62 14.5 9C14.5 10.38 13.38 11.5 12 11.5Z" fill="currentColor"/>
                                    </svg>
                                    <span className="course-meta-text">آنلاین</span>
                                </div>
                                {price && (
                                    <div className="course-meta-item">
                                        <span className="course-meta-icon">💰</span>
                                        <span className="course-meta-text">{price}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div 
                            ref={scrollRef}
                            className="course-card-full-text"
                            style={{ scrollBehavior: 'smooth' }}
                            data-lenis-prevent
                            onWheel={(e) => e.stopPropagation()}
                            onTouchStart={handleTouchStart}
                            onTouchMove={handleTouchMove}
                        >
                            <div className="course-card-actions-top">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => setIsRegistrationModalOpen(true)}
                                    className="modern-course-btn modern-course-btn-primary"
                                >
                                    <span className="modern-btn-icon">✨</span>
                                    {price === 'رایگان' ? 'ثبت نام' : 'ثبت نام و پرداخت'}
                                </motion.button>
                            </div>
                            <p><strong>ویژگی‌های یک استراتژی جستجوی علمی حرفه‌ای:</strong> در این بخش با اصول و مبانی طراحی یک استراتژی جستجوی مؤثر و حرفه‌ای در پایگاه‌های داده علمی آشنا می‌شوید. یاد می‌گیرید چگونه یک جستجوی هدفمند و دقیق طراحی کنید که نتایج مرتبط و با کیفیت را به شما ارائه دهد.</p>
                            <p><strong>ساختاردهی سؤال با PICO؛ ساده‌ترین راه برای جستجوی استاندارد:</strong> PICO یک روش ساختاریافته برای فرموله‌سازی سؤالات پژوهشی است که شامل Population (جمعیت)، Intervention (مداخله)، Comparison (مقایسه) و Outcome (نتیجه) می‌شود. این روش به شما کمک می‌کند سؤالات خود را به صورت استاندارد و قابل جستجو فرموله کنید.</p>
                            <p><strong>انتخاب کلیدواژه‌های هوشمندانه از واژه اصلی تا Entry Terms:</strong> یادگیری نحوه شناسایی و انتخاب کلیدواژه‌های مناسب از واژه اصلی تا اصطلاحات ورودی (Entry Terms) در پایگاه‌های داده. این مهارت به شما کمک می‌کند جستجوهای دقیق‌تر و جامع‌تری انجام دهید.</p>
                            <p><strong>آشنایی با MeSH و نقش آن در جستجوی دقیق‌تر:</strong> Medical Subject Headings (MeSH) یک سیستم اصطلاحنامه کنترل‌شده است که در پایگاه‌های داده پزشکی استفاده می‌شود. در این بخش با ساختار MeSH و نحوه استفاده از آن برای بهبود دقت جستجوهای خود آشنا می‌شوید.</p>
                            <p><strong>مهارت نوشتن Search Syntax: هنر ترکیب کلیدواژه‌ها و عملگرها:</strong> یادگیری نحوه نوشتن دستورات جستجوی پیشرفته با استفاده از عملگرهای بولی (AND, OR, NOT) و سایر عملگرهای جستجو. این مهارت به شما امکان می‌دهد جستجوهای پیچیده و دقیق‌تری انجام دهید که نتایج بهتری را به همراه دارد.</p>
                            <div className="course-card-actions-bottom">
                                <motion.a
                                    href={posterImage}
                                    download
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="modern-course-btn modern-course-btn-secondary"
                                    style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                >
                                    <span className="modern-btn-icon">⬇️</span>
                                    دانلود پوستر
                                </motion.a>
                            </div>
                        </div>
                    </div>
                    {isRegistrationModalOpen && translations && (
                        <Modal onClose={() => setIsRegistrationModalOpen(false)}>
                            <RegistrationForm course={mockCourse} translations={translations} price={price} />
                        </Modal>
                    )}
                </>
            );
        }

        return (
            <>
                <div className="course-card-wrap">
                    <div className="course-card-image">
                        <img src="/immagration_2.png" alt="Course" />
                    </div>
                    <div className="course-card-info">
                        <h2 className="course-card-title">به سوی آینده</h2>
                        <div className="course-card-meta">
                            <div className="course-meta-item">
                                <span className="course-meta-icon">👤</span>
                                <span className="course-meta-text">دکتر احمد محمدی</span>
                            </div>
                            <div className="course-meta-item">
                                <span className="course-meta-icon">📅</span>
                                <span className="course-meta-text">1403/05/15</span>
                            </div>
                            <div className="course-meta-item">
                                <span className="course-meta-icon">🕐</span>
                                <span className="course-meta-text">14:00 - 16:00</span>
                            </div>
                            <div className="course-meta-item">
                                <svg className="course-meta-icon location-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2ZM12 11.5C10.62 11.5 9.5 10.38 9.5 9C9.5 7.62 10.62 6.5 12 6.5C13.38 6.5 14.5 7.62 14.5 9C14.5 10.38 13.38 11.5 12 11.5Z" fill="currentColor"/>
                                </svg>
                                <span className="course-meta-text">سالن همایش دانشکده</span>
                            </div>
                            {price && (
                                <div className="course-meta-item">
                                    <span className="course-meta-icon">💰</span>
                                    <span className="course-meta-text">{price}</span>
                                </div>
                            )}
                        </div>
                    </div>
                    <div 
                        ref={scrollRef}
                        className="course-card-full-text"
                        style={{ scrollBehavior: 'smooth' }}
                        onTouchStart={handleTouchStart}
                        onTouchMove={handleTouchMove}
                    >
                        <div className="course-card-actions-top">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setIsRegistrationModalOpen(true)}
                                className="modern-course-btn modern-course-btn-primary"
                            >
                                <span className="modern-btn-icon">✨</span>
                                {price === 'رایگان' ? 'ثبت نام' : 'ثبت نام و پرداخت'}
                            </motion.button>
                        </div>
                        <p>در مسیر پیشرفت و تعالی، حرکت به سوی آینده نیازمند برنامه‌ریزی دقیق و راهبردهای هوشمندانه است. هر قدم که برمی‌داریم، هر تصمیمی که می‌گیریم، ما را به مقصد نهایی نزدیک‌تر می‌کند. آینده‌ای روشن با تلاش امروز ما ساخته می‌شود.</p>
                        <p>شناسایی دقیق مسیرهای مهاجرت و تحرک جمعیت‌ها یکی از مهم‌ترین ابعاد مطالعات جمعیت‌شناختی و برنامه‌ریزی شهری است. با استفاده از روش‌های پیشرفته تحلیل داده‌ها و فناوری‌های مدرن، می‌توانیم الگوهای مهاجرت را شناسایی کنیم و برای آینده برنامه‌ریزی کنیم.</p>
                        <p>با ترکیب دانش و تجربه، می‌توانیم بهترین راهکارها را برای چالش‌های پیش رو پیدا کنیم. حرکت به سوی آینده و شناسایی مسیرهای صحیح، رمز موفقیت در دنیای امروز است.</p>
                        {posterImage && (
                            <div className="course-card-actions-bottom">
                                <motion.a
                                    href={posterImage}
                                    download
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="modern-course-btn modern-course-btn-secondary"
                                    style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                >
                                    <span className="modern-btn-icon">⬇️</span>
                                    دانلود پوستر
                                </motion.a>
                            </div>
                        )}
                    </div>
                </div>
                {isRegistrationModalOpen && translations && (
                    <Modal onClose={() => setIsRegistrationModalOpen(false)}>
                        <RegistrationForm course={mockCourse} translations={translations} price={price} />
                    </Modal>
                )}
            </>
        );
    }
    const cardRef = useRef<HTMLDivElement>(null);
    const [tiltStyle, setTiltStyle] = useState<React.CSSProperties>({});

    const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const card = cardRef.current;
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
        
        setTiltStyle({
            transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(${translateZ}px) scale3d(1.05, 1.05, 1.05)`,
            animation: 'none',
        });
    };

    const handleCardMouseLeave = () => {
        setTiltStyle({});
    };

    const handleImageClick = (e: React.MouseEvent) => {
        e.preventDefault();
        if (onImageClick) {
            onImageClick();
        }
    };

    const handleVideoClick = (e: React.MouseEvent) => {
        e.preventDefault();
        if (onVideoClick) {
            onVideoClick();
        }
    };

    const handleRegisterClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (onRegisterClick) {
            onRegisterClick();
        }
    };

    return (
        <div
            className="modern-course-card"
            ref={cardRef}
            onMouseMove={handleCardMouseMove}
            onMouseLeave={handleCardMouseLeave}
        >
            <div 
                className="modern-course-card-inner"
                style={tiltStyle}
            >
                <div className="modern-course-image-container">
                    <div className="modern-course-image-overlay"></div>
                    <a 
                        href="#" 
                        onClick={handleImageClick}
                        title={item.title}
                        className="modern-course-image-link"
                    >
                        <img 
                            src={item.image} 
                            alt={item.title} 
                            className="modern-course-image"
                            draggable="false"
                            onDragStart={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                            }}
                        />
                    </a>
                    <div className="modern-course-badge">
                        {item.type === 'course' ? '📚 دوره' : '🔬 کارگاه'}
                    </div>
                </div>

                <div className="modern-course-content">
                    <div className="modern-course-header">
                        <h3 className="modern-course-title">{item.title}</h3>
                        <div className="modern-course-date">
                            <span className="modern-date-icon">📅</span>
                            <span>{item.date}</span>
                        </div>
                    </div>
                    
                    <p className="modern-course-description">{item.description}</p>

                    <div className="modern-course-actions">
                        {item.video && translations && (
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={handleVideoClick}
                                className="modern-course-btn modern-course-btn-secondary"
                            >
                                <span className="modern-btn-icon">▶️</span>
                                {translations.watchVideo as string}
                            </motion.button>
                        )}
                        {translations && (
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={handleRegisterClick}
                                className="modern-course-btn modern-course-btn-primary"
                            >
                                <span className="modern-btn-icon">✨</span>
                                {translations.register as string}
                            </motion.button>
                        )}
                    </div>
                </div>

                <div className="modern-course-glow"></div>
            </div>
        </div>
    );
};

export default ContentCard;
