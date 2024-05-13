import React, { useState, useEffect } from 'react';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { IconButton } from '@mui/material';
import CrowdFundingWriting from './CrowdFundingWriting';
import HighlightedCrowdFunding from './HighlightedCrowdFunding';
import CrowdFundingPage from './CrowdFundingPage';

const CrowdFundingUserView = () => {
    const [currentSection, setCurrentSection] = useState(0);
    const totalSections = 3;

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            const windowHeight = window.innerHeight;
            const documentHeight = document.body.clientHeight;
            const scrollPercentage = (scrollTop / (documentHeight - windowHeight)) * 100;

            let currentSectionIndex = Math.floor(scrollPercentage / (100 / totalSections));
            setCurrentSection(currentSectionIndex);
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleScrollDown = () => {
        const nextSection = (currentSection + 1) % totalSections;
        scrollToSection(nextSection);
    };

    const handleScrollUp = () => {
        const previousSection = (currentSection - 2 + totalSections) % totalSections;
        scrollToSection(previousSection);
    };

    const scrollToSection = (sectionIndex) => {
        const section = document.getElementById(`section-${sectionIndex}`);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div>
            <section id="section-0">
                <CrowdFundingPage />
            </section>
            <section id="section-1">
                <CrowdFundingWriting />
            </section>
            <section id="section-2">
                <HighlightedCrowdFunding />
            </section>
            <section id="section-3">

            </section>
            <div className="fixed bottom-10 right-10">
                {currentSection < totalSections - 1 ? (
                    <IconButton
                        color="primary"
                        onClick={handleScrollDown}
                        style={{ borderRadius: '50%', backgroundColor: '#3f51b5' }}
                    >
                        <ArrowDownwardIcon style={{ color: '#fff' }} />
                    </IconButton>
                ) : (
                    <IconButton
                        color="primary"
                        onClick={handleScrollUp}
                        style={{ borderRadius: '50%', backgroundColor: '#3f51b5' }}
                    >
                        <ArrowUpwardIcon style={{ color: '#fff' }} />
                    </IconButton>
                )}
            </div>
        </div>
    );
};

export default CrowdFundingUserView;
