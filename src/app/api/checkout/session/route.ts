import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import Stripe from "stripe";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get('session_id');

    if (!sessionId) {
      return NextResponse.json(
        { error: 'Session ID obrigatório' }, 
        { status: 400 }
      );
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['line_items', 'line_items.data.price.product']
    });

    const customerName = session.customer_details?.name;
    const lineItems = session.line_items?.data || [];
    
    const products = lineItems.map(item => {
      const product = item.price?.product as Stripe.Product;
      return {
        name: product.name,
        imageUrl: product.images[0]
      };
    });

    return NextResponse.json({
      customerName,
      products
    });

  } catch (error) {
    console.error('Erro ao buscar sessão:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' }, 
      { status: 500 }
    );
  }
}