import { env } from "@/env";
import { S3 } from "@/lib/S3Client";
import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(request: NextRequest) {
  try {
    const { key } = await request.json();

    if (!key) {
      return NextResponse.json(
        {
          error: "Missing or invalid Object key",
        },
        {
          status: 400,
        },
      );
    }

    const command = new DeleteObjectCommand({
      Bucket: env.NEXT_PUBLIC_S3_BUCKET_NAME_IMAGES,
      Key: key,
    });

    await S3.send(command);

    return NextResponse.json(
      {
        message: "File Deleted Successfully",
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.error("File upload error:", error);
    return NextResponse.json({ error: "Failed to Delete" }, { status: 500 });
  }
}
