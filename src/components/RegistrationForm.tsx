import React, { useState } from 'react';
import { motion } from 'framer-motion';
import type { ContentItem, Translation } from '../types';

interface RegistrationFormProps {
    course: ContentItem;
    translations: Translation;
}

const RegistrationForm: React.FC<RegistrationFormProps> = ({ course, translations }) => {
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
        // Simulate redirect
        setTimeout(() => {
            console.log('Redirecting to payment...');
        }, 3000);
    };

    if (submitted) {
        return (
            <div className="text-center p-8">
                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                >
                    <svg className="w-16 h-16 mx-auto text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    <h2 className="text-2xl font-bold mt-4">{translations.formSuccessTitle as string}</h2>
                    <p className="mt-2 text-muted-foreground">{translations.formSuccessMessage as string}</p>
                </motion.div>
            </div>
        )
    }

    const inputClasses = "w-full px-4 py-2 bg-input border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring transition-colors";
    const labelClasses = "block mb-2 font-medium text-muted-foreground";

    return (
        <div>
            <h2 className="text-3xl font-bold mb-6 text-center">{translations.formTitle as string}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
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
                <motion.button
                    type="submit"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full bg-primary text-primary-foreground font-bold py-3 px-6 rounded-lg shadow-md"
                >
                    {translations.formSubmit as string}
                </motion.button>
            </form>
        </div>
    );
};

export default RegistrationForm;