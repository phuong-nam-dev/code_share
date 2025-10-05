import { dalDbOperation, dalRequireAuth } from "@/dal/helpers";
import { db } from "@/drizzle/db";
import { SnippetsTable } from "@/drizzle/schema/snippet";
import { and, eq } from "drizzle-orm";
import { revalidateTag } from "next/cache";

export function insertSnippet(
  snippet: Omit<typeof SnippetsTable.$inferInsert, "userId">
) {
  return dalRequireAuth((user) =>
    dalDbOperation(async () => {
      const [newSnippet] = await db
        .insert(SnippetsTable)
        .values({ ...snippet, userId: user.id })
        .returning({ id: SnippetsTable.id });

      revalidateTag(`snippets:${newSnippet.id}`);
      revalidateTag("snippets");

      return newSnippet;
    })
  );
}

export function updateSnippet(
  id: string,
  snippet: Partial<Omit<typeof SnippetsTable.$inferInsert, "userId">>
) {
  return dalRequireAuth((user) =>
    dalDbOperation(async () => {
      await db
        .update(SnippetsTable)
        .set(snippet)
        .where(
          and(eq(SnippetsTable.id, id), eq(SnippetsTable.userId, user.id))
        );

      revalidateTag(`snippets:${id}`);
      revalidateTag("snippets");

      return { id };
    })
  );
}
