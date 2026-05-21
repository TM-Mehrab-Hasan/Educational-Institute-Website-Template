"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Notice, notices as defaultNotices } from '@/data/notices';
import { safeStorage } from './storage-utils';

interface NoticesContextType {
  notices: Notice[];
  addNotice: (notice: Omit<Notice, 'id'>) => void;
  updateNotice: (id: number, notice: Omit<Notice, 'id'>) => void;
  deleteNotice: (id: number) => void;
  getNoticeById: (id: number) => Notice | undefined;
}

const NoticesContext = createContext<NoticesContextType | undefined>(undefined);

const NOTICES_STORAGE_KEY = 'dmc_notices';

export const NoticesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notices, setNotices] = useState<Notice[]>(defaultNotices);
  const [isLoading, setIsLoading] = useState(true);

  // Load notices from storage on mount
  useEffect(() => {
    const stored = safeStorage.get<Notice[]>(NOTICES_STORAGE_KEY, []);
    if (stored && stored.length > 0) {
      setNotices(stored);
    } else {
      // Initialize with default notices
      safeStorage.set(NOTICES_STORAGE_KEY, defaultNotices);
      setNotices(defaultNotices);
    }
    setIsLoading(false);
  }, []);

  const addNotice = (notice: Omit<Notice, 'id'>) => {
    const newId = Math.max(...notices.map(n => n.id), 0) + 1;
    const newNotice: Notice = { ...notice, id: newId };
    const updated = [newNotice, ...notices];
    setNotices(updated);
    safeStorage.set(NOTICES_STORAGE_KEY, updated);
  };

  const updateNotice = (id: number, notice: Omit<Notice, 'id'>) => {
    const updated = notices.map(n => n.id === id ? { ...notice, id } : n);
    setNotices(updated);
    safeStorage.set(NOTICES_STORAGE_KEY, updated);
  };

  const deleteNotice = (id: number) => {
    const updated = notices.filter(n => n.id !== id);
    setNotices(updated);
    safeStorage.set(NOTICES_STORAGE_KEY, updated);
  };

  const getNoticeById = (id: number) => {
    return notices.find(n => n.id === id);
  };

  if (isLoading) return <>{children}</>;

  return (
    <NoticesContext.Provider value={{ notices, addNotice, updateNotice, deleteNotice, getNoticeById }}>
      {children}
    </NoticesContext.Provider>
  );
};

export const useNotices = () => {
  const context = useContext(NoticesContext);
  if (!context) {
    throw new Error('useNotices must be used within NoticesProvider');
  }
  return context;
};
