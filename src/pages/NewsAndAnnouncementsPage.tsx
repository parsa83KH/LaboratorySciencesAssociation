import React from 'react';
import Page from '../components/Section';
import type { Translation } from '../types';

interface NewsAndAnnouncementsPageProps {
    translations: Translation;
    theme?: 'light' | 'dark';
}

const NewsAndAnnouncementsPage: React.FC<NewsAndAnnouncementsPageProps> = ({ translations, theme = 'dark' }) => {
    return (
        <Page 
            key="newsAndAnnouncements" 
            title={translations.newsAndAnnouncements as string} 
            isNewsPage={true} 
            theme={theme}
        >
        </Page>
    );
};

export default NewsAndAnnouncementsPage;

