import { toast } from 'react-hot-toast'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

import { Product } from '@/types'

interface CartStore {
  items: Product[]
  addItem: (data: Product) => void
  removeItem: (id: number) => void
  removeAll: () => void
}

export const useCart = create(
  persist<CartStore>(
    (set, get) => ({
      items: [],
      addItem: (data: Product) => {
        const currentItems = get().items
        const existingItem = currentItems.find((item) => item.tipoplanId === data.tipoplanId)

        if (existingItem) {
          return toast('El Plan ya esta en el carrito.')
        }

        set({ items: [...get().items, data] })
        toast.success('Plan añadido al carrito.')
      },
      removeItem: (id: number) => {
        set({ items: [...get().items.filter((item) => item.tipoplanId !== id)] })
        toast.success('Plan removido del carrito.')
      },
      removeAll: () => set({ items: [] }),
    }),
    {
      name: 'cart-storage',
      storage: createJSONStorage(() => localStorage),
    },
  ),
)