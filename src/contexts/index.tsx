import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";

import { AuthProvider } from "./authContext";
import { SettingsProvider } from "./settingsContext";

const queryClient = new QueryClient();

const AllProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <SettingsProvider>{children}</SettingsProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default AllProviders;
