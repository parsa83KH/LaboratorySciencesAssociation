import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import type { ContentItem, Translation } from '../types';
import Button from './Button';
import Modal from './Modal';

interface ContentCardProps {
    item?: ContentItem;
    onImageClick?: () => void;
    onVideoClick?: () => void;
    onRegisterClick?: () => void;
    translations?: Translation;
    cardType?: 'default' | 'database-workshop';
    posterImage?: string;
    price?: string;
    useLegacyStyle?: boolean; // Use legacy course-card-wrap style even with item prop
}

const ContentCard: React.FC<ContentCardProps> = ({ 
    item, 
    onImageClick, 
    onVideoClick, 
    onRegisterClick,
    translations,
    cardType = 'default',
    posterImage,
    price,
    useLegacyStyle = false
}) => {
    const [isRegistrationModalOpen, setIsRegistrationModalOpen] = useState(false);
    const [hasAnimated, setHasAnimated] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const handlePosterDownload = (imageSrc?: string) => {
        if (!imageSrc) return;
        const link = document.createElement('a');
        link.href = imageSrc;
        link.download = '';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleGlowMouseMoveWrap = (e: React.MouseEvent<HTMLDivElement>) => {
        const el = e.currentTarget;
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        el.style.setProperty('--mouse-x', `${x}px`);
        el.style.setProperty('--mouse-y', `${y}px`);
    };

    const handleGlowMouseEnterWrap = (e: React.MouseEvent<HTMLDivElement>) => {
        e.currentTarget.classList.add('is-hovering');
    };

    const handleGlowMouseLeaveWrap = (e: React.MouseEvent<HTMLDivElement>) => {
        e.currentTarget.classList.remove('is-hovering');
    };

    const handleMoreButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsExpanded(true);
        if (!hasAnimated) {
            setIsHovered(true);
            // Set hasAnimated after a short delay to allow animation to start
            setTimeout(() => {
                setHasAnimated(true);
            }, 100);
        }
    };

    const handleBackButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsExpanded(false);
    };

    // If useLegacyStyle is true and item is provided, render legacy style
    if (item && useLegacyStyle) {
        const formatToJalali = (dateString: string) => {
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
        };

        // Use date directly if it's already in Persian format (contains Persian digits), otherwise convert
        const jalaliDate = item.date.includes('۱۴') || item.date.includes('۱۳') || item.date.includes('۱۴۰') 
            ? item.date 
            : formatToJalali(item.date);
        const displayPrice = price || item.price || translations?.priceUnknown as string || 'نامشخص';

        return (
            <>
                <div 
                    className={`course-card-wrap ${isExpanded ? 'is-expanded' : ''}`}
                    data-lenis-prevent
                >
                    <div className="course-card-image">
                        <img src={item.image} alt={item.title} />
                    </div>
                    <div className="course-card-info">
                        <h2 className="course-card-title">{item.title}</h2>
                        {item.description && (
                            <p className="course-card-summary">
                                {item.description.length > 120 
                                    ? item.description.substring(0, 120) + '...' 
                                    : item.description}
                            </p>
                        )}
                        <div className="course-card-meta">
                            <div className="course-meta-row">
                                {item.instructor && (
                                    <div className="course-meta-item-box">
                                        <span className="course-meta-icon">👤</span>
                                        <span className="course-meta-text">{item.instructor}</span>
                                    </div>
                                )}
                                {displayPrice && (
                                    <div className="course-meta-item-box">
                                        <span className="course-meta-icon">💰</span>
                                        <span className="course-meta-text">{displayPrice}</span>
                                    </div>
                                )}
                            </div>
                            <div className="course-meta-row">
                                {item.time && (
                                    <div className="course-meta-item-box">
                                        <span className="course-meta-icon">🕐</span>
                                        <span className="course-meta-text">{item.time}</span>
                                    </div>
                                )}
                                <div className="course-meta-item-box">
                                    <span className="course-meta-icon">📅</span>
                                    <span className="course-meta-text">{jalaliDate}</span>
                                </div>
                            </div>
                            <div className="course-meta-row">
                                {item.location && (
                                    <div className="course-meta-item-box">
                                        <svg className="course-meta-icon location-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2ZM12 11.5C10.62 11.5 9.5 10.38 9.5 9C9.5 7.62 10.62 6.5 12 6.5C13.38 6.5 14.5 7.62 14.5 9C14.5 10.38 13.38 11.5 12 11.5Z" fill="currentColor"/>
                                        </svg>
                                        <span className="course-meta-text">{item.location}</span>
                                    </div>
                                )}
                                {item.dayOfWeek && (
                                    <div className="course-meta-item-box">
                                        <span className="course-meta-icon">🗓️</span>
                                        <span className="course-meta-text">{item.dayOfWeek}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="course-card-more-button-container">
                            <Button
                                variant="primary"
                                className="course-card-register-button course-card-more-button"
                                onClick={() => setIsRegistrationModalOpen(true)}
                            >
                                {translations?.cardRegister as string || 'ثبت نام'}
                            </Button>
                            <Button
                                variant="primary"
                                className="course-card-more-button"
                                onClick={handleMoreButtonClick}
                            >
                                {translations?.cardMore as string || 'بیشتر'}
                            </Button>
                        </div>
                    </div>
                    <div 
                        className={`course-card-full-text ${hasAnimated ? 'has-animated' : ''} ${isHovered ? 'is-hovering-first' : ''}`}
                        style={{ scrollBehavior: 'auto' }}
                        data-lenis-prevent
                    >
                        <div className="course-card-actions-top">
                            <div className="course-card-actions-buttons">
                                <Button
                                    variant="primary"
                                    className="course-card-register-button w-full py-3 px-6 text-base"
                                    onClick={() => setIsRegistrationModalOpen(true)}
                                >
                                    {translations?.cardRegister as string || 'ثبت نام'}
                                </Button>
                                {item.image && (
                                    <Button
                                        variant="primary"
                                        className="w-full py-3 px-6 text-base"
                                        onClick={() => handlePosterDownload(item.image)}
                                    >
                                        {translations?.cardDownloadPoster as string || 'دانلود پوستر'}
                                    </Button>
                                )}
                                <Button
                                    variant="primary"
                                    className="w-full py-3 px-6 text-base"
                                    onClick={handleBackButtonClick}
                                >
                                    {translations?.cardBack as string || 'برگشت'}
                                </Button>
                            </div>
                        </div>
                        <div className="course-rich-text-content">
                            <h2 className="course-rich-h2">{item.title}</h2>
                            <p className="course-rich-paragraph">{item.description}</p>
                        </div>
                    </div>
                </div>
                {isRegistrationModalOpen && (
                    <Modal onClose={() => setIsRegistrationModalOpen(false)}>
                        <div className="text-center py-8">
                            <p className="text-lg sm:text-xl font-medium text-foreground">
                                {translations?.cardNoFormYet as string || 'هنوز فرم ثبت نام وجود ندارد'}
                            </p>
                        </div>
                    </Modal>
                )}
            </>
        );
    }

    // If no item provided, render the course card
    if (!item) {
        const mockCourse: ContentItem = {
            id: 1,
            type: cardType === 'database-workshop' ? 'workshop' : 'course',
            title: cardType === 'database-workshop' ? 'جستجوی پیشرفته در پایگاه های داده' : 'به سوی آینده',
            description: '',
            date: cardType === 'database-workshop' ? '1404/09/10' : '1403/05/15',
            image: cardType === 'database-workshop' ? `${import.meta.env.BASE_URL || '/'}data_searching.jpg`.replace(/\/\//g, '/') : `${import.meta.env.BASE_URL || '/'}immagration_2.png`.replace(/\/\//g, '/')
        };

        if (cardType === 'database-workshop') {
            return (
                <>
                    <div 
                        className={`course-card-wrap ${isExpanded ? 'is-expanded' : ''}`}
                        data-lenis-prevent
                    >
                        <div className="course-card-image">
                            <img src={`${import.meta.env.BASE_URL || '/'}data_searching.jpg`.replace(/\/\//g, '/')} alt="Database Search Workshop" />
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
                            <div className="course-card-more-button-container">
                                <Button
                                    variant="primary"
                                    className="course-card-more-button"
                                    onClick={handleMoreButtonClick}
                                >
                                    {translations?.cardMore as string || 'بیشتر'}
                                </Button>
                            </div>
                        </div>
                        <div 
                            className={`course-card-full-text ${hasAnimated ? 'has-animated' : ''} ${isHovered ? 'is-hovering-first' : ''}`}
                            style={{ scrollBehavior: 'auto' }}
                            data-lenis-prevent
                        >
                            <div className="course-card-actions-top">
                                <div className="course-card-actions-buttons">
                                    <Button
                                        variant="primary"
                                        className="course-card-register-button w-full py-3 px-6 text-base"
                                        onClick={() => setIsRegistrationModalOpen(true)}
                                    >
                                        ثبت نام
                                    </Button>
                                    {posterImage && (
                                        <Button
                                            variant="primary"
                                            className="w-full py-3 px-6 text-base"
                                            onClick={() => handlePosterDownload(posterImage)}
                                        >
                                            {translations?.cardDownloadPoster as string || 'دانلود پوستر'}
                                        </Button>
                                    )}
                                    <Button
                                        variant="primary"
                                        className="w-full py-3 px-6 text-base"
                                        onClick={handleBackButtonClick}
                                    >
                                        {translations?.cardBack as string || 'برگشت'}
                                    </Button>
                                </div>
                            </div>
                            <div className="course-rich-text-content">
                                <h2 className="course-rich-h2">ویژگی‌های یک استراتژی جستجوی علمی حرفه‌ای</h2>
                                <p className="course-rich-paragraph">در این بخش با اصول و مبانی طراحی یک استراتژی جستجوی مؤثر و حرفه‌ای در پایگاه‌های داده علمی آشنا می‌شوید. یاد می‌گیرید چگونه یک جستجوی هدفمند و دقیق طراحی کنید که نتایج مرتبط و با کیفیت را به شما ارائه دهد.</p>
                                
                                <h2 className="course-rich-h2">ساختاردهی سؤال با PICO؛ ساده‌ترین راه برای جستجوی استاندارد</h2>
                                <p className="course-rich-paragraph">PICO یک روش ساختاریافته برای فرموله‌سازی سؤالات پژوهشی است که شامل:</p>
                                <ul className="course-rich-list">
                                    <li className="course-rich-list-item">Population (جمعیت)</li>
                                    <li className="course-rich-list-item">Intervention (مداخله)</li>
                                    <li className="course-rich-list-item">Comparison (مقایسه)</li>
                                    <li className="course-rich-list-item">Outcome (نتیجه)</li>
                                </ul>
                                <p className="course-rich-paragraph">این روش به شما کمک می‌کند سؤالات خود را به صورت استاندارد و قابل جستجو فرموله کنید.</p>
                                
                                <h2 className="course-rich-h2">انتخاب کلیدواژه‌های هوشمندانه</h2>
                                <p className="course-rich-paragraph">یادگیری نحوه شناسایی و انتخاب کلیدواژه‌های مناسب از واژه اصلی تا اصطلاحات ورودی (Entry Terms) در پایگاه‌های داده. این مهارت به شما کمک می‌کند جستجوهای دقیق‌تر و جامع‌تری انجام دهید.</p>
                                
                                <h2 className="course-rich-h2">آشنایی با MeSH و نقش آن در جستجوی دقیق‌تر</h2>
                                <p className="course-rich-paragraph">Medical Subject Headings (MeSH) یک سیستم اصطلاحنامه کنترل‌شده است که در پایگاه‌های داده پزشکی استفاده می‌شود. در این بخش با ساختار MeSH و نحوه استفاده از آن برای بهبود دقت جستجوهای خود آشنا می‌شوید.</p>
                                
                                <h2 className="course-rich-h2">مهارت نوشتن Search Syntax: هنر ترکیب کلیدواژه‌ها و عملگرها</h2>
                                <p className="course-rich-paragraph">یادگیری نحوه نوشتن دستورات جستجوی پیشرفته با استفاده از عملگرهای بولی:</p>
                                <ol className="course-rich-list">
                                    <li className="course-rich-list-item">AND - برای ترکیب شرایط</li>
                                    <li className="course-rich-list-item">OR - برای گزینه‌های جایگزین</li>
                                    <li className="course-rich-list-item">NOT - برای حذف شرایط</li>
                                </ol>
                                <p className="course-rich-paragraph">این مهارت به شما امکان می‌دهد جستجوهای پیچیده و دقیق‌تری انجام دهید که نتایج بهتری را به همراه دارد.</p>
                            </div>
                        </div>
                    </div>
                    {isRegistrationModalOpen && (
                        <Modal onClose={() => setIsRegistrationModalOpen(false)}>
                            <div className="text-center py-8">
                                <p className="text-lg sm:text-xl font-medium text-foreground">
                                    هنوز فرم ثبت نام وجود ندارد
                                </p>
                            </div>
                        </Modal>
                    )}
                </>
            );
        }

        return (
            <>
                    <div 
                        className={`course-card-wrap ${isExpanded ? 'is-expanded' : ''}`}
                        data-lenis-prevent
                    >
                    <div className="course-card-image">
                        <img src={`${import.meta.env.BASE_URL || '/'}immagration_2.png`.replace(/\/\//g, '/')} alt="Course" />
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
                        <div className="course-card-more-button-container">
                            <Button
                                variant="primary"
                                className="course-card-more-button"
                                onClick={handleMoreButtonClick}
                            >
                                {translations?.cardMore as string || 'بیشتر'}
                            </Button>
                        </div>
                    </div>
                    <div 
                        className={`course-card-full-text ${hasAnimated ? 'has-animated' : ''} ${isHovered ? 'is-hovering-first' : ''}`}
                        style={{ scrollBehavior: 'auto' }}
                        data-lenis-prevent
                    >
                        <div className="course-card-actions-top">
                            <div className="course-card-actions-buttons">
                                <Button
                                    variant="primary"
                                    className="course-card-register-button w-full py-3 px-6 text-base"
                                    onClick={() => setIsRegistrationModalOpen(true)}
                                >
                                    {translations?.cardRegister as string || 'ثبت نام'}
                                </Button>
                                {posterImage && (
                                    <Button
                                        variant="primary"
                                        className="w-full py-3 px-6 text-base"
                                        onClick={() => handlePosterDownload(posterImage)}
                                    >
                                        {translations?.cardDownloadPoster as string || 'دانلود پوستر'}
                                    </Button>
                                )}
                                <Button
                                    variant="primary"
                                    className="w-full py-3 px-6 text-base"
                                    onClick={handleBackButtonClick}
                                >
                                    {translations?.cardBack as string || 'برگشت'}
                                </Button>
                            </div>
                        </div>
                        <div className="course-rich-text-content">
                            <h2 className="course-rich-h2">{translations?.cardMoveToFuture as string || 'حرکت به سوی آینده'}</h2>
                            <p className="course-rich-paragraph">{translations?.cardMoveToFutureDescription as string || 'در مسیر پیشرفت و تعالی، حرکت به سوی آینده نیازمند برنامه‌ریزی دقیق و راهبردهای هوشمندانه است. هر قدم که برمی‌داریم، هر تصمیمی که می‌گیریم، ما را به مقصد نهایی نزدیک‌تر می‌کند. آینده‌ای روشن با تلاش امروز ما ساخته می‌شود.'}</p>
                            
                            <h3 className="course-rich-h3">{translations?.cardMigrationPaths as string || 'شناسایی مسیرهای مهاجرت'}</h3>
                            <p className="course-rich-paragraph">{translations?.cardMigrationPathsDescription as string || 'شناسایی دقیق مسیرهای مهاجرت و تحرک جمعیت‌ها یکی از مهم‌ترین ابعاد مطالعات جمعیت‌شناختی و برنامه‌ریزی شهری است. با استفاده از روش‌های پیشرفته تحلیل داده‌ها و فناوری‌های مدرن، می‌توانیم الگوهای مهاجرت را شناسایی کنیم و برای آینده برنامه‌ریزی کنیم.'}</p>
                            
                            <h3 className="course-rich-h3">{translations?.cardKnowledgeExperience as string || 'ترکیب دانش و تجربه'}</h3>
                            <p className="course-rich-paragraph">{translations?.cardKnowledgeExperienceDescription as string || 'با ترکیب دانش و تجربه، می‌توانیم بهترین راهکارها را برای چالش‌های پیش رو پیدا کنیم. حرکت به سوی آینده و شناسایی مسیرهای صحیح، رمز موفقیت در دنیای امروز است.'}</p>
                        </div>
                    </div>
                </div>
                {isRegistrationModalOpen && (
                    <Modal onClose={() => setIsRegistrationModalOpen(false)}>
                        <div className="text-center py-8">
                            <p className="text-lg sm:text-xl font-medium text-foreground">
                                {translations?.cardNoFormYet as string || 'هنوز فرم ثبت نام وجود ندارد'}
                            </p>
                        </div>
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

    const handleGlowMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const el = e.currentTarget;
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        el.style.setProperty('--mouse-x', `${x}px`);
        el.style.setProperty('--mouse-y', `${y}px`);
    };

    const handleGlowMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
        e.currentTarget.classList.add('is-hovering');
    };

    const handleGlowMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
        e.currentTarget.classList.remove('is-hovering');
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
                onMouseMove={handleGlowMouseMove}
                onMouseEnter={handleGlowMouseEnter}
                onMouseLeave={handleGlowMouseLeave}
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
