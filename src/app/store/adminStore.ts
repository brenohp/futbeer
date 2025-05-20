import { create } from 'zustand'

type AdminStore = {
  isAdmin: boolean
  setAdmin: (value: boolean) => void
}

export const useAdminStore = create<AdminStore>((set) => ({
  isAdmin: false,
  setAdmin: (value) => set({ isAdmin: value }),
}))
