import { getProducts } from '@/actions/get-products'
import { ProductList } from '@/components/product-list'
import { Container } from '@/components/ui/container'
import axios from 'axios'

export const revalidate = 0

const HomePage = async () => {
  const products = [
    {
      "TIPOPLAN_ID": 7,
      "TIPOPLAN_NOMBRE": "Plan Básico - Mensual",
      "TIPOPLAN_PRECIO": 7,
      "TIPOPLAN_IMAGEN": "https://juandiegoosorio.neocities.org/images/basicoAnuncioMensual.png"
    },
    {
      "TIPOPLAN_ID": 8,
      "TIPOPLAN_NOMBRE": "Plan Estándar - Mensual",
      "TIPOPLAN_PRECIO": 9,
      "TIPOPLAN_IMAGEN": "https://juandiegoosorio.neocities.org/images/estandarAnuncioMensual.png"
    },
    {
      "TIPOPLAN_ID": 10,
      "TIPOPLAN_NOMBRE": "Plan Premium - Mensual",
      "TIPOPLAN_PRECIO": 10,
      "TIPOPLAN_IMAGEN": "https://juandiegoosorio.neocities.org/images/premiumAnuncioMensual.png"
    },
    {
      "TIPOPLAN_ID": 11,
      "TIPOPLAN_NOMBRE": "Plan Basico - Anual",
      "TIPOPLAN_PRECIO": 40,
      "TIPOPLAN_IMAGEN": "https://juandiegoosorio.neocities.org/images/basicoAnuncioMensual.png"
    },
    {
      "TIPOPLAN_ID": 12,
      "TIPOPLAN_NOMBRE": "Plan Premium - Anual",
      "TIPOPLAN_PRECIO": 50,
      "TIPOPLAN_IMAGEN": "https://juandiegoosorio.neocities.org/images/premiumAnuncioMensual.png"
    },
    {
      "TIPOPLAN_ID": 13,
      "TIPOPLAN_NOMBRE": "Plan Estandar - Anual",
      "TIPOPLAN_PRECIO": 65,
      "TIPOPLAN_IMAGEN": "https://juandiegoosorio.neocities.org/images/estandarAnuncioMensual.png"
    }

  ]

  return (
    <Container>
      <div className="space-y-10 pb-10">
        <div className="flex flex-col gap-y-8 py-6 px-4 sm:px-6 lg:px-8">
          <ProductList title="Planes Disponibles" items={products} /> 
        </div>
      </div>
    </Container>
  )
}

export default HomePage