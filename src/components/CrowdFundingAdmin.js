import React from 'react';
import FundingLandingPage from './FundingLandingPage';
import FundingWritingPage from './FundingWritingPage';
import HighlightedFunding from './HighlightedFunding';

const CrowdFundingAdmin = () => {
    return (
        <div>
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
