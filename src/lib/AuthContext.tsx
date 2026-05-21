"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { safeStorage } from './storage-utils';

export type ApplicationStatus = 'Not Started' | 'Draft' | 'Submitted';
export type StudentType = 'New' | 'Transfer';

export interface ApplicationData {
  currentStep: number;
  formData: any;
  status: ApplicationStatus;
  studentType: StudentType | null;
  procedureStep: number; // 1: Applied, 2: Verification, 3: Test, 4: Selected, 5: Enrolled
  updatedAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  password?: string; // In a real app, this wouldn't be on the user object in context
  application: ApplicationData;
}

interface AuthContextType {
  currentUser: User | null;
  isLoading: boolean;
  register: (name: string, email: string, password: string) => Promise<{ success: boolean; message?: string }>;
  login: (email: string, password: string) => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
  updateApplication: (data: Partial<ApplicationData>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEY = 'dmc_admission_users';
const SESSION_KEY = 'dmc_admission_session';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load users and session from localStorage
  useEffect(() => {
    const storedUsers = safeStorage.get<User[]>(STORAGE_KEY, []);
    const storedSession = localStorage.getItem(SESSION_KEY);

    if (storedUsers && storedUsers.length > 0) {
      setUsers(storedUsers);
    } else {
      // Pre-populate with a dummy user for testing
      const dummyUser: User = {
        id: 'dummy-1',
        name: 'Test Applicant',
        email: 'test@example.com',
        password: 'password123',
        application: {
          currentStep: 1,
          formData: {},
          status: 'Not Started',
          studentType: null,
          procedureStep: 1,
          updatedAt: new Date().toISOString()
        }
      };
      setUsers([dummyUser]);
      safeStorage.set(STORAGE_KEY, [dummyUser]);
    }

    if (storedSession) {
      setCurrentUser(JSON.parse(storedSession));
    }
    
    setIsLoading(false);
  }, []);

  // Sync users to localStorage whenever they change
  useEffect(() => {
    if (!isLoading) {
      safeStorage.set(STORAGE_KEY, users);
    }
  }, [users, isLoading]);

  // Sync session to localStorage whenever currentUser changes
  useEffect(() => {
    if (!isLoading) {
      if (currentUser) {
        safeStorage.set(SESSION_KEY, currentUser);
      } else {
        safeStorage.remove(SESSION_KEY);
      }
    }
  }, [currentUser, isLoading]);

  const register = async (name: string, email: string, password: string) => {
    // Check if user already exists
    if (users.find(u => u.email === email)) {
      return { success: false, message: 'Email already registered' };
    }

    const newUser: User = {
      id: Math.random().toString(36).substring(2, 11),
      name,
      email,
      password,
      application: {
        currentStep: 1,
        formData: {},
        status: 'Not Started',
        studentType: null,
        procedureStep: 1,
        updatedAt: new Date().toISOString()
      }
    };

    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    setCurrentUser(newUser);
    return { success: true };
  };

  const login = async (email: string, password: string) => {
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      setCurrentUser(user);
      return { success: true };
    }
    return { success: false, message: 'Invalid email or password' };
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const updateApplication = (data: Partial<ApplicationData>) => {
    if (!currentUser) return;

    const updatedApplication = {
      ...currentUser.application,
      ...data,
      updatedAt: new Date().toISOString()
    };

    const updatedUser = {
      ...currentUser,
      application: updatedApplication
    };

    setCurrentUser(updatedUser);
    
    // Update the user in the "database" list as well
    setUsers(prevUsers => 
      prevUsers.map(u => u.id === updatedUser.id ? updatedUser : u)
    );
  };

  return (
    <AuthContext.Provider value={{ 
      currentUser, 
      isLoading, 
      register, 
      login, 
      logout, 
      updateApplication 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
