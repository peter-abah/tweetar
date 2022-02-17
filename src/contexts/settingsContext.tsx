import React, { createContext, useContext } from "react";
import { useBoolean } from "usehooks-ts";

export interface SettingsContextInterface {
  isNavOpen: boolean;
  toggleNav: () => void;
}

const SettingsContext = createContext<SettingsContextInterface | null>(null);

export const SettingsProvider = ({ children }: { children: React.ReactNode }) => {
  const { value: isNavOpen, toggle: toggleNav } = useBoolean(false);

  const providerValues = { isNavOpen, toggleNav };
  return (
    <SettingsContext.Provider value={providerValues}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () =>
  useContext(SettingsContext) as SettingsContextInterface;

