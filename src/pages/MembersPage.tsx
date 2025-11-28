import React from 'react';
import { motion, type Variants } from 'framer-motion';
import Section from '../components/Section';
import type { Translation, Member } from '../types';
import { members } from '../lib/data';

const MemberCard: React.FC<{ member: Member }> = ({ member }) => {
    const cardVariants: Variants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    };

    return (
        <motion.div
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="text-center flex flex-col items-center p-4 sm:p-6 bg-card rounded-lg shadow-md transition-all duration-300 hover:shadow-xl"
        >
            <img 
                src={member.image} 
                alt={member.name} 
                className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full mb-3 sm:mb-4 object-cover shadow-lg" 
            />
            <h3 className="text-lg sm:text-xl font-bold text-card-foreground">
                {member.name}
            </h3>
            <p className="text-primary font-semibold text-xs sm:text-sm mb-2 sm:mb-3">
                {member.role}
            </p>
            <p className="text-muted-foreground text-xs sm:text-sm flex-grow">
                {member.bio}
            </p>
        </motion.div>
    );
};


const MembersPage: React.FC<{ translations: Translation }> = ({ translations }) => {
    return (
        <Section title={translations.members as string}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
                {members.map(member => (
                    <MemberCard key={member.id} member={member} />
                ))}
            </div>
        </Section>
    );
};

export default MembersPage;