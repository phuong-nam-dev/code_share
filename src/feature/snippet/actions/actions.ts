"use server";

import {
  dalDbOperation,
  dalFormatErrorMessage,
  dalLoginRedirect,
  dalVerifySuccess,
} from "@/dal/helpers";
import { insertSnippet } from "../dal-advanced/mutations";
import { cacheTag } from "next/dist/server/use-cache/cache-tag";
import { db } from "@/drizzle/db";
import { and, eq } from "drizzle-orm";
import { SnippetsTable } from "@/drizzle/schema";

export async function addSnippetAction(formData: FormData) {
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const code = formData.get("code") as string;

  if (!title || title.trim().length === 0) {
    throw new Error("Title is required");
  }

  const res = dalLoginRedirect(
    await insertSnippet({
      title: title.trim(),
      description: description?.trim() || null,
      code,
    })
  );

  if (res.success) return;
  return dalFormatErrorMessage(res.error);
}

export const getListSnippetList = async () => {
  "use cache";
  cacheTag("snippets");

  return dalVerifySuccess(
    await dalDbOperation(() => {
      return db.query.SnippetsTable.findMany();
    })
  );
};

export async function getDetailSnippet(id: string) {
  "use cache";
  cacheTag(`snippets:${id}`);

  const detailSnippet = await db.query.SnippetsTable.findFirst({
    where: and(eq(SnippetsTable.id, id)),
  });

  return detailSnippet;
}
