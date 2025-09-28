import { create } from 'zustand';

export const useAuthStore = create((set) => ({
  user: JSON.parse(localStorage.getItem('user')) || null,

  login: (userData) => {
    const normalisedUser = userData?.data ?? userData;
    localStorage.setItem('user', JSON.stringify(normalisedUser));
    set({ user: normalisedUser });
  },

  logout: () => {
    localStorage.removeItem('user');
    set({ user: null });
  },

  updateUser: (updatedUser) => {
    const normalisedUser = updatedUser?.data ?? updatedUser;
    localStorage.setItem('user', JSON.stringify(normalisedUser));
    set({ user: normalisedUser });
  },
}));
