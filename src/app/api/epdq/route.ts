import { NextResponse } from "next/server";
import EPDQ from "epdq";

EPDQ.config.testMode = true;
EPDQ.config.shaType = "sha1";
EPDQ.config.pspid = process.env.EPDQ_PSPID;
EPDQ.config.pspId = process.env.EPDQ_PSPID;
EPDQ.config.shaIn = process.env.EPDQ_SHAIN;
EPDQ.config.shaOut = process.env.EPDQ_SHAOUT;

export async function POST(req) {
  const body = await req.json();
  const request = new EPDQ.Request(JSON.parse(body));
  const signature = request.shaSign();
  console.log(request.formAttributes());
  return NextResponse.json(request.formAttributes());
}
