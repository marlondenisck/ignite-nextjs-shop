import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

export async function POST(request: NextRequest) {
  try {
    const { priceId } = await request.json();
    
    const successUrl = `${process.env.NEXT_URL}/success`;
    const cancelUrl = `${process.env.NEXT_URL}/`;

    const checkoutSession = await stripe.checkout.sessions.create({
      success_url: successUrl,
      cancel_url: cancelUrl,
      mode: 'payment',
      line_items: [
        {
          price: priceId,
          quantity: 1,
        }
      ]
    });

    return NextResponse.json({
      checkoutUrl: checkoutSession.url
    }, { status: 201 });

  } catch (error) {
    return NextResponse.json(
      { error: 'Erro interno do servidor' }, 
      { status: 500 }
    );
  }
}