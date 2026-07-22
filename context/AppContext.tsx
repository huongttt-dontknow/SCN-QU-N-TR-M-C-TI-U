"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface User {
  id: string;
  employeeCode: string;
  fullname: string;
  email: string;
  role: string;
  unitCode: string;
}

export interface RolePermission {
  role: string;
  viewDashboard: boolean;
  editKPI: boolean;
  approveReport: boolean;
  editOKR: boolean;
  manageRoles: boolean;
}

interface AppFilters {
  unitCode: string;
  periodType: string; // weekly, monthly, quarterly, yearly
  month: string;
  week: string;
  quarter: string;
  year: string;
}

interface AppContextType {
  currentLoggedUser: User | null;
  usersList: User[];
  permissions: RolePermission[];
  filters: AppFilters;
  theme: "dark" | "light";
  setCurrentLoggedUser: (user: User | null) => void;
  setFilters: React.Dispatch<React.SetStateAction<AppFilters>>;
  toggleTheme: () => void;
  refreshUsers: () => Promise<void>;
  refreshPermissions: () => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [currentLoggedUser, setCurrentLoggedUserState] = useState<User | null>(null);
  const [usersList, setUsersList] = useState<User[]>([]);
  const [permissions, setPermissions] = useState<RolePermission[]>([]);
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  const [filters, setFilters] = useState<AppFilters>({
    unitCode: "SCVN",
    periodType: "weekly",
    month: "7",
    week: "1",
    quarter: "Q3",
    year: "2026",
  });

  // Load theme and user session from localStorage on initial render
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("sconnect_theme") as "dark" | "light";
      if (savedTheme === "light" || savedTheme === "dark") {
        setTheme(savedTheme);
        document.documentElement.classList.toggle("light", savedTheme === "light");
      }

      const savedUser = localStorage.getItem("sconnect_user");
      if (savedUser) {
        try {
          const parsed = JSON.parse(savedUser);
          setCurrentLoggedUserState(parsed);
          const isRestricted = parsed.role === "Trưởng đơn vị" || parsed.role === "Người dùng";
          if (isRestricted) {
            setFilters(prev => ({ ...prev, unitCode: parsed.unitCode }));
          }
        } catch (e) {
          console.error("Lỗi parse sconnect_user:", e);
        }
      }
    }
  }, []);

  const toggleTheme = () => {
    setTheme(prev => {
      const nextTheme = prev === "dark" ? "light" : "dark";
      if (typeof window !== "undefined") {
        localStorage.setItem("sconnect_theme", nextTheme);
      }
      document.documentElement.classList.toggle("light", nextTheme === "light");
      return nextTheme;
    });
  };

  const refreshUsers = async () => {
    try {
      const res = await fetch("/api/users");
      const data = await res.json();
      if (Array.isArray(data)) {
        setUsersList(data);
        if (typeof window !== "undefined") {
          const savedUser = localStorage.getItem("sconnect_user");
          if (!savedUser && !currentLoggedUser && data.length > 0) {
            // Default to first user if no session
            const admin = data.find(u => u.role === "Admin") || data[0];
            setCurrentLoggedUserState(admin);
          }
        }
      }
    } catch (e) {
      console.error("Lỗi fetch users:", e);
    }
  };

  const refreshPermissions = async () => {
    try {
      const res = await fetch("/api/permissions");
      const data = await res.json();
      if (Array.isArray(data)) {
        setPermissions(data);
      }
    } catch (e) {
      console.error("Lỗi fetch permissions:", e);
    }
  };

  useEffect(() => {
    refreshUsers();
    refreshPermissions();
  }, []);

  const setCurrentLoggedUser = (user: User | null) => {
    setCurrentLoggedUserState(user);
    if (typeof window !== "undefined") {
      if (user) {
        localStorage.setItem("sconnect_user", JSON.stringify(user));
        const isRestricted = user.role === "Trưởng đơn vị" || user.role === "Người dùng";
        if (isRestricted) {
          setFilters(prev => ({
            ...prev,
            unitCode: user.unitCode,
          }));
        }
      } else {
        localStorage.removeItem("sconnect_user");
      }
    }
  };

  return (
    <AppContext.Provider
      value={{
        currentLoggedUser,
        usersList,
        permissions,
        filters,
        theme,
        setCurrentLoggedUser,
        setFilters,
        toggleTheme,
        refreshUsers,
        refreshPermissions,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}
