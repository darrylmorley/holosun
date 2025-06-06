import { createSale } from "@/lib/lightspeed/lightspeed";

export async function POST(req) {
  try {
    const postData = await req.json();
    const sale = await createSale(postData);
    return new Response(JSON.stringify(sale), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
