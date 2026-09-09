import { create } from 'zustand';

export const useThemeStore = create((set) => ({
  isDarkMode: localStorage.getItem('theme') === 'dark',

  toggleDarkMode: () =>
    set((state) => {
      const nextMode = !state.isDarkMode;
      if (nextMode) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      }
      return { isDarkMode: nextMode };
    }),

  initTheme: () => {
    const isDark = localStorage.getItem('theme') === 'dark';
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }
}));
