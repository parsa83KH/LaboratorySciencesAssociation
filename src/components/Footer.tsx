import React from 'react';
import type { Translation } from '../types';

interface FooterProps {
    translations: Translation;
}

const Footer: React.FC<FooterProps> = ({ translations: t }) => {
    return (
        <footer className="relative text-muted-foreground mt-auto border-t border-slate-700/50 overflow-hidden">
            {/* Background Image */}
            <div 
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: 'url(/footer.png)',
                }}
            ></div>
            {/* Dark Overlay for better text readability */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900/90 via-slate-900/85 to-slate-900/90"></div>

            <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 lg:gap-12">
                    {/* Communication Channels */}
                    <div className="group">
                        <h3 className="text-base sm:text-lg font-bold text-white mb-4 sm:mb-6 relative inline-block md:mr-auto rtl:md:ml-auto rtl:md:mr-0">
                            راه‌های ارتباطی
                            <span className="absolute bottom-0 right-0 w-full h-0.5 bg-orange-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                        </h3>
                        <div className="space-y-2 sm:space-y-3">
                            {/* First Row - 3 links */}
                            <div className="flex flex-wrap gap-2 sm:gap-3">
                                <a href="https://instagram.com/scls.iautms" target="_blank" rel="noopener noreferrer" className="inline-flex items-center group/link text-slate-300 transition-all duration-300 hover:translate-x-1 rtl:hover:translate-x-[-4px] text-sm sm:text-base">
                                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-pink-500/10 flex items-center justify-center mr-2 sm:mr-3 rtl:ml-2 rtl:sm:ml-3 rtl:mr-0 group-hover/link:bg-pink-500/20 group-hover/link:scale-110 transition-all duration-300">
                                        <svg className="w-4 h-4 sm:w-5 sm:h-5 text-pink-500 group-hover/link:scale-110 transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                                        </svg>
                                    </div>
                                    <span className="font-medium group-hover/link:text-pink-500 transition-colors duration-300">پیج اینستاگرام</span>
                                </a>
                                <a href="https://t.me/scls_iautms" target="_blank" rel="noopener noreferrer" className="inline-flex items-center group/link text-slate-300 transition-all duration-300 hover:translate-x-1 rtl:hover:translate-x-[-4px] text-sm sm:text-base">
                                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-blue-500/10 flex items-center justify-center mr-2 sm:mr-3 rtl:ml-2 rtl:sm:ml-3 rtl:mr-0 group-hover/link:bg-blue-500/20 group-hover/link:scale-110 transition-all duration-300">
                                        <svg className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400 group-hover/link:scale-110 transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.13-.31-1.09-.66.02-.18.27-.36.75-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/>
                                        </svg>
                                    </div>
                                    <span className="font-medium group-hover/link:text-blue-400 transition-colors duration-300">کانال تلگرام</span>
                                </a>
                                <a href="https://t.me/scls_iautms_admin" target="_blank" rel="noopener noreferrer" className="inline-flex items-center group/link text-slate-300 transition-all duration-300 hover:translate-x-1 rtl:hover:translate-x-[-4px] text-sm sm:text-base">
                                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-blue-500/10 flex items-center justify-center mr-2 sm:mr-3 rtl:ml-2 rtl:sm:ml-3 rtl:mr-0 group-hover/link:bg-blue-500/20 group-hover/link:scale-110 transition-all duration-300">
                                        <svg className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400 group-hover/link:scale-110 transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.13-.31-1.09-.66.02-.18.27-.36.75-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/>
                                        </svg>
                                    </div>
                                    <span className="font-medium group-hover/link:text-blue-400 transition-colors duration-300">روابط عمومی</span>
                                </a>
                            </div>
                            {/* Second Row - 3 links */}
                            <div className="flex flex-wrap gap-2 sm:gap-3">
                                <a href="https://t.me/sclsiautms_bot" target="_blank" rel="noopener noreferrer" className="inline-flex items-center group/link text-slate-300 transition-all duration-300 hover:translate-x-1 rtl:hover:translate-x-[-4px] text-sm sm:text-base">
                                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-blue-500/10 flex items-center justify-center mr-2 sm:mr-3 rtl:ml-2 rtl:sm:ml-3 rtl:mr-0 group-hover/link:bg-blue-500/20 group-hover/link:scale-110 transition-all duration-300">
                                        <svg className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400 group-hover/link:scale-110 transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.13-.31-1.09-.66.02-.18.27-.36.75-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/>
                                        </svg>
                                    </div>
                                    <span className="font-medium group-hover/link:text-blue-400 transition-colors duration-300">دبیر</span>
                                </a>
                                <a href="mailto:labsciences.scls.iautms@gmail.com" className="inline-flex items-center group/link text-slate-300 transition-all duration-300 hover:translate-x-1 rtl:hover:translate-x-[-4px] text-sm sm:text-base">
                                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-red-500/10 flex items-center justify-center mr-2 sm:mr-3 rtl:ml-2 rtl:sm:ml-3 rtl:mr-0 group-hover/link:bg-red-500/20 group-hover/link:scale-110 transition-all duration-300">
                                        <svg className="w-4 h-4 sm:w-5 sm:h-5 text-red-400 group-hover/link:scale-110 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <span className="font-medium group-hover/link:text-red-400 transition-colors duration-300">ایمیل</span>
                                </a>
                                <a href="https://share.google/iOCzViLBnLZTpeZp4" target="_blank" rel="noopener noreferrer" className="inline-flex items-center group/link text-slate-300 transition-all duration-300 hover:translate-x-1 rtl:hover:translate-x-[-4px] text-sm sm:text-base">
                                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-green-500/10 flex items-center justify-center mr-2 sm:mr-3 rtl:ml-2 rtl:sm:ml-3 rtl:mr-0 group-hover/link:bg-green-500/20 group-hover/link:scale-110 transition-all duration-300">
                                        <svg className="w-4 h-4 sm:w-5 sm:h-5 text-green-400 group-hover/link:scale-110 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    </div>
                                    <span className="font-medium group-hover/link:text-green-400 transition-colors duration-300">لوکیشن دانشگاه</span>
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="text-center group">
                        <h3 className="text-base sm:text-lg font-bold text-white mb-4 sm:mb-6 relative inline-block">
                            {t.footerQuickLinks as string}
                            <span className="absolute bottom-0 right-0 w-full h-0.5 bg-orange-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                        </h3>
                        <ul className="space-y-2 sm:space-y-3">
                            <li>
                                <a href="#" className="inline-block text-sm sm:text-base text-slate-300 hover:text-white transition-all duration-300 hover:translate-y-[-2px] font-medium relative group/link">
                                    <span className="relative z-10">{t.navHome as string}</span>
                                    <span className="absolute bottom-0 right-0 w-0 h-0.5 bg-orange-500 group-hover/link:w-full transition-all duration-300"></span>
                                </a>
                            </li>
                            <li>
                                <a href="#" className="inline-block text-sm sm:text-base text-slate-300 hover:text-white transition-all duration-300 hover:translate-y-[-2px] font-medium relative group/link">
                                    <span className="relative z-10">{t.navNewsAndAnnouncements as string}</span>
                                    <span className="absolute bottom-0 right-0 w-0 h-0.5 bg-orange-500 group-hover/link:w-full transition-all duration-300"></span>
                                </a>
                            </li>
                            <li>
                                <a href="#" className="inline-block text-sm sm:text-base text-slate-300 hover:text-white transition-all duration-300 hover:translate-y-[-2px] font-medium relative group/link">
                                    <span className="relative z-10">{t.navCoursesAndWorkshops as string}</span>
                                    <span className="absolute bottom-0 right-0 w-0 h-0.5 bg-orange-500 group-hover/link:w-full transition-all duration-300"></span>
                                </a>
                            </li>
                            <li>
                                <a href="#" className="inline-block text-sm sm:text-base text-slate-300 hover:text-white transition-all duration-300 hover:translate-y-[-2px] font-medium relative group/link">
                                    <span className="relative z-10">{t.navMembers as string}</span>
                                    <span className="absolute bottom-0 right-0 w-0 h-0.5 bg-orange-500 group-hover/link:w-full transition-all duration-300"></span>
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Developer Info */}
                    <div className="text-center md:ml-auto md:mr-0 rtl:md:ml-0 rtl:md:mr-auto group">
                        <h3 className="text-base sm:text-lg font-bold text-white mb-4 sm:mb-6 relative inline-block md:ml-auto rtl:md:mr-auto rtl:md:ml-0">
                            طراح و توسعه دهنده
                            <span className="absolute bottom-0 right-0 w-full h-0.5 bg-orange-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                        </h3>
                        <div className="mb-4 sm:mb-6">
                            <h4 className="text-xl sm:text-2xl font-bold text-blue-400">
                                پارسا خسروانی
                            </h4>
                        </div>
                        <div className="flex flex-wrap gap-2 sm:gap-3 justify-center md:justify-end rtl:md:justify-start">
                            <a href="mailto:parsakhosravani83@gmail.com" className="inline-flex items-center group/link text-slate-300 transition-all duration-300 hover:translate-x-1 rtl:hover:translate-x-[-4px] text-sm sm:text-base">
                                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-red-500/10 flex items-center justify-center mr-2 sm:mr-3 rtl:ml-2 rtl:sm:ml-3 rtl:mr-0 group-hover/link:bg-red-500/20 group-hover/link:scale-110 transition-all duration-300">
                                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-red-400 group-hover/link:scale-110 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <span className="font-medium group-hover/link:text-red-400 transition-colors duration-300">ایمیل</span>
                            </a>
                            <a href="https://t.me/ParsaKh_83" target="_blank" rel="noopener noreferrer" className="inline-flex items-center group/link text-slate-300 transition-all duration-300 hover:translate-x-1 rtl:hover:translate-x-[-4px] text-sm sm:text-base">
                                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-blue-500/10 flex items-center justify-center mr-2 sm:mr-3 rtl:ml-2 rtl:sm:ml-3 rtl:mr-0 group-hover/link:bg-blue-500/20 group-hover/link:scale-110 transition-all duration-300">
                                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400 group-hover/link:scale-110 transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.13-.31-1.09-.66.02-.18.27-.36.75-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/>
                                    </svg>
                                </div>
                                <span className="font-medium group-hover/link:text-blue-400 transition-colors duration-300">تلگرام</span>
                            </a>
                            <a href="https://github.com/parsa83KH" target="_blank" rel="noopener noreferrer" className="inline-flex items-center group/link text-slate-300 transition-all duration-300 hover:translate-x-1 rtl:hover:translate-x-[-4px] text-sm sm:text-base">
                                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-slate-700/50 flex items-center justify-center mr-2 sm:mr-3 rtl:ml-2 rtl:sm:ml-3 rtl:mr-0 group-hover/link:bg-slate-600 group-hover/link:scale-110 transition-all duration-300">
                                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white group-hover/link:scale-110 transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24">
                                        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" clipRule="evenodd"/>
                                    </svg>
                                </div>
                                <span className="font-medium group-hover/link:text-white transition-colors duration-300">گیت‌هاب</span>
                            </a>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-6 sm:mt-10 pt-6 sm:pt-8 border-t border-slate-700/50 text-center">
                    <p className="text-xs sm:text-sm text-slate-400 px-2">
                        © ۱۴۰۴ انجمن علوم آزمایشگاهی دانشگاه آزاد علوم پزشکی تهران
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
