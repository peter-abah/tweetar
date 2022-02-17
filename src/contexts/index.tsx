import React from "react";

import { AuthProvider } from "./authContext";
import { TweetsProvider } from "./tweetsContext";
import { UsersProvider } from "./usersContext";

const AllProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthProvider>
      <UsersProvider>
        <TweetsProvider>{children}</TweetsProvider>
      </UsersProvider>
    </AuthProvider>
  );
};

export default AllProviders;
