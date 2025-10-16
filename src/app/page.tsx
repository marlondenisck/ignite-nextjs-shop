import Header from '@/components/Header'
import ProductSlider from '@/components/ProductSlider'
import { stripe } from '@/lib/stripe'
import Stripe from 'stripe'

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
      price: price.unit_amount ? price.unit_amount / 100 : 0,
    }
  })

  return products
}



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
