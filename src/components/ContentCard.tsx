import React from 'react';

const ContentCard: React.FC = () => {
    return (
        <div className="wrap animate pop">
            <div className="overlay">
                <div className="overlay-content animate slide-left delay-2">
                    <h1 className="animate slide-left pop delay-4">به سوی آینده</h1>
                    <p className="animate slide-left pop delay-5" style={{ color: 'white', marginBottom: '2.5rem' }}>شناسایی دقیق مسیر های مهاجرت</p>
                </div>
                <div className="image-content animate slide delay-5"></div>
                <div className="dots animate">
                    <div className="dot animate slide-up delay-6"></div>
                    <div className="dot animate slide-up delay-7"></div>
                    <div className="dot animate slide-up delay-8"></div>
                </div>
            </div>
            <div className="text">
                <p><img className="inset" src="/immagration.png" alt="" />در مسیر پیشرفت و تعالی، حرکت به سوی آینده نیازمند برنامه‌ریزی دقیق و راهبردهای هوشمندانه است. هر قدم که برمی‌داریم، هر تصمیمی که می‌گیریم، ما را به مقصد نهایی نزدیک‌تر می‌کند. آینده‌ای روشن با تلاش امروز ما ساخته می‌شود.</p>
                <p>شناسایی دقیق مسیرهای مهاجرت و تحرک جمعیت‌ها یکی از مهم‌ترین ابعاد مطالعات جمعیت‌شناختی و برنامه‌ریزی شهری است. با استفاده از روش‌های پیشرفته تحلیل داده‌ها و فناوری‌های مدرن، می‌توانیم الگوهای مهاجرت را شناسایی کنیم و برای آینده برنامه‌ریزی کنیم.</p>
                <p>با ترکیب دانش و تجربه، می‌توانیم بهترین راهکارها را برای چالش‌های پیش رو پیدا کنیم. حرکت به سوی آینده و شناسایی مسیرهای صحیح، رمز موفقیت در دنیای امروز است.</p>
            </div>
        </div>
    );
};

export default ContentCard;