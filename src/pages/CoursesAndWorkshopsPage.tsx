import React from 'react';
import Page from '../components/Section';
import ContentCard from '../components/ContentCard';
import type { Translation } from '../types';
import { mockData } from '../lib/data';

interface CoursesAndWorkshopsPageProps {
    translations: Translation;
    theme?: 'light' | 'dark';
}

const CoursesAndWorkshopsPage: React.FC<CoursesAndWorkshopsPageProps> = ({ translations, theme = 'dark' }) => {
    const courses = mockData.coursesAndWorkshops;

    return (
        <Page 
            key="coursesAndWorkshops" 
            title={translations.coursesAndWorkshops as string} 
            isNewsPage={true} 
            theme={theme}
        >
            <div className="courses-page-container">
                <div className="courses-grid-container" role="region" aria-label="Courses list">
                    {courses.map((course) => (
                        <ContentCard 
                            key={course.id}
                            item={course}
                            useLegacyStyle={true}
                            translations={translations}
                        />
                    ))}
                </div>
            </div>
        </Page>
    );
};

export default CoursesAndWorkshopsPage;

