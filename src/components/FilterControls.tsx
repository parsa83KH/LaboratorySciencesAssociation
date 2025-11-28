import React from 'react';
import { motion } from 'framer-motion';
import Button from './Button';

interface FilterControlsProps {
    filters: { key: string; label: string }[];
    activeFilter: string;
    setActiveFilter: (key: string) => void;
}

const FilterControls: React.FC<FilterControlsProps> = ({ filters, activeFilter, setActiveFilter }) => {
    return (
        <motion.div 
            className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4 mb-6 sm:mb-8 md:mb-12 px-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            {filters.map(filter => (
                <Button
                    key={filter.key}
                    onClick={() => setActiveFilter(filter.key)}
                    variant={activeFilter === filter.key ? 'primary' : 'outline'}
                    className={`px-3 sm:px-4 md:px-5 py-1.5 sm:py-2 text-xs sm:text-sm ${activeFilter === filter.key ? '' : 'bg-muted text-muted-foreground hover:bg-border'}`}
                >
                    {filter.label}
                </Button>
            ))}
        </motion.div>
    );
};

export default FilterControls;
