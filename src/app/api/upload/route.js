// app/api/upload/route.js (or .ts if using TypeScript)
import { writeFile } from "fs/promises";
import path from "path";

export async function POST(req) {
  const formData = await req.formData();
  const file = formData.get("image");

  if (!file) {
    return new Response(JSON.stringify({ message: "No file uploaded" }), {
      status: 400,
    });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const filename = Date.now() + "-" + file.name;
  const uploadPath = path.join(process.cwd(), "public", "uploads", filename);

  await writeFile(uploadPath, buffer);

  return new Response(JSON.stringify({ url: `/uploads/${filename}` }), {
    status: 200,
  });
}
