import { create } from "zustand";

const useUserStore = create((set) => ({
  // initial state
  lat: 39.5,
  lng: -98.35,

  // actions
  setLocation: (lat, lng) => set({ lat, lng }),
}));

export default useUserStore;
