import React from 'react';
import { motion, type Variants } from 'framer-motion';
import type { ContentItem, Translation } from '../types';

interface ContentCardProps {
    item: ContentItem;
    onImageClick: () => void;
    onVideoClick?: () => void;
    onRegisterClick?: () => void;
    translations: Translation;
}

const ContentCard: React.FC<ContentCardProps> = ({ item, onImageClick, onVideoClick, onRegisterClick, translations }) => {
    const cardVariants: Variants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
        exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } },
    };

    return (
        <motion.div
            layout
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            exit="exit"
            className="bg-card rounded-lg shadow-md overflow-hidden flex flex-col group transition-all duration-300 hover:shadow-2xl hover:-translate-y-2"
        >
            <div className="relative overflow-hidden cursor-pointer" onClick={onImageClick}>
                <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-52 object-cover transition-transform duration-300 group-hover:scale-110" 
                />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            </div>
            <div className="p-5 flex flex-col flex-grow">
                <span className="text-sm text-muted-foreground mb-1">{new Date(item.date).toLocaleDateString('fa-IR-u-nu-latn', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                <h3 className="text-xl font-bold text-card-foreground mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm flex-grow mb-4">{item.description}</p>
                
                <div className="mt-auto flex flex-wrap gap-2">
                    {onRegisterClick && (
                        <button 
                            onClick={onRegisterClick} 
                            className="flex-1 bg-primary text-primary-foreground text-sm font-bold py-2 px-4 rounded-md transition-opacity hover:opacity-90"
                        >
                            {translations.register as string}
                        </button>
                    )}
                     {onVideoClick && (
                        <button onClick={onVideoClick} className="flex-1 border border-border text-foreground text-sm font-semibold py-2 px-4 rounded-md hover:bg-muted transition-colors">
                            {translations.watchVideo as string}
                        </button>
                    )}
                </div>
            </div>
        </motion.div>
    );
};

export default ContentCard;