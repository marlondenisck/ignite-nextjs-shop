"use client";

interface BuyButtonProps {
  defaultPriceId: string;
}

export default function BuyButton({ defaultPriceId }: BuyButtonProps) {
 async function handleBuyButton() {
  try {
    const response = await fetch('/api/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        priceId: defaultPriceId,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const { checkoutUrl } = await response.json();
    window.location.href = checkoutUrl;
  } catch (error) {
    console.error('Erro:', error);
  }
}

  return (
    <button 
      className="mt-auto bg-green-500 border-0 text-white rounded-[8px] p-5 cursor-pointer font-bold text-base hover:bg-green300"
      onClick={handleBuyButton}
    >
      Comprar agora
    </button>
  );
}