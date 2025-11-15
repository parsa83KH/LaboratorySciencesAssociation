import type { ContentItem, Member } from '../types';

export const members: Member[] = [
    {
        id: 1,
        name: 'آریا ستوده',
        role: 'دبیر انجمن',
        bio: 'دانشجوی دکترای بیوشیمی، علاقه‌مند به پروتئومیکس و تحقیقات سرطان.',
        image: 'https://picsum.photos/seed/member1/400/400',
        social: { linkedin: '#', twitter: '#' }
    },
    {
        id: 2,
        name: 'سارا محمدی',
        role: 'نائب دبیر',
        bio: 'متخصص ژنتیک مولکولی با تمرکز بر بیماری‌های ارثی و تکنیک‌های CRISPR.',
        image: 'https://picsum.photos/seed/member2/400/400',
        social: { linkedin: '#', github: '#' }
    },
    {
        id: 3,
        name: 'علی رضایی',
        role: 'مسئول کمیته علمی',
        bio: 'پژوهشگر ایمونولوژی، مسئول برنامه‌ریزی سمینارها و کارگاه‌های علمی.',
        image: 'https://picsum.photos/seed/member3/400/400',
        social: { twitter: '#' }
    },
    {
        id: 4,
        name: 'فاطمه حسینی',
        role: 'مسئول کمیته اجرایی',
        bio: 'مدیریت و هماهنگی رویدادها، اطمینان از اجرای روان تمام فعالیت‌های انجمن.',
        image: 'https://picsum.photos/seed/member4/400/400',
        social: { linkedin: '#' }
    },
];

const allContent: ContentItem[] = [
    {
        id: 1, type: 'news',
        title: 'سمینار هفتگی با موضوع تکنیک‌های جدید PCR',
        description: 'این هفته در سمینار تخصصی، به بررسی آخرین پیشرفت‌ها در تکنیک‌های Real-Time PCR خواهیم پرداخت.',
        date: '2024-07-15', image: 'https://picsum.photos/seed/pcr/600/400',
    },
    {
        id: 2, type: 'news',
        title: 'انتخاب اعضای جدید انجمن',
        description: 'نتایج انتخابات شورای مرکزی انجمن اعلام شد. برای اعضای جدید آرزوی موفقیت داریم.',
        date: '2024-07-10', image: 'https://picsum.photos/seed/election/600/400',
    },
    {
        id: 3, type: 'announcement',
        title: 'فراخوان ارسال مقاله برای نشریه',
        description: 'از تمامی دانشجویان و پژوهشگران دعوت می‌شود مقالات خود را تا پایان مرداد ماه ارسال نمایند.',
        date: '2024-07-20', image: 'https://picsum.photos/seed/journal/600/400',
    },
    {
        id: 4, type: 'news',
        title: 'موفقیت تیم دانشگاه در مسابقات ملی',
        description: 'تیم المپیاد علوم آزمایشگاهی دانشگاه موفق به کسب رتبه دوم کشوری شد. این موفقیت را به همه اعضا تبریک می‌گوییم.',
        date: '2024-06-28', image: 'https://picsum.photos/seed/competition/600/400',
    },
     {
        id: 5, type: 'announcement',
        title: 'تغییر ساعت کاری کتابخانه در تابستان',
        description: 'به اطلاع می‌رساند ساعت کاری کتابخانه دانشکده از تاریخ اول تیر ماه تا پایان شهریور از ۸ صبح تا ۴ بعد از ظهر خواهد بود.',
        date: '2024-06-25', image: 'https://picsum.photos/seed/library/600/400',
    },
    {
        id: 6, type: 'course',
        title: 'دوره جامع کشت سلولی',
        description: 'یک دوره ۴۰ ساعته شامل مباحث تئوری و عملی کشت انواع سلول‌های جانوری.',
        date: '2024-08-01', image: 'https://picsum.photos/seed/cell/600/400',
    },
    {
        id: 7, type: 'workshop',
        title: 'کارگاه عملی ELISA',
        description: 'در این کارگاه یک روزه، شرکت‌کنندگان به صورت عملی تکنیک ELISA را فرا خواهند گرفت.',
        date: '2024-07-25', image: 'https://picsum.photos/seed/elisa/600/400',
        video: 'https://www.youtube.com/embed/7o_o_yI8T74'
    },
    {
        id: 8, type: 'workshop',
        title: 'کارگاه اصول کار با میکروسکوپ الکترونی',
        description: 'آشنایی با مبانی و تکنیک‌های کار با میکروسکوپ الکترونی (SEM و TEM).',
        date: '2024-09-10', image: 'https://picsum.photos/seed/microscope/600/400',
    },
    {
        id: 9, type: 'course',
        title: 'دوره پیشرفته بیوانفورماتیک',
        description: 'تحلیل داده‌های ژنومی و پروتئومی با استفاده از ابزارهای نرم‌افزاری مدرن مانند Python و R.',
        date: '2024-09-15', image: 'https://picsum.photos/seed/bioinformatics/600/400',
        video: 'https://www.youtube.com/embed/7o_o_yI8T74'
    },
    {
        id: 10, type: 'workshop',
        title: 'کارگاه مقاله‌نویسی علمی',
        description: 'از ایده تا انتشار: چگونه یک مقاله علمی استاندارد بنویسیم و در مجلات معتبر منتشر کنیم.',
        date: '2024-08-20', image: 'https://picsum.photos/seed/writing/600/400',
    }
];

export const mockData: { [key: string]: ContentItem[] } = {
    newsAndAnnouncements: allContent
        .filter(item => item.type === 'news' || item.type === 'announcement')
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()),
    coursesAndWorkshops: allContent
        .filter(item => item.type === 'course' || item.type === 'workshop')
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()),
};