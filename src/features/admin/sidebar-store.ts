import { create } from 'zustand';

type AdminSidebarState = {
  collapsed: boolean;
  toggleCollapsed: () => void;
};

export const useAdminSidebarStore = create<AdminSidebarState>((set) => ({
  collapsed: false,
  toggleCollapsed: () => set((state) => ({ collapsed: !state.collapsed })),
}));
