import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Button from './Button';
import type { ContentItem, Translation } from '../types';

interface RegistrationFormProps {
    course: ContentItem;
    translations: Translation;
    price?: string;
}

const INPUT_CLASSES = "w-full px-3 sm:px-4 py-2 text-sm sm:text-base bg-input border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring transition-colors";
const LABEL_CLASSES = "block mb-1.5 sm:mb-2 text-sm sm:text-base font-medium text-muted-foreground";
const SUBMISSION_DELAY = 3000;

const SuccessIcon: React.FC = () => (
    <svg className="w-12 h-12 sm:w-16 sm:h-16 mx-auto text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
    </svg>
);

const RegistrationForm: React.FC<RegistrationFormProps> = ({ course, translations, price }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        timeoutRef.current = setTimeout(() => {
            setIsLoading(false);
            setSubmitted(true);
        }, SUBMISSION_DELAY);
    };

    if (submitted) {
        return (
            <div className="text-center p-4 sm:p-8">
                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                >
                    <SuccessIcon />
                    <h2 className="text-xl sm:text-2xl font-bold mt-3 sm:mt-4">{translations.formSuccessTitle as string}</h2>
                    <p className="mt-2 text-sm sm:text-base text-muted-foreground">{translations.formSuccessMessage as string}</p>
                </motion.div>
            </div>
        );
    }

    const isFree = price === translations.formFree as string;
    const buttonText = isFree ? translations.formRegister as string : translations.formRegisterAndPay as string;

    return (
        <div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6 text-center">{translations.formTitle as string}</h2>
            <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
                <div>
                    <label className={LABEL_CLASSES}>{translations.formCourse as string}</label>
                    <input type="text" value={course.title} readOnly className={`${INPUT_CLASSES} bg-muted cursor-not-allowed`} />
                </div>
                <div>
                    <label htmlFor="fullName" className={LABEL_CLASSES}>{translations.formFullName as string}</label>
                    <input type="text" id="fullName" required className={INPUT_CLASSES} />
                </div>
                <div>
                    <label htmlFor="studentId" className={LABEL_CLASSES}>{translations.formStudentId as string}</label>
                    <input type="text" id="studentId" required className={INPUT_CLASSES} />
                </div>
                <div>
                    <label htmlFor="email" className={LABEL_CLASSES}>{translations.formEmail as string}</label>
                    <input type="email" id="email" required className={INPUT_CLASSES} />
                </div>
                <div>
                    <label htmlFor="phone" className={LABEL_CLASSES}>{translations.formPhone as string}</label>
                    <input type="tel" id="phone" required className={INPUT_CLASSES} />
                </div>
                <Button
                    type="submit"
                    variant="primary"
                    className="w-full py-2.5 sm:py-3 px-5 sm:px-6 text-sm sm:text-base"
                    isLoading={isLoading}
                >
                    {buttonText}
                </Button>
            </form>
        </div>
    );
};

export default RegistrationForm;