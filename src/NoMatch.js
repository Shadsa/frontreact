/* eslint-disable react/jsx-indent */
import React from 'react';

export const NoMatch = ({ location }) => (
        <h1>
            No match for
            <code>
                {location.pathname}
            </code>
        </h1>
);

export default NoMatch;
