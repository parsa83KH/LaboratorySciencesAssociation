import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Button from './Button';
import type { ContentItem, Translation } from '../types';

interface RegistrationFormProps {
    course: ContentItem;
    translations: Translation;
    price?: string;
}

const RegistrationForm: React.FC<RegistrationFormProps> = ({ course, translations, price }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            setSubmitted(true);
        }, 3000);
    };

    if (submitted) {
        return (
            <div className="text-center p-4 sm:p-8">
                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                >
                    <svg className="w-12 h-12 sm:w-16 sm:h-16 mx-auto text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    <h2 className="text-xl sm:text-2xl font-bold mt-3 sm:mt-4">{translations.formSuccessTitle as string}</h2>
                    <p className="mt-2 text-sm sm:text-base text-muted-foreground">{translations.formSuccessMessage as string}</p>
                </motion.div>
            </div>
        )
    }

    const inputClasses = "w-full px-3 sm:px-4 py-2 text-sm sm:text-base bg-input border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring transition-colors";
    const labelClasses = "block mb-1.5 sm:mb-2 text-sm sm:text-base font-medium text-muted-foreground";

    return (
        <div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6 text-center">{translations.formTitle as string}</h2>
            <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
                <div>
                    <label className={labelClasses}>{translations.formCourse as string}</label>
                    <input type="text" value={course.title} readOnly className={`${inputClasses} bg-muted cursor-not-allowed`} />
                </div>
                <div>
                    <label htmlFor="fullName" className={labelClasses}>{translations.formFullName as string}</label>
                    <input type="text" id="fullName" required className={inputClasses} />
                </div>
                <div>
                    <label htmlFor="studentId" className={labelClasses}>{translations.formStudentId as string}</label>
                    <input type="text" id="studentId" required className={inputClasses} />
                </div>
                <div>
                    <label htmlFor="email" className={labelClasses}>{translations.formEmail as string}</label>
                    <input type="email" id="email" required className={inputClasses} />
                </div>
                <div>
                    <label htmlFor="phone" className={labelClasses}>{translations.formPhone as string}</label>
                    <input type="tel" id="phone" required className={inputClasses} />
                </div>
                <Button
                    type="submit"
                    variant="primary"
                    className="w-full py-2.5 sm:py-3 px-5 sm:px-6 text-sm sm:text-base"
                    isLoading={isLoading}
                >
                    {price === 'رایگان' ? 'ثبت نام' : 'ثبت نام و پرداخت'}
                </Button>
            </form>
        </div>
    );
};

export default RegistrationForm;