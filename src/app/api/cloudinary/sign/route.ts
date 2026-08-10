import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

import { auth } from "@/lib/auth";

const UPLOAD_FOLDER = "pagebuilder";

export async function POST() {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Not signed in" }, { status: 401 });

  const timestamp = Math.round(Date.now() / 1000);
  const paramsToSign = { timestamp, folder: UPLOAD_FOLDER };
  const signature = cloudinary.utils.api_sign_request(paramsToSign, process.env.CLOUDINARY_API_SECRET ?? "");

  return NextResponse.json({
    signature,
    timestamp,
    apiKey: process.env.CLOUDINARY_API_KEY,
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    folder: UPLOAD_FOLDER,
  });
}
