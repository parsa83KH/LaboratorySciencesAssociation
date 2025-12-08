import React, { useEffect, useRef } from 'react';

const LogoAnimation: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    // Get base URL from Vite - defaults to '/' in dev, '/LaboratorySciencesAssociation/' in production
    const baseUrl = import.meta.env.BASE_URL || '/';
    const associationImageUrl = `${baseUrl}association.png`.replace(/\/\//g, '/');
    
    useEffect(() => {
        // Inject styles if not already present
        if (!document.getElementById('logo-animation-styles')) {
            const style = document.createElement('style');
            style.id = 'logo-animation-styles';
            style.textContent = `
                .logo-animation-container {
                    text-align: center;
                    position: relative;
                }
                .logo-animation-container svg {
                    filter: drop-shadow(0 15px 35px rgba(0, 0, 0, 0.4));
                    width: 120px;
                    height: 120px;
                    max-width: 100%;
                }
                @media (min-width: 640px) {
                    .logo-animation-container svg {
                        width: 160px;
                        height: 160px;
                    }
                }
                @media (min-width: 768px) {
                    .logo-animation-container svg {
                        width: 200px;
                        height: 200px;
                    }
                }
                @media (min-width: 1024px) {
                    .logo-animation-container svg {
                        width: 240px;
                        height: 240px;
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }, []);
    
    return (
        <div className="flex justify-center items-center mb-4 md:mb-6">
            <div className="logo-animation-container" ref={containerRef}>
                <svg id="logoSvg" width="700" height="700" viewBox="0 0 700 700" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <linearGradient id="blueGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" style={{ stopColor: '#1e3a8a', stopOpacity: 1 }} />
                            <stop offset="100%" style={{ stopColor: '#2563eb', stopOpacity: 1 }} />
                        </linearGradient>
                        
                        <linearGradient id="orangeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" style={{ stopColor: '#f59e0b', stopOpacity: 1 }} />
                            <stop offset="100%" style={{ stopColor: '#f97316', stopOpacity: 1 }} />
                        </linearGradient>

                        <filter id="textGlow">
                            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                            <feMerge> 
                                <feMergeNode in="coloredBlur"/>
                                <feMergeNode in="SourceGraphic"/>
                            </feMerge>
                        </filter>
                    </defs>

                    <path id="outerCircle" d="M 120,580 A 325,325 0 1,1 580,580" 
                            fill="none" stroke="url(#blueGradient)" strokeWidth="8" 
                            opacity="0" strokeDasharray="0 2042" strokeLinecap="round">
                        <animate attributeName="opacity" from="0" to="1" dur="0.5s" begin="0.5s" fill="freeze" />
                        <animate attributeName="stroke-dasharray" from="0 2042" to="2025 17" dur="2.5s" begin="0.7s" fill="freeze" />
                    </path>

                    <circle id="innerCircle" cx="350" cy="350" r="235" fill="none" 
                            stroke="url(#blueGradient)" strokeWidth="3" opacity="0"
                            strokeDasharray="0 1500">
                        <animate attributeName="opacity" from="0" to="1" dur="0.5s" begin="0.8s" fill="freeze" />
                        <animate attributeName="stroke-dasharray" from="0 1500" to="1476 0" dur="2s" begin="1s" fill="freeze" />
                    </circle>

                    <image id="centerImage" href={associationImageUrl} x="175" y="175" width="350" height="350" 
                           opacity="0" preserveAspectRatio="xMidYMid meet">
                        <animate attributeName="opacity" from="0" to="1" dur="1.5s" begin="2.5s" fill="freeze" />
                    </image>

                    <path id="topArcPath" fill="none" d="M 80,350 A 270,270 0 0,1 620,350" />
                    <text fontFamily="Vazirmatn, Arial, sans-serif" fontSize="26" fontWeight="900" 
                          fill="url(#blueGradient)" opacity="0" filter="url(#textGlow)">
                        <textPath href="#topArcPath" startOffset="50%" textAnchor="middle">
                            انجمن علمی علوم آزمایشگاهی دانشگاه علوم پزشکی آزاد اسلامی تهران
                        </textPath>
                        <animate attributeName="opacity" from="0" to="1" dur="1.2s" begin="2.5s" fill="freeze" />
                    </text>

                    <path id="bottomArcPath" fill="none" d="M 70,350 A 280,280 0 0,0 630,350" />
                    <text fontFamily="Arial, sans-serif" fontSize="26" fontWeight="900" 
                          fill="url(#blueGradient)" opacity="0" filter="url(#textGlow)">
                        <textPath href="#bottomArcPath" startOffset="50%" textAnchor="middle">
                            SCIENTIFIC ASSOCIATION OF LABORATORY SCIENCES
                        </textPath>
                        <animate attributeName="opacity" from="0" to="1" dur="1.2s" begin="2.5s" fill="freeze" />
                    </text>

                    <path id="universityTextPath" fill="none" d="M 120,580 A 325,325 0 0,0 580,580" />
                    <text fontFamily="Arial, sans-serif" fontSize="22" fontWeight="700" 
                          fill="url(#blueGradient)" opacity="0" filter="url(#textGlow)">
                        <textPath href="#universityTextPath" startOffset="50%" textAnchor="middle">
                            ISLAMIC AZAD UNIVERSITY, TEHRAN
                        </textPath>
                        <animate attributeName="opacity" from="0" to="1" dur="1s" begin="3.5s" fill="freeze" />
                    </text>

                    <circle cx="77.5" cy="340" r="12" fill="url(#blueGradient)" opacity="0">
                        <animate attributeName="opacity" from="0" to="1" dur="0.6s" begin="3.7s" fill="freeze" />
                        <animate attributeName="r" from="0" to="12" dur="0.8s" begin="3.7s" fill="freeze" />
                        <animateTransform attributeName="transform" type="rotate" 
                                        from="0 77.5 340" to="360 77.5 340" dur="1s" begin="3.7s" />
                    </circle>

                    <circle cx="622.5" cy="340" r="12" fill="url(#blueGradient)" opacity="0">
                        <animate attributeName="opacity" from="0" to="1" dur="0.6s" begin="3.9s" fill="freeze" />
                        <animate attributeName="r" from="0" to="12" dur="0.8s" begin="3.9s" fill="freeze" />
                        <animateTransform attributeName="transform" type="rotate" 
                                        from="0 622.5 340" to="-360 622.5 340" dur="1s" begin="3.9s" />
                    </circle>
                </svg>
            </div>
        </div>
    );
};

export default LogoAnimation;
