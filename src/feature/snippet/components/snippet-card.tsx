"use client";

import { SnippetsTable } from "@/drizzle/schema";
import { useRouter } from "next/navigation";
import React from "react";

const SnippetCard = ({
  snippet,
}: {
  snippet: Pick<
    typeof SnippetsTable.$inferSelect,
    "id" | "code" | "title" | "description"
  >;
}) => {
  const router = useRouter();

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-6">
      <h2
        className="text-2xl font-bold mb-2 cursor-pointer hover:underline inline"
        onClick={() => {
          router.push(`/snippet/${snippet.id}`);
        }}
      >
        {snippet.title}
      </h2>
      <p className="text-gray-700 mb-4">{snippet.description}</p>

      <div className="bg-gray-100 p-4 rounded-md">
        <pre>
          <code>{snippet.code}</code>
        </pre>
      </div>
    </div>
  );
};

export default SnippetCard;
