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
  periodType: string; // weekly, monthly, quarterly
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
  setCurrentLoggedUser: (user: User) => void;
  setFilters: React.Dispatch<React.SetStateAction<AppFilters>>;
  refreshUsers: () => Promise<void>;
  refreshPermissions: () => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [currentLoggedUser, setCurrentLoggedUserState] = useState<User | null>(null);
  const [usersList, setUsersList] = useState<User[]>([]);
  const [permissions, setPermissions] = useState<RolePermission[]>([]);
  const [filters, setFilters] = useState<AppFilters>({
    unitCode: "SCVN",
    periodType: "weekly",
    month: "7",
    week: "1",
    quarter: "Q3",
    year: "2026",
  });

  const refreshUsers = async () => {
    try {
      const res = await fetch("/api/users");
      const data = await res.json();
      if (Array.isArray(data)) {
        setUsersList(data);
        // Set default active user to Admin (Trí)
        if (!currentLoggedUser && data.length > 0) {
          const admin = data.find(u => u.role === "Admin") || data[0];
          setCurrentLoggedUserState(admin);
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

  const setCurrentLoggedUser = (user: User) => {
    setCurrentLoggedUserState(user);
    // Tự động đồng bộ khóa đơn vị nếu vai trò hạn chế
    const isRestricted = user.role === "Trưởng đơn vị" || user.role === "Người dùng";
    if (isRestricted) {
      setFilters(prev => ({
        ...prev,
        unitCode: user.unitCode,
      }));
    }
  };

  return (
    <AppContext.Provider
      value={{
        currentLoggedUser,
        usersList,
        permissions,
        filters,
        setCurrentLoggedUser,
        setFilters,
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
