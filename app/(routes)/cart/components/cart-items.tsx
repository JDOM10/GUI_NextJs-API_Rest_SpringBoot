'use client'

interface CartItemProps {
  data: Product
}

import { Currency } from '@/components/ui/currency'
import { IconButton } from '@/components/ui/icon-button'
import { useCart } from '@/hooks/use-cart'
import { Product } from '@/types'
import { X } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

export const CartItems: React.FC<CartItemProps> = ({ data }) => {
  const cart = useCart()

  const onRemove = () => {
    cart.removeItem(data.tipoplanId)
  }

  return (
    <li className="flex py-6 border-b">
      <div className="relative h-24 w-24 rounded-md overflow-hidden sm:h-16 sm:w-24 ">
        {/* <Image
          fill
          src={data.tipoplanImagen}
          alt={data.tipoplanNombre}
          className="object-cover object-center"
        /> */}
      </div>

      <div className="relative ml-4 flex flex-1 flex-col justify-between sm:ml-6">
        <div className="absolute z-10 right-0 top-0">
          <IconButton onClick={onRemove} icon={<X size={15} />} />
        </div>

        <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
          <div className="flex justify-between">
            <p className="text-lg font-semibold text-black">{data.tipoplanNombre}</p>
          </div>

          <Currency value={data.tipoplanPrecio} />
        </div>
      </div>
    </li>
  )
}