import React from 'react';
import { motion } from 'framer-motion';

interface FilterControlsProps {
    filters: { key: string; label: string }[];
    activeFilter: string;
    setActiveFilter: (key: string) => void;
}

const FilterControls: React.FC<FilterControlsProps> = ({ filters, activeFilter, setActiveFilter }) => {
    return (
        <motion.div 
            className="flex flex-wrap justify-center gap-2 md:gap-4 mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            {filters.map(filter => (
                <button
                    key={filter.key}
                    onClick={() => setActiveFilter(filter.key)}
                    className={`px-5 py-2 text-sm font-semibold rounded-full transition-colors duration-300 ${
                        activeFilter === filter.key
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted text-muted-foreground hover:bg-border'
                    }`}
                >
                    {filter.label}
                </button>
            ))}
        </motion.div>
    );
};

export default FilterControls;
