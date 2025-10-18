import Header from '@/components/Header'
import ProductSlider from '@/components/ProductSlider'
import { stripe } from '@/lib/stripe'
import Stripe from 'stripe'

// Função assíncrona direta no Server Component
async function getProducts() {
  const response = await stripe.products.list({
    expand: ['data.default_price']
  });

  const products = response.data.map(product => {
    const price = product.default_price as Stripe.Price;
    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      }).format((price.unit_amount || 0) / 100),
    }
  })

  return products
}

// Static Generation (equivalente ao getStaticProps)
// Controla o comportamento de cache/revalidação
export const revalidate = 3600; // revalidar a cada 1 hora




export default async function Home() {
  const products = await getProducts()

  return (
      <>
        <Header />
        <main className='flex flex-col items-start justify-center pl-4'>
          <ProductSlider products={products} />
        </main>
      </>
  );
}
