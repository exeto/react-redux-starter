import React from 'react';

import Status from '../../components/Status';

const NotFound = () => (
  <Status code={404}>
    <div>
      <h2>404 Error</h2>
      <p>Sorry, but the page you were trying to view does not exist.</p>
    </div>
  </Status>
);

export default NotFound;
