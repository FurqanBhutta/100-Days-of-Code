import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { requireAuth } from "@/lib/auth";
import { success, fail, withErrorHandling } from "@/lib/apiResponse";

// Allowed upload "types" map to subfolders + accepted mime types.
const UPLOAD_CONFIG = {
  profilePicture: {
    folder: "profile-pictures",
    allowedTypes: ["image/jpeg", "image/png", "image/webp"],
    maxSizeMB: 5,
  },
  assignmentFile: {
    folder: "assignments",
    allowedTypes: ["application/pdf", "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/zip"],
    maxSizeMB: 20,
  },
};

export const POST = withErrorHandling(async (request) => {
  const { error } = await requireAuth();
  if (error) return fail(error.message, error.status);

  const formData = await request.formData();
  const file = formData.get("file");
  const type = formData.get("type");

  if (!file || typeof file === "string") {
    return fail("No file provided", 400);
  }
  if (!type || !UPLOAD_CONFIG[type]) {
    return fail("A valid 'type' field is required (profilePicture or assignmentFile)", 400);
  }

  const config = UPLOAD_CONFIG[type];

  if (!config.allowedTypes.includes(file.type)) {
    return fail(`File type ${file.type} is not allowed for ${type}`, 400);
  }

  const maxBytes = config.maxSizeMB * 1024 * 1024;
  if (file.size > maxBytes) {
    return fail(`File exceeds the ${config.maxSizeMB}MB limit`, 400);
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const ext = path.extname(file.name) || "";
  const filename = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}${ext}`;

  const uploadDir = path.join(process.cwd(), "public", "uploads", config.folder);
  await mkdir(uploadDir, { recursive: true });
  await writeFile(path.join(uploadDir, filename), buffer);

  const fileURL = `/uploads/${config.folder}/${filename}`;

  return success({ fileURL, filename, size: file.size, type: file.type }, 201);
});
