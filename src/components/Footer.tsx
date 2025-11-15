import React from 'react';
import type { Translation } from '../types';

interface FooterProps {
    translations: Translation;
}

const SocialIcon: React.FC<{ href: string; 'aria-label': string; children: React.ReactNode }> = ({ href, children, ...props }) => (
    <a href={href} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors" aria-label={props['aria-label']}>
        {children}
    </a>
);

const Footer: React.FC<FooterProps> = ({ translations: t }) => {

    const handleNewsletterSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle newsletter subscription logic here
        alert('Thank you for subscribing!');
    }

    return (
        <footer className="bg-muted text-muted-foreground mt-auto border-t border-border">
            <div className="container mx-auto px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* About Section */}
                    <div className="col-span-1 md:col-span-2 lg:col-span-1">
                        <h3 className="text-lg font-bold text-foreground mb-4">{t.appName as string}</h3>
                        <p className="text-sm mb-4">
                            {t.footerAbout as string}
                        </p>
                        <div className="flex items-center space-x-4 rtl:space-x-reverse">
                            <SocialIcon href="#" aria-label="Twitter">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.71v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" /></svg>
                            </SocialIcon>
                            <SocialIcon href="#" aria-label="LinkedIn">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.206v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H6.328C3.965 1 2 2.985 2 5.332v13.335C2 21.015 3.965 23 6.328 23h11.34C20.035 23 22 21.015 22 18.667V5.332C22 2.985 20.035 1 17.668 1z" clipRule="evenodd" /></svg>
                            </SocialIcon>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-semibold text-foreground mb-4">{t.footerQuickLinks as string}</h3>
                        <ul className="space-y-2">
                            <li><a href="#" className="hover:text-primary transition-colors text-sm">{t.navHome as string}</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors text-sm">{t.navNewsAndAnnouncements as string}</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors text-sm">{t.navCoursesAndWorkshops as string}</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors text-sm">{t.navMembers as string}</a></li>
                        </ul>
                    </div>

                    {/* Contact Us */}
                    <div>
                        <h3 className="text-lg font-semibold text-foreground mb-4">{t.footerContactUs as string}</h3>
                        <ul className="space-y-3 text-sm">
                            <li className="flex items-start">
                                <svg className="w-5 h-5 mr-2 rtl:ml-2 rtl:mr-0 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                <span>{t.footerAddress as string}</span>
                            </li>
                            <li className="flex items-center">
                                <svg className="w-5 h-5 mr-2 rtl:ml-2 rtl:mr-0 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                                <a href={`tel:${(t.footerPhone as string).replace(/[^0-9+]/g, '')}`} className="hover:text-primary transition-colors">{t.footerPhone as string}</a>
                            </li>
                            <li className="flex items-center">
                               <svg className="w-5 h-5 mr-2 rtl:ml-2 rtl:mr-0 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                                <a href={`mailto:${t.footerEmail as string}`} className="hover:text-primary transition-colors">{t.footerEmail as string}</a>
                            </li>
                        </ul>
                    </div>
                    
                    {/* Newsletter */}
                    <div className="md:col-span-2 lg:col-span-1">
                        <h3 className="text-lg font-semibold text-foreground mb-4">{t.footerStayUpdated as string}</h3>
                        <p className="text-sm mb-4">{t.footerNewsletterPrompt as string}</p>
                        <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-2">
                           <input 
                             type="email" 
                             placeholder={t.footerEmailPlaceholder as string}
                             required
                             className="flex-grow w-full px-4 py-2 bg-input border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring transition-colors text-sm"
                           />
                           <button type="submit" className="bg-primary text-primary-foreground text-sm font-bold py-2 px-4 rounded-md transition-opacity hover:opacity-90 whitespace-nowrap">
                               {t.footerSubscribe as string}
                           </button>
                        </form>
                    </div>

                </div>

                {/* Bottom Bar */}
                <div className="mt-12 pt-8 border-t border-border/50 flex flex-col sm:flex-row justify-between items-center text-xs">
                    <p className="mb-2 sm:mb-0">
                        {t.footerText as string}
                    </p>
                    <div className="flex space-x-4 rtl:space-x-reverse">
                       <a href="#" className="hover:text-primary transition-colors">{t.footerPrivacyPolicy as string}</a>
                       <a href="#" className="hover:text-primary transition-colors">{t.footerTerms as string}</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;