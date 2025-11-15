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
            className="text-center flex flex-col items-center p-6 bg-card rounded-lg shadow-md transition-all duration-300 hover:shadow-xl"
        >
            <img 
                src={member.image} 
                alt={member.name} 
                className="w-32 h-32 rounded-full mb-4 object-cover shadow-lg" 
            />
            <h3 className="text-xl font-bold text-card-foreground">
                {member.name}
            </h3>
            <p className="text-primary font-semibold text-sm mb-3">
                {member.role}
            </p>
            <p className="text-muted-foreground text-sm flex-grow">
                {member.bio}
            </p>
        </motion.div>
    );
};


const MembersPage: React.FC<{ translations: Translation }> = ({ translations }) => {
    return (
        <Section title={translations.members as string}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {members.map(member => (
                    <MemberCard key={member.id} member={member} />
                ))}
            </div>
        </Section>
    );
};

export default MembersPage;