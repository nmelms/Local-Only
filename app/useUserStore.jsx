import { create } from "zustand";

const useUserStore = create((set) => ({
  // initial state
  lat: 39.5,
  lng: -98.35,
  isUserSet: false,
  spinning: false,
  showOffcanvas: false,
  shopData: null,
  mapInstance: null, // Store the map instance
  isMapSet: false,
  showPopup: false,
  popupData: {},
  user: null,

  // actions
  setLocation: (lat, lng) => set({ lat, lng }),
  setSpinning: (spinning) => set({ spinning }),
  setShowOffcanvas: (showOffcanvas) => set({ showOffcanvas }),
  isUserSet: (isUserSet) => set({ isUserSet }),
  setShopData: (shopData) => set({ shopData }),
  setMapInstance: (mapInstance) => set({ mapInstance }),
  setIsMapSet: (isMapSet) => set({ isMapSet }),
  setShowPopup: (showPopup) => set({ showPopup }),
  setPopupData: (popupData) => set({ popupData }),
  setUser: (user) => set({ user }),
}));

export default useUserStore;
