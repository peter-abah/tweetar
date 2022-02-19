import React, { createContext, useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useBoolean } from "usehooks-ts";

export interface SettingsContextInterface {
  isNavOpen: boolean;
  toggleNav: () => void;
}

const SettingsContext = createContext<SettingsContextInterface | null>(null);

export const SettingsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const location = useLocation();
  const {
    value: isNavOpen,
    toggle: toggleNav,
    setValue: setNavOpen,
  } = useBoolean(false);

  useEffect(() => setNavOpen(false), [location.pathname]);

  const providerValues = { isNavOpen, toggleNav };
  return (
    <SettingsContext.Provider value={providerValues}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () =>
  useContext(SettingsContext) as SettingsContextInterface;
