import { getProducts } from '@/actions/get-products'
import { ProductList } from '@/components/product-list'
import { Container } from '@/components/ui/container'

export const revalidate = 0

const HomePage = async () => {
  const products = await getProducts()

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