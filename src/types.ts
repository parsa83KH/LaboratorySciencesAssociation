export interface Translation {
    [key: string]: string | { [key: string]: string };
}

export interface ContentItem {
    id: number;
    type: 'news' | 'announcement' | 'course' | 'workshop';
    title: string;
    description: string;
    date: string; // Display date (can be Persian or ISO format)
    dateForSort?: string; // ISO format date for sorting (YYYY-MM-DD)
    image: string;
    video?: string;
    price?: string;
    location?: string;
    instructor?: string; // Instructor name
    time?: string; // Time range (e.g., "18:00 - 20:00")
    dayOfWeek?: string; // Day of week in Persian (e.g., "دوشنبه", "سه‌شنبه")
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