import React, { useEffect, useState } from 'react';
import Axios from './Axios';

const Home = () => {
    const [sections, setSections] = useState([]);

    useEffect(() => {
        // Ensure this URL matches the Django API endpoint
        Axios.get('/homepage/sections/?published=true')
            .then(res => {
                setSections(res.data);
            })
            .catch(err => console.error('Error loading published sections:', err));
    }, []);

    const renderSection = (section) => {
        switch (section.section_type) {
            case 'hero':
                return (
                    <div className="section hero">
                        <h2>{section.title}</h2>
                        {section.image && <img src={section.image} alt={section.title} />}
                        <p>{section.description}</p>
                    </div>
                );
            case 'impact':
            case 'trusted_by':
            case 'why_join':
                return (
                    <div className={`section ${section.section_type}`}>
                        <h2>{section.title}</h2>
                        <p>{section.description}</p>
                        {section.video && <video src={section.video} controls />}
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="home-page">
            {sections.map(section => renderSection(section))}
        </div>
    );
};

export default Home;
