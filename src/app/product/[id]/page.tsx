import type { Metadata } from 'next'
import { stripe } from "@/lib/stripe";
import Stripe from "stripe";
import Image from "next/image";
import BuyButton from "../components/BuyButton";


export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const product = await getProduct(params.id)
  
  return {
    title: `${product.name} | Ignite Shop`,
    description: product.description,
  }
}

// Define o tipo do produto
type Product = {
  id: string
  name: string
  imageUrl: string
  price: number
  priceFormatted: string
  description: string
  defaultPriceId: string
}

// Props do componente
interface ProdutoPageProps {
  params: { id: string }
}


// Substitui o getStaticPaths
export async function generateStaticParams() {
  // Busca alguns produtos para gerar as páginas no build
  const products = await stripe.products.list({
    limit: 10, // Limite para não gerar muitas páginas no build
  });

  return products.data.map((product) => ({
    id: product.id,
  }));
}

// Controla o comportamento para produtos não listados
export const dynamicParams = true; // equivalente ao fallback: 'blocking'

async function getProduct(id: string): Promise<Product> {
  const product = await stripe.products.retrieve(id, {
    expand: ['default_price']
  });

  const price = product.default_price as Stripe.Price;

  return {
    id: product.id,
    name: product.name,
    imageUrl: product.images[0],
    price: (price.unit_amount || 0) / 100, // Retorna como número
    priceFormatted: new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format((price.unit_amount || 0) / 100),
    description: product.description || '',
    defaultPriceId: price.id,
  }
}

export default async function ProdutoPage({ params }: ProdutoPageProps) {
  const product = await getProduct(params.id);

  return (
    <>
      <div className="grid grid-cols-2 gap-16 items-stretch max-w-7xl mx-auto p-4">
        <div className="w-full max-w-[576px] h-[656px] flex p-1 bg-gradient-to-b from-green300 to-[#7465d4] rounded-lg items-center justify-center">
          <Image src={product.imageUrl} width={520} height={480} alt={product.name} className="object-cover" />
        </div>

        <div className="flex flex-col">
          <h1 className="text-2xl text-gray-300">{product.name}</h1>
          <span className="mt-4 block text-2xl text-green-300">{product.priceFormatted}</span>

          <p className="mt-10 text-base leading-4 text-gray-300">{product.description}</p>

          <BuyButton 
            product={{
              id: product.id,
              name: product.name,
              imageUrl: product.imageUrl,
              price: product.price,
              defaultPriceId: product.defaultPriceId,
            }} 
          />
        </div>
      </div>
    </>
  );
}