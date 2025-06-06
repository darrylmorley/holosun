import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Log to a file for permanent storage
    const timestamp = new Date().toISOString();
    const logEntry = JSON.stringify(
      {
        timestamp,
        response: body,
        headers: Object.fromEntries(request.headers),
      },
      null,
      2
    );

    // Make sure the logs directory exists
    const logsDir = path.join(process.cwd(), "logs");
    if (!fs.existsSync(logsDir)) {
      fs.mkdirSync(logsDir, { recursive: true });
    }

    // Write to a log file
    const logFilePath = path.join(logsDir, `worldpay-response-${timestamp.split("T")[0]}.log`);
    fs.appendFileSync(logFilePath, logEntry + "\n\n");

    console.log("Worldpay callback logged:", {
      timestamp,
      responseType: body.order ? body.order.status : "unknown",
      orderId: body.order?.orderCode || "unknown",
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error logging Worldpay callback:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
