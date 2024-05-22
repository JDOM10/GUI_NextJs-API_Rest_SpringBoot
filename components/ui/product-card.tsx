'use client'

import { IconButton } from '@/components/ui/icon-button'
import { useCart } from '@/hooks/use-cart'
import { Product } from '@/types'
import { ShoppingCart } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { MouseEventHandler } from 'react'
import { Currency } from './currency'

interface ProductCard {
  data: Product
}


export const ProductCard: React.FC<ProductCard> = ({ data }) => {
  const cart = useCart()

  const onAddToCart: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation()

    cart.addItem(data)
  }

  return (
    <div
      className="bg-white group cursor-pointer rounded-xl border p-3 space-y-4"
    >
      <div className="aspect-square rounded-xl bg-gray-100 relative image-container">
        <Image
          alt={data.tipoplanNombre}
          src={data.tipoplanImagen}
          fill
          className="aspect-square object-cover rounded-md"
        />

        <div className="opacity-0 group-hover:opacity-100 transition absolute w-full px-6 bottom-5">
          <div className="flex gap-x-6 justify-center">
            <IconButton
              onClick={onAddToCart}
              icon={<ShoppingCart size={24} className="text-gray-600" />}
            />
          </div>
        </div>
      </div>

      <div>
        <p className="font-semibold text-lg">{data.tipoplanNombre}</p>

      </div>

      <div className="flex items-center justify-between">
        <Currency value={data.tipoplanPrecio} />
      </div>
    </div>
  )
}