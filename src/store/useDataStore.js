import { create } from 'zustand';
import API from '../services/api';

export const useDataStore = create((set, get) => ({
  festivalYear: 2026,
  summary: null,
  contributions: [],
  expenses: [],
  announcements: [],
  events: [],
  gallery: [],
  settings: null,
  loading: true,
  searchQuery: '',
  selectedReceipt: null,

  setFestivalYear: (year) => {
    set({ festivalYear: year });
    get().fetchAllData();
  },

  setSearchQuery: (query) => set({ searchQuery: query }),
  setSelectedReceipt: (receipt) => set({ selectedReceipt: receipt }),

  fetchAllData: async () => {
    try {
      set({ loading: true });
      const year = get().festivalYear;

      const [summaryRes, contribRes, expenseRes, annRes, eventRes, galleryRes] = await Promise.all([
        API.get(`/public/summary?festivalYear=${year}`),
        API.get(`/contributions?festivalYear=${year}`),
        API.get(`/expenses?festivalYear=${year}`),
        API.get(`/announcements?festivalYear=${year}`),
        API.get(`/events?festivalYear=${year}`),
        API.get(`/gallery?festivalYear=${year}`),
      ]);

      set({
        summary: summaryRes.data.data,
        settings: summaryRes.data.data.settings,
        contributions: contribRes.data.contributions || [],
        expenses: expenseRes.data.expenses || [],
        announcements: annRes.data.announcements || [],
        events: eventRes.data.events || [],
        gallery: galleryRes.data.images || [],
        loading: false,
      });
    } catch (err) {
      console.error('Error fetching data:', err);
      set({ loading: false });
    }
  },

  // --- Settings Actions ---
  updateSettings: async (settingsData) => {
    try {
      const year = get().festivalYear;
      const res = await API.put('/settings', { ...settingsData, festivalYear: year });
      if (res.data.success) {
        set({ settings: res.data.settings });
        get().fetchAllData();
        return res.data;
      }
    } catch (err) {
      throw new Error(err.response?.data?.message || 'Failed to update settings');
    }
  },

  // --- Contribution Actions ---
  addContribution: async (data) => {
    try {
      const year = get().festivalYear;
      const res = await API.post('/contributions', { ...data, festivalYear: year });
      if (res.data.success) {
        get().fetchAllData();
        return res.data;
      }
    } catch (err) {
      throw new Error(err.response?.data?.message || 'Failed to add contribution');
    }
  },

  addBulkContributions: async (items) => {
    try {
      const year = get().festivalYear;
      const res = await API.post('/contributions', { items, festivalYear: year });
      if (res.data.success) {
        get().fetchAllData();
        return res.data;
      }
    } catch (err) {
      throw new Error(err.response?.data?.message || 'Failed to add bulk contributions');
    }
  },

  updateContribution: async (id, data) => {
    try {
      const res = await API.put(`/contributions/${id}`, data);
      if (res.data.success) {
        get().fetchAllData();
        return res.data;
      }
    } catch (err) {
      throw new Error(err.response?.data?.message || 'Failed to update contribution');
    }
  },

  deleteContribution: async (id) => {
    try {
      const res = await API.delete(`/contributions/${id}`);
      if (res.data.success) {
        get().fetchAllData();
        return res.data;
      }
    } catch (err) {
      throw new Error(err.response?.data?.message || 'Failed to delete contribution');
    }
  },

  // --- Expense Actions ---
  addExpense: async (formData) => {
    try {
      const year = get().festivalYear;
      formData.append('festivalYear', year);
      const res = await API.post('/expenses', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      if (res.data.success) {
        get().fetchAllData();
        return res.data;
      }
    } catch (err) {
      throw new Error(err.response?.data?.message || 'Failed to add expense');
    }
  },

  deleteExpense: async (id) => {
    try {
      const res = await API.delete(`/expenses/${id}`);
      if (res.data.success) {
        get().fetchAllData();
        return res.data;
      }
    } catch (err) {
      throw new Error(err.response?.data?.message || 'Failed to delete expense');
    }
  },

  updateExpense: async (id, formData) => {
    try {
      const res = await API.put(`/expenses/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      if (res.data.success) {
        get().fetchAllData();
        return res.data;
      }
    } catch (err) {
      throw new Error(err.response?.data?.message || 'Failed to update expense');
    }
  },

  // --- Announcement Actions ---
  addAnnouncement: async (data) => {
    try {
      const year = get().festivalYear;
      const res = await API.post('/announcements', { ...data, festivalYear: year });
      if (res.data.success) {
        get().fetchAllData();
        return res.data;
      }
    } catch (err) {
      throw new Error(err.response?.data?.message || 'Failed to add announcement');
    }
  },

  deleteAnnouncement: async (id) => {
    try {
      const res = await API.delete(`/announcements/${id}`);
      if (res.data.success) {
        get().fetchAllData();
        return res.data;
      }
    } catch (err) {
      throw new Error(err.response?.data?.message || 'Failed to delete announcement');
    }
  },

  // --- Event & Volunteer Actions ---
  addEvent: async (data) => {
    try {
      const year = get().festivalYear;
      const res = await API.post('/events', { ...data, festivalYear: year });
      if (res.data.success) {
        get().fetchAllData();
        return res.data;
      }
    } catch (err) {
      throw new Error(err.response?.data?.message || 'Failed to schedule event');
    }
  },

  deleteEvent: async (id) => {
    try {
      const res = await API.delete(`/events/${id}`);
      if (res.data.success) {
        get().fetchAllData();
        return res.data;
      }
    } catch (err) {
      throw new Error(err.response?.data?.message || 'Failed to delete event');
    }
  },

  signUpVolunteer: async (eventId, slotId, volunteerData) => {
    try {
      const res = await API.post(`/events/${eventId}/volunteer`, { slotId, ...volunteerData });
      if (res.data.success) {
        get().fetchAllData();
        return res.data;
      }
    } catch (err) {
      throw new Error(err.response?.data?.message || 'Failed to register volunteer slot');
    }
  },

  // --- Gallery Actions ---
  addGalleryImage: async (formData) => {
    try {
      const year = get().festivalYear;
      formData.append('festivalYear', year);
      const res = await API.post('/gallery', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      if (res.data.success) {
        get().fetchAllData();
        return res.data;
      }
    } catch (err) {
      throw new Error(err.response?.data?.message || 'Failed to upload photo');
    }
  },

  deleteGalleryImage: async (id) => {
    try {
      const res = await API.delete(`/gallery/${id}`);
      if (res.data.success) {
        get().fetchAllData();
        return res.data;
      }
    } catch (err) {
      throw new Error(err.response?.data?.message || 'Failed to delete image');
    }
  },
}));
