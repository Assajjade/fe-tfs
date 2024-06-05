import React from 'react';
import FundingLandingPage from './FundingLandingPage';
import FundingWritingPage from './FundingWritingPage';
import HighlightedFunding from './HighlightedFunding';

const CrowdFundingAdmin = () => {
    return (
        <div style={{justifyContent: 'right' }}>
            <section>
                <FundingLandingPage />
            </section>
            <section>
                <FundingWritingPage />
            </section>
            <section>
                <HighlightedFunding />
            </section>
        </div>
    );
};

export default CrowdFundingAdmin;
