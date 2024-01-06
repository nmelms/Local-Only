import { create } from "zustand";

const useUserStore = create((set) => ({
  // initial state
  lat: 39.5,
  lng: -98.35,
  isUserSet: false,
  spinning: false,
  showOffcanvas: false,

  // actions
  setLocation: (lat, lng) => set({ lat, lng }),
  setSpinning: (spinning) => set({ spinning }),
  setShowOffcanvas: (showOffcanvas) => set({ showOffcanvas }),
  isUserSet: (isUserSet) => set({ isUserSet }),
}));

export default useUserStore;
