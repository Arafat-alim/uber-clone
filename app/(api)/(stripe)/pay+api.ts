import { Stripe } from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(request: Request) {
  try {
    // ! if all above things went good that mean we made a successful payment
    //! extract bidy from the request
    const body = await request.json();
    const { payment_method_id, payment_intend_id, customer_id, client_secret } =
      body;

    if (!payment_method_id || !payment_intend_id || !customer_id) {
      return new Response(
        JSON.stringify({
          error: "Missing required payment information",
        }),
        { status: 400 }
      );
    }

    const paymentMethod = await stripe.paymentMethods.attach(
      payment_method_id,
      { customer: customer_id }
    );

    const result = await stripe.paymentIntents.confirm(payment_intend_id, {
      payment_method: paymentMethod.id,
    });

    return new Response(
      JSON.stringify({
        success: true,
        message: "Payment successful",
        result,
      })
    );
  } catch (error) {
    console.log("Error occured while paying: ", error);

    return new Response(JSON.stringify({ error: "Internal Server error" }), {
      status: 500,
    });
  }
}
