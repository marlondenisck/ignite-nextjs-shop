import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

export async function POST(request: NextRequest) {
  try {
    const { items } = await request.json();
    
    if (!items || items.length === 0) {
      return NextResponse.json(
        { error: 'Carrinho vazio' }, 
        { status: 400 }
      );
    }
    
    const successUrl = `${process.env.NEXT_URL || 'http://localhost:3000'}/success?session_id={CHECKOUT_SESSION_ID}`;
    const cancelUrl = `${process.env.NEXT_URL || 'http://localhost:3000'}/`;

    const checkoutSession = await stripe.checkout.sessions.create({
      success_url: successUrl,
      cancel_url: cancelUrl,
      mode: 'payment',
      line_items: items,
    });

    return NextResponse.json({
      checkoutUrl: checkoutSession.url
    }, { status: 201 });

  } catch (error) {
    console.error('Erro no checkout:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' }, 
      { status: 500 }
    );
  }
}