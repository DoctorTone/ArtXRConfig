import { create } from "zustand";

interface FileState {
  file: File | null;
  setFile: (file: File) => void;
  intensity: number;
  setIntensity: (value: number) => void;
  spotlightHelper: boolean;
  setSpotlightHelper: (status: boolean) => void;
  pointlightHelper: boolean;
  setPointlightHelper: (status: boolean) => void;
}

const useStore = create<FileState>((set) => ({
  file: null,
  setFile: (objFile) => set(() => ({ file: objFile })),
  intensity: 0.5,
  setIntensity: (value) => set(() => ({ intensity: value })),
  spotlightHelper: false,
  setSpotlightHelper: (status) => set(() => ({ spotlightHelper: status })),
  pointlightHelper: false,
  setPointlightHelper: (status) => set(() => ({ pointlightHelper: status })),
}));

export default useStore;
