import React, { useState } from 'react';
import { motion } from 'framer-motion';
import type { ContentItem, Translation } from '../types';
import Button from './Button';

interface ContentCardProps {
    item: ContentItem;
    onImageClick?: () => void;
    onVideoClick?: () => void;
    onRegisterClick?: () => void;
    translations: Translation;
}

const ContentCard: React.FC<ContentCardProps> = ({ 
    item, 
    onImageClick, 
    onVideoClick, 
    onRegisterClick,
    translations 
}) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="course-card-page"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="course-card-inner-page">
                <div className="course-image-wrapper-page">
                    <img
                        src={item.image}
                        alt={item.title}
                        className="course-image-page"
                        onClick={onImageClick}
                    />
                    {item.video && (
                        <button
                            onClick={onVideoClick}
                            className="absolute top-4 right-4 bg-primary/80 hover:bg-primary text-primary-foreground rounded-full p-2 transition-colors z-10"
                            aria-label="Play video"
                        >
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M8 5v14l11-7z" />
                            </svg>
                        </button>
                    )}
                </div>
                <div className="course-text-content-page">
                    <h3 className="course-title-page">{item.title}</h3>
                    <p className="course-description-page">{item.description}</p>
                    <div className="course-meta-page">
                        <span className="course-type-page">
                            {item.type === 'course' ? '📚 دوره' : item.type === 'workshop' ? '🔬 کارگاه' : item.type === 'news' ? '📰 خبر' : '📢 اطلاعیه'}
                        </span>
                        <span className="course-date-page">📅 {item.date}</span>
                    </div>
                    {onRegisterClick && (
                        <Button
                            variant="primary"
                            className="w-full py-3 px-6 text-base"
                            onClick={onRegisterClick}
                        >
                            مشاهده
                        </Button>
                    )}
                </div>
            </div>
        </motion.div>
    );
};

export default ContentCard;
