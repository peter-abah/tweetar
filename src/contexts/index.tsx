import React from "react";

import { AuthProvider } from "./authContext";
import { TweetsProvider } from "./tweetsContext";
import { UsersProvider } from "./usersContext";
import { SettingsProvider } from "./settingsContext";

const AllProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthProvider>
      <UsersProvider>
        <TweetsProvider>
          <SettingsProvider>{children}</SettingsProvider>
        </TweetsProvider>
      </UsersProvider>
    </AuthProvider>
  );
};

export default AllProviders;
