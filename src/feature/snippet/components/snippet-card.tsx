"use client";

import { SnippetsTable } from "@/drizzle/schema";
import { useRouter } from "next/navigation";
import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

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

      <div className="rounded-md overflow-hidden">
        <SyntaxHighlighter
          language="javascript"
          style={oneDark}
          customStyle={{
            padding: "1rem",
            borderRadius: "0.5rem",
            fontSize: "0.9rem",
            lineHeight: "1.5",
          }}
          // eslint-disable-next-line react/no-children-prop
          children={String(snippet.code)}
        ></SyntaxHighlighter>
      </div>
    </div>
  );
};

export default SnippetCard;
