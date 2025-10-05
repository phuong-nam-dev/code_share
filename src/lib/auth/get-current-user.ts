import { db } from "@/drizzle/db";
import { auth } from "./auth";
import { headers } from "next/headers";
import { ReadonlyHeaders } from "next/dist/server/web/spec-extension/adapters/headers";

export async function getCurrentUser() {
  const hdr = (await headers()) as ReadonlyHeaders;

  const session = await auth.api.getSession({ headers: hdr });

  return await db.query.user.findFirst({
    where: (table, { eq }) => eq(table.id, session?.user?.id as string),
  });
}
