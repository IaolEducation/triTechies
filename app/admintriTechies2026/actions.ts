"use server";

import { put } from "@vercel/blob";

export async function uploadImageAction(formData: FormData) {
  try {
    const file = formData.get("file") as File;

    if (!file) {
      throw new Error("No file provided");
    }

    const maxFileSize = 5 * 1024 * 1024; // 5MB limits
    if (file.size > maxFileSize) {
      throw new Error("File size exceeds 5MB limit.");
    }

    // Upload exactly to vercel blob using the environment token automatically
    const blob = await put(file.name, file, {
      access: "public",
    });

    return { success: true, url: blob.url };
  } catch (error: any) {
    console.error("Vercel Blob Upload Error:", error);
    return { success: false, error: error.message || "Failed to upload image" };
  }
}
