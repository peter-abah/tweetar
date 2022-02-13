import React from 'react';

import { AuthProvider } from './authContext';
import { TweetsProvider } from './tweetsContext';

const AllProviders = ({ children }: {children: React.ReactNode}) => {
  return (
    <AuthProvider>
      <TweetsProvider>
        {children}
      </TweetsProvider>
    </AuthProvider>
  );
};

export default AllProviders;