"use server";

import { prisma } from "@/lib/prisma";
import { getDbUserId } from "./user.action";
import { revalidatePath } from "next/cache";

export async function createPost(content: string, image: string) {
  try {
    const userId = await getDbUserId();

    const dbPost = await prisma.post.create({
      data: {
        content,
        image: image,
        authorId: userId,
      },
    });

    revalidatePath("/"); // Immediate fetch the post in Home page when post is created
    return { success: true, dbPost };
  } catch (err) {
    console.log("Failed to create post: ", err);
    return { success: false, error: "Failed to create post" };
  }
}
