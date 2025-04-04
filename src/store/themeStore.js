import { create } from "zustand";

const useThemeStore = create((set) => ({
  bgColor: "blue", // Default background color
  setBgColor: (color) => set({ bgColor: color }), // Function to update the background color
}));

export default useThemeStore;
