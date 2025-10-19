import { stripe } from "@/lib/stripe";
import Stripe from "stripe";
import Image from "next/image";

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

async function getProduct(id: string) {
  const product = await stripe.products.retrieve(id, {
    expand: ['default_price']
  });

  const price = product.default_price as Stripe.Price;

  return {
    id: product.id,
    name: product.name,
    imageUrl: product.images[0],
    price: new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format((price.unit_amount || 0) / 100),
    description: product.description,
  }
}

export default async function ProdutoPage({ params }: { params: { id: string } }) {
  const product = await getProduct(params.id);

  return (
    <>
      <div className="grid grid-cols-2 gap-16 items-stretch max-w-7xl mx-auto p-4">
        <div className="w-full max-w-[576px] h-[656px] flex p-1 bg-gradient-to-b from-green300 to-[#7465d4] rounded-lg items-center justify-center">
          <Image src={product.imageUrl} width={520} height={480} alt={product.name} className="object-cover" />
        </div>

        <div className="flex flex-col">
          <h1 className="text-2xl text-gray-300">{product.name}</h1>
          <span className="mt-4 block text-2xl text-green-300">{product.price}</span>

          <p className="mt-10 text-base leading-4 text-gray-300">{product.description}</p>

          <button className="mt-auto bg-green-500 border-0 text-white rounded-[8px] p-5 cursor-pointer font-bold text-base hover:bg-green300">
            Comprar agora
          </button>
        </div>
      </div>
    </>
  );
}