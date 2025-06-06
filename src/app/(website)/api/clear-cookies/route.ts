import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  // Properly await the cookies() call to get the actual cookies object
  const cookieStore = await cookies();

  // Delete all order-related cookies
  cookieStore.delete("orderID");
  cookieStore.delete("formData");
  cookieStore.delete("paymentURL");
  cookieStore.delete("paymentInitiated");

  return NextResponse.json({
    success: true,
    message: "All order cookies cleared",
  });
}
