/* eslint-disable react/jsx-no-constructed-context-values */

import React from 'react';

import { ApiContext } from './index.js';

const ApiProvider = ({ mainAPI, children }) => (
  <ApiContext.Provider value={mainAPI}>
    {children}
  </ApiContext.Provider>
);

export default ApiProvider;
