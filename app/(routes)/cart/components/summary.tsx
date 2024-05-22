'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Currency } from '@/components/ui/currency'
import { useCart } from '@/hooks/use-cart'
import axios from 'axios'
import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import toast from 'react-hot-toast'
import { useRouter } from "next/navigation";

export const Summary = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const items = useCart((state) => state.items)
  const removeAll = useCart((state) => state.removeAll)
  const [cedula, setCedula] = useState('')

  useEffect(() => {
    if (searchParams.get('success')) {
      toast.success('Tu pedido ha sido realizado!')
      removeAll()
    }

    if (searchParams.get('canceled')) {
      toast.error('Algo suceció, por favor intenta de nuevo.')
    }
  }, [searchParams, removeAll])

  const totalPrice = items.reduce((total, item) => {
    return total + Number(item.tipoplanPrecio)
  }, 0)

  const onCheckout = async () => {
    if (!cedula) {
      toast.error('Por favor, ingresa tu cédula.')
      return
    }

    try {
      for (const item of items) {
        // Realizar la solicitud a "suscripciones"
        await axios.post(`http://localhost:4000/suscripcion`, {
          cliente: cedula,
          tipoplan: item.tipoplanId,
          susRenovacionAuto: true,
          susEstado: true,
        })

        // Realizar la solicitud a "pagos"
        await axios.post(`http://localhost:4000/pago`, {
          cliente: cedula,
          pagoTipo: 'Transferencia',
          pagoMonto: item.tipoplanPrecio,
          pagoFecha: new Date(),
          pagoPendiente: 'pendiente',
          pagoEstado: true,
        })
      }

      toast.success('La compra se ha realizado con éxito!')
      router.push('/')
      removeAll()
    } catch (error) {
      toast.error('La cédula ingresada no es válida.')
    }
  }

  return (
    <div className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8">
      <h2 className="text-lg font-medium text-gray-900">Resumen de la Orden</h2>

      <div className="mt-6 space-y-4">
        <div className="flex items-center justify-between border-t border-gray-200 pt-4">
          <div className="text-base font-medium text-gray-900">Total de la Orden</div>
          <Currency value={totalPrice} />
        </div>
        <div className="pt-4">
          <label htmlFor="cedula" className="block text-sm font-medium text-gray-700">
            Cédula
          </label>
          <input
            type="text"
            id="cedula"
            name="cedula"
            value={cedula}
            onChange={(e) => setCedula(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            required
          />
        </div>
      </div>

      <Button
        disabled={items.length === 0}
        onClick={onCheckout}
        className="w-full mt-6"
      >
        Checkout
      </Button>
    </div>
  )
}