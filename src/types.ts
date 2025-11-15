export interface Translation {
    [key: string]: string | { [key: string]: string };
}

export interface ContentItem {
    id: number;
    type: 'news' | 'announcement' | 'course' | 'workshop';
    title: string;
    description: string;
    date: string;
    image: string;
    video?: string;
}

export interface Member {
    id: number;
    name: string;
    role: string;
    bio: string;
    image: string;
    social: {
        linkedin?: string;
        twitter?: string;
        github?: string;
    };
}

export type PageKey = 'home' | 'newsAndAnnouncements' | 'coursesAndWorkshops' | 'members';