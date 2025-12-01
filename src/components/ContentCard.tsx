import React from 'react';
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
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-card rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 border border-border"
        >
            <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden">
                <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover cursor-pointer hover:scale-105 transition-transform duration-300"
                    onClick={onImageClick}
                />
                {item.video && (
                    <button
                        onClick={onVideoClick}
                        className="absolute top-4 right-4 bg-primary/80 hover:bg-primary text-primary-foreground rounded-full p-2 transition-colors"
                        aria-label="Play video"
                    >
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                        </svg>
                    </button>
                )}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                    <span className="text-white text-sm font-medium">
                        {item.type === 'course' ? '📚 دوره' : item.type === 'workshop' ? '🔬 کارگاه' : item.type === 'news' ? '📰 خبر' : '📢 اطلاعیه'}
                    </span>
                </div>
            </div>
            <div className="p-4 sm:p-5 md:p-6">
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 text-foreground line-clamp-2">
                    {item.title}
                </h3>
                <p className="text-sm sm:text-base text-muted-foreground mb-4 line-clamp-3">
                    {item.description}
                </p>
                <div className="flex items-center justify-between mb-4">
                    <span className="text-xs sm:text-sm text-muted-foreground">📅 {item.date}</span>
                </div>
                {onRegisterClick && (
                    <Button
                        variant="primary"
                        className="w-full"
                        onClick={onRegisterClick}
                    >
                        {translations.viewDetails || 'مشاهده جزئیات'}
                    </Button>
                )}
            </div>
        </motion.div>
    );
};

export default ContentCard;
